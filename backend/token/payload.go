package token

import (
	"time"

	uuid "github.com/jackc/pgtype/ext/gofrs-uuid"
)

// Payload contains the payload data of the token
type Payload struct {
	ID        uuid.UUID
	Username  string    `json:"username"`
	IssuedAt  time.Time `json:"issued_at"`
	ExpiredAt time.Time `json:"expired_at"`
}
