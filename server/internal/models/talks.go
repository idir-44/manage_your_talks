package models

import "time"

type TalkStatus = string

const (
	TalkStatusPending  TalkStatus = "pending"
	TalkStatusAccepted TalkStatus = "accepted"
	TalkStatusDeclined TalkStatus = "declined"
	TalkStatusPlanned  TalkStatus = "planned"
)

type Talk struct {
	ID          string    `json:"id"`
	Title       string    `json:"title"`
	Topic       string    `json:"topic"`
	Description string    `json:"description"`
	Duration    int64     `json:"duration"`
	Level       string    `json:"level"`
	Status      string    `json:"status"`
	OwnerID     string    `json:"owner_id"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type CreateTalkRequest struct {
	Title       string `json:"title" binding:"required"`
	Topic       string `json:"topic" binding:"required"`
	Description string `json:"description,omitempty"`
	Hours       int64  `json:"hours"`
	Minutes     int64  `json:"minutes"`
	Level       string `json:"level" binding:"required"`
}

type ScheduleTalkRequest struct {
	TalkID  string    `json:"talkId"`
	RoomID  string    `json:"roomId"`
	StartAt time.Time `json:"startAt"`
}

type UpdateTalkRequest struct {
	Title       *string     `json:"title"`
	Topic       *string     `json:"topic"`
	Description *string     `json:"description"`
	Hours       *int64      `json:"hours"`
	Minutes     *int64      `json:"minutes"`
	Level       *string     `json:"level"`
	Status      *TalkStatus `json:"status"`

	Duration *int64
}

type GetTalksRequest struct {
	OwnerID string `json:"owner_id"`
	Status  string `json:"status"`
	Level   string `json:"level"`
}
