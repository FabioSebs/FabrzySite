postgres: pull
	docker run --name fabrzyDB  -p 5432:5432 -e POSTGRES_USER=fabrzy -e POSTGRES_PASSWORD=secret -d 7461e2b092df 

pull:
	docker pull postgres:12-alpine

createdb:
	docker exec -it fabrzyDB createdb --username=fabrzy --owner=fabrzy fabrzyDB

dropdb:
	docker exec -it fabrzyDB dropdb --username=fabrzy --owner=fabrzy fabrzyDB

migrateup:
	migrate -path db/migration -database "postgresql:://fabrzy:secret@localhost:5432/fabrzyDB?sslmode=disabled" -verbose up

migratedown:
	migrate -path db/migration -database "postgresql:://fabrzy:secret@localhost:5432/fabrzyDB?sslmode=disabled" -verbose down


.PHONY: postgres createdb dropdb migrateup migratedown

