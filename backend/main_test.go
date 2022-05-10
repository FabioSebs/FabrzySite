package main

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

const (
	USERNAME  string = "Fabrzy"
	PASSWORD  string = "testing1!"
	EMAIL     string = "testing@gmail.com"
	BIRTHDATE string = "1990-01-01"
)

func TestLogin(t *testing.T) {
	// input data
	login_req := &Login{
		Username: USERNAME,
		Password: PASSWORD,
	}

	// json marshal returns an array of bytes
	input, _ := json.Marshal(login_req)

	// make a new POST request
	req := httptest.NewRequest("POST", "/login", bytes.NewBuffer(input))

	// Record HTTP Response
	res := httptest.NewRecorder()

	// Disaptch the HTTP Request
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		LoginUser(w, r, DATABASE)
	})

	handler.ServeHTTP(res, req)

	// Adding Assertions
	status := res.Code

	if status != http.StatusOK {
		t.Errorf("Handler returned a wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Decode the HTTP response
	var post Response
	json.NewDecoder(io.Reader(res.Body)).Decode(&post)

	// Assert HTTP response
	assert.Equal(t, "Success", post.Status)
	assert.Equal(t, 0, post.Error)
}

func TestSignup(t *testing.T) {
	// Created the input data

	signup_req := &SignUp{
		Username:  USERNAME,
		Password:  PASSWORD,
		Email:     EMAIL,
		Birthdate: BIRTHDATE,
	}

	input, _ := json.Marshal(signup_req)

	// Make a new POST Request
	req := httptest.NewRequest("POST", "/signup", bytes.NewBuffer(input))

	//Record HTTP Response
	res := httptest.NewRecorder()

	// Dispatch the HTTP Request
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		SignUpUser(w, r, DATABASE)
	})

	handler.ServeHTTP(res, req)

	//Add assertions on the HTTP Status code and the response
	status := res.Code

	if status != http.StatusOK {
		t.Errorf("Handler returned a wrong status code: got %v want %v", status, http.StatusOK)
	}

	// Decode the HTTP response
	var post Response
	json.NewDecoder(io.Reader(res.Body)).Decode(&post)

	// Assert HTTP Response
	assert.Equal(t, "Success", post.Status)
	assert.Equal(t, 0, post.Error)
}
