package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/FabioSebs/FabrzySite/color"
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

	// WEBSOCKET HANDLER
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(hub, w, r)
	})

	// DATABASE
	db := db.Connect()
	defer db.Close()

	// JWT HANDLERS
	http.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		LoginUser(w, r, db)
	})

	http.HandleFunc("/signup", func(w http.ResponseWriter, r *http.Request) {
		SignUpUser(w, r, db)
	})

	http.HandleFunc("/home", Home)
	http.HandleFunc("/refresh", Refresh)

	fmt.Println(color.Cyan + "Server is Live!" + color.Reset)
	log.Fatal(http.ListenAndServe(*addr, nil))
}
