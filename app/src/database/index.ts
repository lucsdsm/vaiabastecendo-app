import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('vaiabastecendo.db');

export function initDatabase() {
    try {
        db.execSync(`
            PRAGMA foreign_keys = ON;

            CREATE TABLE IF NOT EXISTS vehicles (
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                plate TEXT,
                tank_capacity REAL NOT NULL
            );

            CREATE TABLE IF NOT EXISTS logs (
                id TEXT PRIMARY KEY NOT NULL,
                vehicle_id TEXT NOT NULL,
                date TEXT NOT NULL,
                odometer REAL NOT NULL,
                liters REAL NOT NULL,
                price_per_liter REAL NOT NULL,
                total_price REAL NOT NULL,
                is_full INTEGER NOT NULL CHECK (is_full IN (0, 1)),
                fuel_type TEXT,
                FOREIGN KEY (vehicle_id) REFERENCES vehicles (id) ON DELETE CASCADE
            );
        `);
        console.log("Banco de dados SQLite inicializado com sucesso.");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}