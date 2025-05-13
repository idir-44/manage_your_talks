package services

import (
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/idir-44/manage_your_talks/internal/repositories"
)

type services struct {
	repository repositories.Repository
}

func NewService(repo repositories.Repository) Service {
	return services{repo}
}

type Service interface {
	CreateUser(req models.CreatUserRequest) (models.User, error)
	Login(req models.LoginRequest) (models.UserRole, string, error)
	CreateSpeaker(req models.CreateSpeakerRequest) (models.Speaker, error)
	CreateOrganizer(req models.CreateOrganizerRequest) (models.Organizer, error)
}
