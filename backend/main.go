package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/FabioSebs/FabrzySite/backend/db"
	"github.com/FabioSebs/FabrzySite/db"
)

// ENDPOINT
var addr = flag.String("addr", ":8080", "http service address")

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
	flag.Parse()
	hub := newHub()
	go hub.run()
	log.SetFlags(0)

	db.Connect()

	// WEBSOCKET HANDLER
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	// JWT HANDLERS
	http.HandleFunc("/signin", Signin)
	http.HandleFunc("/home", Home)
	http.HandleFunc("/refresh", Refresh)

	fmt.Printf("Server is Live! \n")
	log.Fatal(http.ListenAndServe(*addr, nil))
}
