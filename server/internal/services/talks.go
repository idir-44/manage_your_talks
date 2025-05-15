package services

import (
	"fmt"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (s services) GetTalks(req models.GetTalksRequest) ([]models.Talk, error) {
	return s.repository.GetTalks(req)
}

func (s services) CreateTalk(req models.CreateTalkRequest, user models.UserRole) (models.Talk, error) {
	talk := models.Talk{
		Title:       req.Title,
		Topic:       req.Topic,
		Description: req.Description,
		Level:       req.Level,
		Status:      models.TalkStatusPending,
		OwnerID:     user.ID,
	}

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

func (s services) UpdateTalkStatus(id string, req models.UpdateTalkRequest) (models.Talk, error) {
	if req.Status != nil && *req.Status == models.TalkStatusPlanned {
		return models.Talk{}, fmt.Errorf("cannot set it to planned manually")
	}

	return s.repository.UpdateTalkStatus(id, req)
}

func (s services) ScheduleTalk(req models.ScheduleTalkRequest) (models.Talk, error) {

	talk, err := s.repository.GetTalkByID(req.TalkID)
	if err != nil {
		return models.Talk{}, err
	}

	duration := time.Duration(talk.Duration) * time.Second
	overlap, err := s.repository.IsOverlapping(req.RoomID, req.StartAt, duration)
	if err != nil {
		return models.Talk{}, err
	}

	if overlap {
		return models.Talk{}, fmt.Errorf("talk time overlaps with another talk in this room")
	}

	planning := models.Planning{
		RoomID:  req.RoomID,
		TalkID:  req.TalkID,
		StartAt: req.StartAt,
	}

	_, err = s.repository.CreatePlanning(planning)
	if err != nil {
		return models.Talk{}, err
	}

	status := models.TalkStatusPlanned
	return s.repository.UpdateTalkStatus(talk.ID, models.UpdateTalkRequest{
		Status: &status,
	})
}
