package models

import (
	"context"
	"database/sql"
	"github.com/google/uuid"
	"log"
	"time"
)

func (m *DBModel) GetAccount(id uuid.UUID) (*Account, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `select id, user_id, title, currency, balance, created_at, updated_at 
						from account
						where id = $1`
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
						from account 
						where user_id = $1
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

func (m *DBModel) CreateAccount(account Account) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	stmt := `insert into account (user_id, title, currency, balance) values ($1, $2, $3, $4)`
	_, err := m.DB.ExecContext(ctx, stmt, account.UserId, account.Title, account.Currency, account.Balance)
	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) UpdateAccount(account Account) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	stmt := `update account
					 set title=$1, currency=$2, balance=$3, updated_at=$4
					 where id=$5`
	_, err := m.DB.ExecContext(ctx, stmt, account.Title, account.Currency, account.Balance, account.UpdatedAt, account.Id)
	if err != nil {
		return err
	}

	return nil
}

func (m *DBModel) DeleteAccount(id uuid.UUID) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	stmt := "delete from account where id=$1"
	_, err := m.DB.ExecContext(ctx, stmt, id)
	if err != nil {
		return err
	}

	return nil
}
