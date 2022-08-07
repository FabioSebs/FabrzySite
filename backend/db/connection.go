package db

import (
	"database/sql"
	"fmt"

	"github.com/FabioSebs/FabrzySite/color"
	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	fmt.Println(color.Yellow + "Connecting to MYSQL Database ..." + color.Reset)

	// Open up our database connection.
	// I've set up a database on my local machine using phpmyadmin.
	// The database is called testDbfabrzy_site
	db, err := sql.Open("mysql", "root:fiddlesticks@tcp(127.0.0.1:3306)/fabrzydb")

	// if there is an error opening the connection, handle it
	if err != nil {
		panic(err.Error())
	}
	// returning the DB
	return db
}
