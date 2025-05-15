package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (r controller) getAllRooms(c echo.Context) error {

	rooms, err := r.service.GetAllRooms()
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, rooms)

}
