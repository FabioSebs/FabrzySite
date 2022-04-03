package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("my_secret_key")

// Create a struct to read the username and password from the request body
type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type SignUp struct {
	Username        string `json:"username"`
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"password"`
}

// We add jwt.RegisteredClaims as an embedded type, to provide fields like expiry time
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

func LoginUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var creds Login

	// Getting the JSON Body from the Request and decoding it into creds
	err := json.NewDecoder(r.Body).Decode(&creds)

	// Error Handling the Request
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Check If Password Matches from Database
	var s sql.NullString

	err = db.QueryRow("SELECT full_name FROM users WHERE password = ?", creds.Password).Scan(&s)
	if err != nil {
		log.Fatal("Incorrect Password")
	}

	if creds.Username != s.String {
		w.WriteHeader(http.StatusUnauthorized)
		log.Fatal("Incorrect Password")
	}

	// Making Expiration Time 5 Minutes
	expirationTime := time.Now().Add(5 * time.Minute)

	// Creating JWT Claims
	claims := &Claims{
		Username: creds.Username,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	// Making the token with the algorithm and user info
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Extracting the JWT as a String
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Setting it as a Cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}

func SignUpUser(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var creds SignUp

	// Getting the JSON Body from the Request and decoding it into creds
	err := json.NewDecoder(r.Body).Decode(&creds)

	// Error Handling the Request
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Inserting user into database
	res, err := db.Exec("INSERT INTO users VALUES (?,?,?,?)", creds.Username, creds.Email, creds.Password, creds.ConfirmPassword)
	if err != nil {
		log.Fatal(err)
	}

	// Logging
	rowCnt, err := res.RowsAffected()
	if err != nil {
		log.Fatal(err)
	}

	log.Printf("Rows affected %d\n", rowCnt)
}

func Home(w http.ResponseWriter, r *http.Request) {
	// Reading token from client's cookie
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			// If the cookie is not set, return an unauthorized status
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		// For any other type of error, return a bad request status
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Get the JWT string from the cookie
	tknStr := c.Value

	// Initialize a new instance of `Claims`
	claims := &Claims{}

	// Parse the JWT string and store the result in `claims`.
	// Note that we are passing the key in this method as well. This method will return an error
	// if the token is invalid (if it has expired according to the expiry time we set on sign in),
	// or if the signature does not match
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	// Finally, return the welcome message to the user, along with their
	// username given in the token
	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Username)))
}

func Refresh(w http.ResponseWriter, r *http.Request) {
	// (BEGIN) The code uptil this point is the same as the first part of the `Welcome` route
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	tknStr := c.Value
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	// (END) The code up-till this point is the same as the first part of the `Welcome` route

	// We ensure that a new token is not issued until enough time has elapsed
	// In this case, a new token will only be issued if the old token is within
	// 30 seconds of expiry. Otherwise, return a bad request status
	if time.Unix(claims.ExpiresAt, 0).Sub(time.Now()) > 30*time.Second {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Now, create a new token for the current use, with a renewed expiration time
	expirationTime := time.Now().Add(5 * time.Minute)
	claims.ExpiresAt = expirationTime.Unix()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Set the new token as the users `token` cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
