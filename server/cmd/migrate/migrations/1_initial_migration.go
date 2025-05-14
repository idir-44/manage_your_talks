package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {

	up := []string{`
	CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

	CREATE TABLE IF NOT EXISTS users (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,

		created_at TIMESTAMP NOT NULL DEFAULT NOW(),
		updated_at TIMESTAMP NOT NULL DEFAULT NOW()
	);

	CREATE TABLE IF NOT EXISTS organizers (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		user_id UUID NOT NULL UNIQUE,
		first_name VARCHAR(255),
		last_name VARCHAR(255),
		created_at TIMESTAMP NOT NULL DEFAULT NOW(),
		updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
		CONSTRAINT fk_organizer_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);

	CREATE TABLE IF NOT EXISTS speakers (
		id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
		user_id UUID NOT NULL UNIQUE,
		first_name VARCHAR(255),
		last_name VARCHAR(255),
		created_at TIMESTAMP NOT NULL DEFAULT NOW(),
		updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
		CONSTRAINT fk_speaker_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
	);
	`}

	down := []string{`
			DROP TABLE IF EXISTS users CASCADE;
			DROP TABLE IF EXISTS organizers CASCADE;
			DROP TABLE IF EXISTS speakers CASCADE;
	`}

	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Println("initial migration up")
		for _, q := range up {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Println("initial migration down")
		for _, q := range down {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
