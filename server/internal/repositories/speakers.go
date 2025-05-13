package repositories

import (
	"context"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (r repository) CreateSpeaker(speaker models.Speaker) (models.Speaker, error) {
	speaker.CreatedAt = time.Now().UTC()
	speaker.UpdatedAt = time.Now().UTC()

	_, err := r.db.NewInsert().Model(&speaker).ExcludeColumn("id").Returning("*").Exec(context.TODO())

	return speaker, err
}

func (r repository) GetSpeakerByUserID(userID string) (models.Speaker, error) {
	var speaker models.Speaker

	err := r.db.NewSelect().Model(&speaker).Where("user_id = ?", userID).Scan(context.TODO())

	return speaker, err
}
