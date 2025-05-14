package models

import "time"

type Planning struct {
	ID      string    `json:"id"`
	TalkID  string    `json:"talkId"`
	RoomID  string    `json:"roomId"`
	StartAt time.Time `json:"startAt"`

	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
