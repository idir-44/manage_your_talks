package middlewares

import (
	"fmt"
	"net/http"
	"os"

	"github.com/idir-44/manage_your_talks/internal/helpers"
	"github.com/idir-44/manage_your_talks/internal/jwttoken"
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/labstack/echo/v4"
)

func AddCurentUser(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		cookies, err := c.Cookie("access-token")
		if err != nil {
			return next(c)
		}

		// TODO: parse env variables at server start
		key := os.Getenv("JWT_SECRET")
		if key == "" {
			return fmt.Errorf("jwt secret is not set")
		}
		user, err := jwttoken.ParseToken(cookies.Value, key)
		if err != nil {
			return err
		}

		c.Set("user", user)

		return next(c)

	}
}

func IsUserAuthenticated(roles []models.Role, next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		userRole, err := helpers.GetUser(c)
		if err != nil {
			return err
		}

		for _, role := range roles {
			if userRole.Role == role {
				next(c)
				return nil
			}
		}

		return echo.NewHTTPError(http.StatusUnauthorized, fmt.Sprintf("user with role %s cannot access this resource", userRole.Role))
	}
}
