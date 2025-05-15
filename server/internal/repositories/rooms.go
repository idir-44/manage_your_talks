package repositories

import (
	"context"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (r repository) GetAllRooms() ([]models.Room, error) {
	rooms := []models.Room{}

	err := r.db.NewSelect().Model(&rooms).Scan(context.TODO())

	return rooms, err

}
