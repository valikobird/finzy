package main

import (
	"net/http"

	"github.com/valikobird/finzy/server"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.Handle("/", http.FileServer(http.Dir("./views/")))
	r.Handle("/status/", server.StatusHandler).Methods("GET")
	r.Handle("/accounts/", server.AccountHandler).Methods("GET")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))

	http.ListenAndServe(":8080", r)
}
