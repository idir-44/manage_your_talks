package models

type Role string

const (
	UserRoleOrganizer Role = "organizer"
	UserRoleSpeaker   Role = "speaker"
)

type UserRole struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Role  Role   `json:"role"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
