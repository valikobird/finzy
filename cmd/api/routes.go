package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodPost, "/v1/account", app.createAccount)
	router.HandlerFunc(http.MethodGet, "/v1/account/:id", app.getOneAccount)
	router.HandlerFunc(http.MethodGet, "/v1/accounts", app.getAllAccounts)

	return app.enableCORS(router)
}
