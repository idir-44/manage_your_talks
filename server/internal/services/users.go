package services

import (
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/idir-44/manage_your_talks/pkg/utils"
)

func (s services) CreateUser(req models.CreatUserRequest) (models.User, error) {
	password, err := utils.HashPassword(req.Password)
	if err != nil {
		return models.User{}, err
	}

	user := models.User{
		Email:    req.Email,
		Password: password,
	}

	return s.repository.CreateUser(user)
}
