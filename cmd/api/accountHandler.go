package main

import (
	"errors"
	"github.com/julienschmidt/httprouter"
	//"github.com/valikobird/finzy/models"
	"net/http"
	"strconv"
)

func (app *application) getOneAccount(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
	}

	app.logger.Println("id is", id)

	//account := models.Account{
	//	Id:        id,
	//	Title:     "Some account",
	//	Currency:  "USD",
	//	Balance:   "10000",
	//	CreatedAt: time.Now(),
	//	UpdatedAt: time.Now(),
	//}
}

func (app *application) getAllAccounts(w http.ResponseWriter, r *http.Request) {

}
