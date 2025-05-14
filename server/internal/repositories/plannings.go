package repositories

import (
	"context"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (r repository) CreatePlanning(planning models.Planning) (models.Planning, error) {
	planning.CreatedAt = time.Now().UTC()
	planning.UpdatedAt = time.Now().UTC()

	_, err := r.db.NewInsert().Model(&planning).ExcludeColumn("id").Returning("*").Exec(context.TODO())

	return planning, err

}

func (r repository) IsOverlapping(roomID string, start time.Time, duration time.Duration) (bool, error) {
	end := start.Add(duration)

	count, err := r.db.NewSelect().
		Table("plannings").
		Join("JOIN talks ON talks.id = plannings.talk_id").
		Where("plannings.room_id = ?", roomID).
		Where("? < plannings.start_at + (talks.duration || ' seconds')::interval AND ? > plannings.start_at", start, end).
		Count(context.TODO())

	return count > 0, err
}
