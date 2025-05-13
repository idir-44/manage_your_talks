package controllers

import (
	"github.com/idir-44/manage_your_talks/internal/middlewares"
	"github.com/idir-44/manage_your_talks/internal/models"
	"github.com/idir-44/manage_your_talks/internal/services"
	"github.com/idir-44/manage_your_talks/pkg/server"
)

type controller struct {
	service services.Service
}

func RegisterHandlers(routerGroup *server.Router, srv services.Service) {
	c := controller{srv}

	IsSpeaker := []models.Role{models.UserRoleSpeaker}

	routerGroup.Use(middlewares.AddCurentUser)

	routerGroup.POST("/speakers", c.registerSpeaker)
	routerGroup.GET("/me", c.getCurrentUser)
	routerGroup.POST("/login", c.login)

	routerGroup.POST("/talks", middlewares.IsUserAuthenticated(IsSpeaker, c.postTalk))
	routerGroup.PATCH("/talks/:id", middlewares.IsUserAuthenticated(IsSpeaker, c.patchTalk))
	routerGroup.DELETE("/talks/:id", middlewares.IsUserAuthenticated(IsSpeaker, c.deleteTalk))

}
