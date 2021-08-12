package models

import (
	"context"
	"time"
)

func (m *DBModel) GetAccount(id string) (*Account, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, user_id, title, currency, balance, created_at, updated_at 
              from account where id = $1`
	row := m.DB.QueryRowContext(ctx, query, id)

	var account Account

	err := row.Scan(
		&account.Id,
		&account.UserId,
		&account.Title,
		&account.Currency,
		&account.Balance,
		&account.CreatedAt,
		&account.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return &account, nil
}

func (m *DBModel) GetAccounts() ([]*Account, error) {
	return nil, nil
}
