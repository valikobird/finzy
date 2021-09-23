package main

import (
	"encoding/json"
	"github.com/google/uuid"
	"github.com/julienschmidt/httprouter"
	"github.com/valikobird/finzy/models"
	"net/http"
	"strconv"
	"time"
)

type jsonResp struct {
	OK      bool   `json:"ok"`
	Message string `json:"message"`
}

func (app *application) getOneAccount(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, _ := uuid.Parse(params.ByName("id"))
	account, err := app.models.DB.GetAccount(id)

	err = app.writeJson(w, http.StatusOK, account, "account")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllAccounts(w http.ResponseWriter, r *http.Request) {
	const UserId = "2704aed7-e431-4ee1-90d6-465c4f744c61"
	accounts, err := app.models.DB.GetAccounts(UserId)
	if err != nil {
		app.errorJson(w, err)
		return
	}

	err = app.writeJson(w, http.StatusOK, accounts, "accounts")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) deleteAccount(w http.ResponseWriter, r *http.Request) {

}

type AccountPayload struct {
	Id       string `json:"id"`
	UserId   string `json:"userId"`
	Title    string `json:"title"`
	Currency string `json:"currency"`
	Balance  string `json:"balance"`
}

func (app *application) editAccount(w http.ResponseWriter, r *http.Request) {
	var payload AccountPayload

	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		app.errorJson(w, err)
		return
	}

	var account models.Account
	if payload.Id != "" {
		id, _ := uuid.Parse(payload.Id)
		a, _ := app.models.DB.GetAccount(id)
		account = *a
		account.UpdatedAt = time.Now()
	}
	account.UserId = payload.UserId
	account.Title = payload.Title
	account.Currency = payload.Currency
	account.Balance, err = strconv.ParseFloat(payload.Balance, 64)
	if err != nil {
		app.errorJson(w, err)
		return
	}

	if account.Id == uuid.Nil {
		err = app.models.DB.CreateAccount(account)
	} else {
		err = app.models.DB.UpdateAccount(account)
	}
	if err != nil {
		app.errorJson(w, err)
		return
	}

	ok := jsonResp{
		OK: true,
	}

	err = app.writeJson(w, http.StatusOK, ok, "response")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) searchAccount(w http.ResponseWriter, r *http.Request) {

}
