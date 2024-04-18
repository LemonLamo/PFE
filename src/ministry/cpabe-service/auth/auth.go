package auth

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/golang-jwt/jwt"
)

func DecodeJWT(r *http.Request) (jwt.MapClaims, error) {
	public_key := []byte("-----BEGIN PUBLIC KEY-----MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEyox66GQyMYUW2/EFEyVhMKh4vAALG5EfdhXAtRr93Gzeyo81/9DUwiYOxJz5M9A7pN6Owzn3M82zGNZCdp26zA==-----END PUBLIC KEY-----")
	tokenString := r.Header.Get("Authorization")[len("Bearer "):]
	// Decode and validate the token
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return public_key, nil
	})

	// Print the token claims if valid
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		fmt.Println("Claims:", claims)
		return token.Claims.(jwt.MapClaims), nil
	} else {
		fmt.Println("Invalid JWT token")
		return token.Claims.(jwt.MapClaims), errors.New("Invalid JWT token")
	}
}
