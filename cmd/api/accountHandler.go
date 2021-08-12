package main

import (
	"errors"
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
		app.logger.Print(errors.New("error on writing account to response writer"))
		app.errorJson(w, err)
		return
	}
}

func (app *application) getAllAccounts(w http.ResponseWriter, r *http.Request) {

}
