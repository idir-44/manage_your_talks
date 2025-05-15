package repositories

import (
	"context"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

func (r repository) GetTalks(req models.GetTalksRequest) ([]models.Talk, error) {
	talks := []models.Talk{}

	query := r.db.NewSelect().Model(&talks)
	query.Join("LEFT JOIN plannings ON talk.id = plannings.talk_id")
	query.Join("LEFT JOIN rooms ON plannings.room_id = rooms.id")

	query.ColumnExpr("talk.*")
	query.ColumnExpr("rooms.name as room_name")
	query.ColumnExpr("plannings.start_at as start_at")

	if req.Status != "" {
		query.Where("talk.status = ?", req.Status)
	}

	if req.Level != "" {
		query.Where("talk.level = ?", req.Level)
	}

	if req.OwnerID != "" {
		query.Where("talk.owner_id = ?", req.OwnerID)
	}

	err := query.Scan(context.TODO())

	return talks, err
}

func (r repository) CreateTalk(talk models.Talk) (models.Talk, error) {

	talk.CreatedAt = time.Now().UTC()
	talk.UpdatedAt = time.Now().UTC()

	_, err := r.db.NewInsert().Model(&talk).ExcludeColumn("id").Returning("*").Exec(context.TODO())

	return talk, err
}

func (r repository) DeleteTalk(id string) (models.Talk, error) {
	talk := models.Talk{}

	_, err := r.db.NewDelete().Model(&talk).Where("id = ?", id).Returning("*").Exec(context.TODO())

	return talk, err
}

func (r repository) UpdateTalk(id string, req models.UpdateTalkRequest) (models.Talk, error) {
	fieldsToUpdate := map[string]interface{}{
		"updated_at": time.Now().UTC(),
	}

	if req.Description != nil {
		fieldsToUpdate["description"] = req.Description
	}

	if req.Duration != nil {
		fieldsToUpdate["duration"] = req.Duration
	}

	if req.Level != nil {
		fieldsToUpdate["level"] = req.Level
	}

	if req.Topic != nil {
		fieldsToUpdate["topic"] = req.Topic
	}

	if req.Title != nil {
		fieldsToUpdate["title"] = req.Title
	}

	_, err := r.db.NewUpdate().
		Model(&fieldsToUpdate).
		TableExpr("talks").
		Where("id = ?", id).
		Returning("*").
		Exec(context.TODO())

	if err != nil {
		return models.Talk{}, err
	}

	return r.GetTalkByID(id)
}

func (r repository) UpdateTalkStatus(id string, req models.UpdateTalkRequest) (models.Talk, error) {
	if req.Status != nil {
		_, err := r.db.NewUpdate().Model((*models.Talk)(nil)).Set("status = ?", req.Status).Where("id = ?", id).Exec(context.TODO())
		if err != nil {
			return models.Talk{}, err
		}
		return r.GetTalkByID(id)
	}

	return models.Talk{}, nil
}

func (r repository) GetTalkByID(id string) (models.Talk, error) {
	talk := models.Talk{}
	err := r.db.NewSelect().Model(&talk).Where("id = ?", id).Scan(context.TODO())

	return talk, err

}
