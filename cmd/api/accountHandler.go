package main

import (
	"errors"
	"github.com/julienschmidt/httprouter"
	"github.com/valikobird/finzy/models"
	"net/http"
	"time"
)

func (app *application) getOneAccount(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id := params.ByName("id")
	app.logger.Println("id is", id)

	account := models.Account{
		Id:        id,
		Title:     "Some account",
		Currency:  "USD",
		Balance:   10000,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	err := app.writeJson(w, http.StatusOK, account, "account")
	if err != nil {
		app.logger.Print(errors.New("error on writing account to response writer"))
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllAccounts(w http.ResponseWriter, r *http.Request) {

}
