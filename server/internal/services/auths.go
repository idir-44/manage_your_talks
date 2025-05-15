package services

import (
	"fmt"
	"os"

	"github.com/idir-44/manage_your_talks/internal/jwttoken"
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/idir-44/manage_your_talks/pkg/utils"
)

func (s services) Login(req models.LoginRequest) (models.UserRole, string, error) {
	user, err := s.repository.GetUserByEmail(req.Email)
	if err != nil {
		return models.UserRole{}, "", fmt.Errorf("bad credentials %s", err)
	}

	if err := utils.CheckPassword(req.Password, user.Password); err != nil {
		return models.UserRole{}, "", fmt.Errorf("invalid password: %s", err)
	}

	var role models.Role
	var userID string

	speaker, err := s.repository.GetSpeakerByUserID(user.ID)
	if err == nil {
		role = models.UserRoleSpeaker
		userID = speaker.ID
	}

	organizer, err := s.repository.GetOrganizerByUserID(user.ID)
	if err == nil && role != "" {
		return models.UserRole{}, "", fmt.Errorf("user cannot have two roles")
	} else if err == nil {
		role = models.UserRoleOrganizer
		userID = organizer.ID
	}

	// TODO: parse env variables at server start
	key := os.Getenv("JWT_SECRET")
	if key == "" {
		return models.UserRole{}, "", fmt.Errorf("jwt secret is not set")
	}

	userRole := models.UserRole{
		ID:    userID,
		Email: user.Email,
		Role:  role,
	}

	token, err := jwttoken.CreateToken(userRole, key)
	if err != nil {
		return models.UserRole{}, "", err
	}

	return userRole, token, nil

}
