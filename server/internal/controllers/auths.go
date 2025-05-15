package controllers

import (
	"net/http"
	"time"

	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func (r controller) login(c echo.Context) error {
	var req models.LoginRequest

	if err := c.Bind(&req); err != nil {
		return err
	}

	user, token, err := r.service.Login(req)
	if err != nil {
		return err
	}

	cookie := new(http.Cookie)
	cookie.Name = "access-token"
	cookie.Value = token
	cookie.Expires = time.Now().Add(24 * time.Hour)
	cookie.HttpOnly = true
	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, user)
}

func (r controller) logout(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "access-token"
	cookie.Value = ""
	cookie.Expires = time.Unix(0, 0)
	cookie.MaxAge = -1
	c.SetCookie(cookie)

	return c.JSON(http.StatusOK, map[string]string{
		"message": "Logged out successfully",
	})
}
