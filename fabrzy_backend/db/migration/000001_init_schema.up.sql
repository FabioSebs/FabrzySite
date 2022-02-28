CREATE TABLE "users" (
  "user_id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "date_of_birth" date,
  "created_at" timestamptz DEFAULT (now())
);

CREATE TABLE "emails" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "subject" varchar,
  "message" varchar
);

ALTER TABLE "emails" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");
