package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) getOneAccount(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id := params.ByName("id")
	app.logger.Println("id is", id)

	account, err := app.models.DB.GetAccount(id)

	err = app.writeJson(w, http.StatusOK, account, "account")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllAccounts(w http.ResponseWriter, r *http.Request) {
	const UserId = "4646b744-c4c9-42b6-94fa-9971ee8e58d8"
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
