package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/FabioSebs/FabrzySite/color"
	"github.com/FabioSebs/FabrzySite/db"
	"github.com/rs/cors"
)

var (
	DATABASE = db.Connect()
)

// WEBSOCKET HANDLER
func test(w http.ResponseWriter, r *http.Request) {
	// CORS POLICY
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	// UPGRADE TO WEBSOCKETS
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Fatal(err)
		return
	}
	defer conn.Close()

	// MESSAGES??
	for {
		mt, message, err := conn.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		err = conn.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}

func main() {
	// MUX
	mux := http.NewServeMux()

	// HUB
	hub := newHub()
	go hub.run()
	log.SetFlags(0)

	// WEBSOCKET HANDLER
	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	// DATABASE
	defer DATABASE.Close()

	// JWT HANDLERS
	mux.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		LoginUser(w, r, DATABASE)
	})

	mux.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		SignUpUser(w, r, DATABASE)
	})

	mux.HandleFunc("/lookup", func(w http.ResponseWriter, r *http.Request) {
		GetUser(w, r, DATABASE)
	})

	mux.HandleFunc("/home", Home)
	mux.HandleFunc("/refresh", Refresh)

	fmt.Println(color.Cyan + "Server is Live!" + color.Reset)

	handler := cors.Default().Handler(mux)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
