package jwttoken

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"github.com/idir-44/manage_your_talks/internal/models"
)

type jwtClaims struct {
	models.UserRole
	jwt.StandardClaims
}

func CreateToken(user models.UserRole, key string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtClaims{
		UserRole: user,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			IssuedAt:  time.Now().Unix(),
			Id:        uuid.New().String(),
		},
	})

	return token.SignedString([]byte(key))
}

func ParseToken(tokenString, key string) (models.UserRole, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwtClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(key), nil
	})

	if claims, ok := token.Claims.(*jwtClaims); ok && token.Valid {
		return claims.UserRole, nil
	} else {
		return models.UserRole{}, fmt.Errorf("error parsing token: %s", err)
	}
}
