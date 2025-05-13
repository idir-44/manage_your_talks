package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {

	up := []string{`
		CREATE TABLE talks (
		  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			title TEXT NOT NULL,
			topic TEXT NOT NULL,
			description TEXT,
			duration BIGINT NOT NULL, 
			level TEXT NOT NULL, 
			status VARCHAR(50) NOT NULL DEFAULT 'pending', 

		  owner_id UUID NOT NULL,

			created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

      FOREIGN KEY (owner_id) REFERENCES speakers(id) ON DELETE CASCADE
		);
	`}

	down := []string{`
			DROP TABLE IF EXISTS talks CASCADE;
	`}

	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Print("create talks table")
		for _, q := range up {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Print("drop talks table")
		for _, q := range down {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
