package repositories

import (
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/uptrace/bun"
)

type repository struct {
	db *bun.DB
}

func NewRepository(db *bun.DB) Repository {
	return repository{db}
}

type Repository interface {
	CreateUser(req models.User) (models.User, error)
	GetUserByEmail(email string) (models.User, error)
	CreateSpeaker(speaker models.Speaker) (models.Speaker, error)
	CreateOrganizer(organizer models.Organizer) (models.Organizer, error)
	CreateTalk(talk models.Talk) (models.Talk, error)
	UpdateTalk(id string, req models.UpdateTalkRequest) (models.Talk, error)
	DeleteTalk(id string) (models.Talk, error)
	GetOrganizerByUserID(userID string) (models.Organizer, error)
	GetSpeakerByUserID(userID string) (models.Speaker, error)
	UpdateTalkStatus(id string, req models.UpdateTalkRequest) (models.Talk, error)
	GetTalkByID(id string) (models.Talk, error)
	GetTalks(req models.GetTalksRequest) ([]models.Talk, error)
	CreatePlanning(planning models.Planning) (models.Planning, error)
	IsOverlapping(roomID string, start time.Time, duration time.Duration) (bool, error)
	GetAllRooms() ([]models.Room, error)
}
