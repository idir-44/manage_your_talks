package services

import "github.com/idir-44/manage_your_talks/internal/models"

func (s services) CreateSpeaker(req models.CreateSpeakerRequest) (models.Speaker, error) {

	user, err := s.CreateUser(models.CreatUserRequest{
		Email:    req.Email,
		Password: req.Password,
	})
	if err != nil {
		return models.Speaker{}, err
	}

	return s.repository.CreateSpeaker(models.Speaker{
		FirstName: req.FirstName,
		LastName:  req.LastName,
		UserID:    user.ID,
	})
}
