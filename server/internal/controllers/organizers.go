package controllers

import (
	"net/http"

	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) registerOrganizer(c echo.Context) error {
	var req models.CreateOrganizerRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	organizer, err := r.service.CreateOrganizer(req)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, organizer)
}
