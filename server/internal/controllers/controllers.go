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
	IsOrganizer := []models.Role{models.UserRoleOrganizer}
	IsSpeakerOrOrganizer := []models.Role{models.UserRoleSpeaker, models.UserRoleOrganizer}

	routerGroup.Use(middlewares.AddCurentUser)

	routerGroup.POST("/speakers", c.registerSpeaker)
	routerGroup.POST("/organizers", c.registerOrganizer)
	routerGroup.GET("/me", c.getCurrentUser)
	routerGroup.POST("/login", c.login)
	routerGroup.POST("/logout", c.logout)

	routerGroup.POST("/talks", middlewares.IsUserAuthenticated(IsSpeaker, c.postTalk))
	routerGroup.GET("/talks", middlewares.IsUserAuthenticated(IsSpeakerOrOrganizer, c.getTalks))
	routerGroup.PATCH("/talks/:id", middlewares.IsUserAuthenticated(IsSpeaker, c.patchTalk))
	routerGroup.DELETE("/talks/:id", middlewares.IsUserAuthenticated(IsSpeaker, c.deleteTalk))
	routerGroup.POST("/talks/schedule", middlewares.IsUserAuthenticated(IsOrganizer, c.scheduleTalk))
	routerGroup.PATCH("/talks/organizer/:id", middlewares.IsUserAuthenticated(IsOrganizer, c.updateTalkStatus))

	routerGroup.GET("/rooms", middlewares.IsUserAuthenticated(IsOrganizer, c.getAllRooms))

}
