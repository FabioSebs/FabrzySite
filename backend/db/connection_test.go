package db

import (
	"testing"
)

func TestConnection(t *testing.T) {
	check := Connect()
	t.Log(check)
}
