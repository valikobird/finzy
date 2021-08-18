package models

import (
	"context"
	"database/sql"
	"log"
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

func (m *DBModel) GetAccounts(userId string) ([]*Account, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, user_id, title, currency, balance, created_at, updated_at 
              from account where user_id = $1
							order by title`
	rows, err := m.DB.QueryContext(ctx, query, userId)
	if err != nil {
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {
			log.Println(err)
		}
	}(rows)

	var accounts []*Account

	for rows.Next() {
		var account Account
		err := rows.Scan(
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

		accounts = append(accounts, &account)
	}

	return accounts, nil
}
