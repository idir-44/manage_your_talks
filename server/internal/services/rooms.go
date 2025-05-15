package services

import "github.com/idir-44/manage_your_talks/internal/models"

func (s services) GetAllRooms() ([]models.Room, error) {
	return s.repository.GetAllRooms()
}
