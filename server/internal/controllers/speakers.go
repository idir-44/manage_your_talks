package controllers

import (
	"net/http"

	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) registerSpeaker(c echo.Context) error {
	var req models.CreateSpeakerRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	speaker, err := r.service.CreateSpeaker(req)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, speaker)

}

func (r controller) protectedRoute(c echo.Context) error {

	return c.String(http.StatusOK, "A protected route !\n")

}
