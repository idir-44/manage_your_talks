package services

import "github.com/idir-44/manage_your_talks/internal/models"

func (s services) CreateOrganizer(req models.CreateOrganizerRequest) (models.Organizer, error) {

	user, err := s.CreateUser(models.CreatUserRequest{
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		return models.Organizer{}, err
	}

	return s.repository.CreateOrganizer(models.Organizer{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		UserID:    user.ID,
	})
}
