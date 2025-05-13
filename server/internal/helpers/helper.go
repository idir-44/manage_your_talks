package helpers

import (
	"fmt"

	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func GetUser(c echo.Context) (models.UserRole, error) {
	user := c.Get("user")

	if user == nil {
		return models.UserRole{}, fmt.Errorf("current user not found")
	}

	return user.(models.UserRole), nil
}
