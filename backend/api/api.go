package api

import (
	"fmt"
	"log"
	"net/http"

	"github.com/FabioSebs/FabrzySite/color"
	"github.com/FabioSebs/FabrzySite/db"
	"github.com/rs/cors"
)

var (
	DB = db.Connect()
)

func RunServer() {
	defer DB.Close()

	// MUX
	mux := http.NewServeMux()

	// JWT HANDLERS
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		LoginUser(w, r, DB)
	})

	mux.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		SignUpUser(w, r, DB)
	})

	mux.HandleFunc("/lookup", func(w http.ResponseWriter, r *http.Request) {
		GetUser(w, r, DB)
	})

	fmt.Println(color.Cyan + "Server is Live!" + color.Reset)

	handler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
