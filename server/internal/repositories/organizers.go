package repositories

import (
	"context"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (r repository) CreateOrganizer(organizer models.Organizer) (models.Organizer, error) {
	organizer.CreatedAt = time.Now().UTC()
	organizer.UpdatedAt = time.Now().UTC()

	_, err := r.db.NewInsert().Model(&organizer).ExcludeColumn("id").Returning("*").Exec(context.TODO())

	return organizer, err

}

func (r repository) GetOrganizerByUserID(userID string) (models.Organizer, error) {

	var organizer models.Organizer

	err := r.db.NewSelect().Model(&organizer).Where("user_id = ?", userID).Scan(context.TODO())

	return organizer, err

}
