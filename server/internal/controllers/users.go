package controllers

import (
	"net/http"

	"github.com/idir-44/manage_your_talks/internal/helpers"
	"github.com/labstack/echo/v4"
)

func (r controller) getCurrentUser(c echo.Context) error {
	user, err := helpers.GetUser(c)
	if err != nil {
		return echo.NewHTTPError(http.StatusUnauthorized, err)
	}

	return c.JSON(http.StatusOK, user)
}
