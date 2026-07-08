import * as Crypto from 'expo-crypto';
import { db } from './index';

export interface Vehicle {
    id: string;
    name: string;
    plate: string | null;
    tank_capacity: number;
}

export interface FuelLog {
    id: string;
    vehicle_id: string;
    date: string;
    odometer: number;
    liters: number;
    price_per_liter: number;
    total_price: number;
    is_full: number;
    fuel_type: string;
}

// 1. CRIACAO DE VEICULO E LOGS 
export function createVehicle(name: string, plate: string, tankCapacity: number): string {
    const id = Crypto.randomUUID();
    db.runSync(
        `INSERT INTO vehicles (id, name, plate, tank_capacity) VALUES (?, ?, ?, ?)`,
        [id, name, plate, tankCapacity]
    );
    return id;
}

export function getVehicles(): Vehicle[] {
    return db.getAllSync<Vehicle>(`SELECT * FROM vehicles ORDER BY name ASC`);
}

// 2. CRIACAO DE LOGS DE ABASTECIMENTO
export function addFuelLog(log: Omit<FuelLog, 'id' | 'date'>): string {
    const id = Crypto.randomUUID();
    const currentDate = new Date().toISOString();

    db.runSync(
        `INSERT INTO logs (id, vehicle_id, date, odometer, liters, price_per_liter, total_price, is_full, fuel_type) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id, 
            log.vehicle_id, 
            currentDate, 
            log.odometer, 
            log.liters, 
            log.price_per_liter, 
            log.total_price, 
            log.is_full, 
            log.fuel_type
        ]
    );
    return id;
}

export function getVehicleLogs(vehicleId: string): FuelLog[] {
    // Busca do mais recente para o mais antigo
    return db.getAllSync<FuelLog>(
        `SELECT * FROM logs WHERE vehicle_id = ? ORDER BY date DESC`,
        [vehicleId]
    );
}

// 3. ESTATISTICAS DE GASTO E LITROS
export function getVehicleStats(vehicleId: string) {
    // Busca o total gasto e total de litros
    const stats = db.getFirstSync<{ total_spent: number; total_liters: number }>(
        `SELECT SUM(total_price) as total_spent, SUM(liters) as total_liters 
         FROM logs WHERE vehicle_id = ?`,
        [vehicleId]
    );

    return {
        totalSpent: stats?.total_spent || 0,
        totalLiters: stats?.total_liters || 0,
    };
}