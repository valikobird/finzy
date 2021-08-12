package models

import (
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

// Models is the wrapper for database
type Models struct {
	DB DBModel
}

// NewModels returns models with db pool
func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

type Account struct {
	Id        string    `json:"id"`
	UserId    string    `json:"user_id"`
	Title     string    `json:"title"`
	Currency  string    `json:"currency"`
	Balance   float64   `json:"balance"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type AccountPart struct {
	Id            string    `json:"id"`
	AccountId     string    `json:"account_id"`
	IsFixedAmount bool      `json:"is_fixed_amount"`
	Amount        float64   `json:"amount"`
	Percentage    byte      `json:"percentage"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`
}

type Goal struct {
	Id        string        `json:"id"`
	Title     string        `json:"title"`
	Currency  string        `json:"currency"`
	Requires  float64       `json:"requires"`
	Achieved  float64       `json:"achieved"`
	Parts     []AccountPart `json:"-"`
	CreatedAt time.Time     `json:"created_at"`
	UpdatedAt time.Time     `json:"updated_at"`
}

type User struct {
	Id       string `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
}
