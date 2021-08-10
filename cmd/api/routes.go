package main

import (
	"github.com/julienschmidt/httprouter"
	"net/http"
)

func (app *application) routes() *httprouter.Router {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/account/:id", app.getOneAccount)
	router.HandlerFunc(http.MethodGet, "/v1/accounts", app.getAllAccounts)

	return router
}
