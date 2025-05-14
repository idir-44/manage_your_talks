package migrations

import (
	"context"
	"fmt"

	"github.com/uptrace/bun"
)

func init() {

	up := []string{`
		CREATE TABLE rooms (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			name VARCHAR(100) NOT NULL UNIQUE,


			created_at TIMESTAMP NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMP NOT NULL DEFAULT NOW()
		);

		CREATE TABLE plannings (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			talk_id UUID NOT NULL UNIQUE,
			room_id UUID NOT NULL,
			start_at TIMESTAMP NOT NULL,

			created_at TIMESTAMP NOT NULL DEFAULT NOW(),
			updated_at TIMESTAMP NOT NULL DEFAULT NOW(),


			CONSTRAINT fk_planning_talk FOREIGN KEY (talk_id) REFERENCES talks(id) ON DELETE CASCADE,
			CONSTRAINT fk_planning_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
		);
	`}

	down := []string{`
			DROP TABLE IF EXISTS rooms CASCADE;
			DROP TABLE IF EXISTS plannings CASCADE;
	`}

	Migrations.MustRegister(func(ctx context.Context, db *bun.DB) error {
		fmt.Println("create rooms and plannings tables")
		for _, q := range up {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	}, func(ctx context.Context, db *bun.DB) error {
		fmt.Println("drop rooms and plannings tables")
		for _, q := range down {
			_, err := db.Exec(q)
			if err != nil {
				return err
			}
		}
		return nil
	})
}
