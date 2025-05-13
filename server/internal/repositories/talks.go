package repositories

import (
	"context"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
)

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

	talk := models.Talk{}
	_, err := r.db.NewUpdate().
		Model(&fieldsToUpdate).
		TableExpr("talks").
		Where("id = ?", id).
		Returning("*").
		Exec(context.TODO())

	if err != nil {
		return models.Talk{}, err
	}

	err = r.db.NewSelect().Model(&talk).Where("id = ?", id).Scan(context.TODO())
	return talk, err
}
