package services

import (
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (s services) CreateTalk(req models.CreateTalkRequest, user models.UserRole) (models.Talk, error) {
	talk := models.Talk{
		Title:       req.Title,
		Topic:       req.Topic,
		Description: req.Description,
		Level:       req.Level,
		Status:      models.TalkStatusPending,
	}

	speaker, err := s.repository.GetSpeakerByUserID(user.ID)
	if err != nil {
		return models.Talk{}, err
	}

	talk.OwnerID = speaker.ID

	duration := time.Duration(req.Hours)*time.Hour + time.Duration(req.Minutes)*time.Minute
	talk.Duration = int64(duration.Seconds())

	return s.repository.CreateTalk(talk)
}

// TODO: check permission on talk
func (s services) DeleteTalk(id string) (models.Talk, error) {
	return s.repository.DeleteTalk(id)
}

// TODO: check for permission on talk
func (s services) UpdateTalk(id string, req models.UpdateTalkRequest) (models.Talk, error) {

	var hours int64
	var minutes int64

	if req.Hours != nil {
		hours = int64(*req.Hours)
	}

	if req.Minutes != nil {
		minutes = int64(*req.Minutes)
	}

	duration := time.Duration(hours)*time.Hour + time.Duration(minutes)*time.Minute
	durationSeconds := int64(duration.Seconds())
	req.Duration = &durationSeconds

	return s.repository.UpdateTalk(id, req)
}
