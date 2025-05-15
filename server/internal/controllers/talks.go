package controllers

import (
	"fmt"
	"net/http"

	"github.com/idir-44/manage_your_talks/internal/helpers"
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) getTalks(c echo.Context) error {
	user, err := helpers.GetUser(c)
	if err != nil {
		return err
	}

	var req models.GetTalksRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	if user.Role == models.UserRoleSpeaker && req.OwnerID == "" {
		return fmt.Errorf("owner_id is required")
	}

	talks, err := r.service.GetTalks(req)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, talks)
}

func (r controller) postTalk(c echo.Context) error {
	user, err := helpers.GetUser(c)
	if err != nil {
		return err
	}

	var req models.CreateTalkRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	if (req.Hours == 0 && req.Minutes == 0) || req.Hours < 0 || req.Minutes < 0 || req.Minutes > 59 {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("duration not valid"))
	}

	talk, err := r.service.CreateTalk(req, user)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, talk)
}

func (r controller) patchTalk(c echo.Context) error {
	talkID := c.Param("id")
	var req models.UpdateTalkRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	err := validateDurationUpdate(req)
	if err != nil {
		return err
	}

	talk, err := r.service.UpdateTalk(talkID, req)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, talk)
}

func (r controller) updateTalkStatus(c echo.Context) error {
	talkID := c.Param("id")

	var req models.UpdateTalkRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	talk, err := r.service.UpdateTalkStatus(talkID, req)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, talk)
}

func (r controller) deleteTalk(c echo.Context) error {
	talkID := c.Param("id")

	talk, err := r.service.DeleteTalk(talkID)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, talk)
}

func (r controller) scheduleTalk(c echo.Context) error {
	var req models.ScheduleTalkRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	talk, err := r.service.ScheduleTalk(req)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, talk)
}

func validateDurationUpdate(req models.UpdateTalkRequest) error {
	if req.Hours == nil && req.Minutes == nil {
		return nil
	}

	var hours int64
	var minutes int64

	if req.Hours != nil {
		hours = *req.Hours
		if hours < 0 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("hours cannot be negative"))
		}
	}

	if req.Minutes != nil {
		minutes = *req.Minutes
		if minutes < 0 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("minutes cannot be negative"))
		}
		if minutes > 59 {
			return echo.NewHTTPError(http.StatusBadRequest, fmt.Sprintf("minutes cannot exceed 59"))
		}
	}

	if hours == 0 && minutes == 0 {
		return echo.NewHTTPError(http.StatusBadRequest, fmt.Errorf("minutes and hours are equal to 0"))
	}

	return nil
}
