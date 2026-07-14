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

export function createVehicle(name: string, plate: string, tankCapacity: number): string {
    const id = Crypto.randomUUID();
    db.runSync(
        `INSERT INTO vehicles (id, name, plate, tank_capacity) VALUES (?, ?, ?, ?)`,
        [id, name, plate, tankCapacity]
    );
    return id;
}

export function updateFuelLog(log: FuelLog) {
    db.runSync(
        `UPDATE logs SET date = ?, odometer = ?, liters = ?, price_per_liter = ?, total_price = ?, is_full = ?, fuel_type = ? WHERE id = ?`,
        [log.date, log.odometer, log.liters, log.price_per_liter, log.total_price, log.is_full, log.fuel_type, log.id]
    );
}

export function deleteFuelLog(id: string) {
    db.runSync(`DELETE FROM logs WHERE id = ?`, [id]);
}

export function deleteVehicle(id: string) {
    db.runSync(`DELETE FROM vehicles WHERE id = ?`, [id]);
    db.runSync(`DELETE FROM logs WHERE vehicle_id = ?`, [id]);
}

export function getVehicles(): Vehicle[] {
    return db.getAllSync<Vehicle>(`SELECT * FROM vehicles ORDER BY name ASC`);
}

export function addFuelLog(log: Omit<FuelLog, 'id'>): string {
    const id = Crypto.randomUUID();

    db.runSync(
        `INSERT INTO logs (id, vehicle_id, date, odometer, liters, price_per_liter, total_price, is_full, fuel_type) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            id, 
            log.vehicle_id, 
            log.date, 
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

export function getVehicleLogs(vehicleId: string): (FuelLog & { 
    km_per_liter: number | null;
    distance_driven: number | null;
    cost_per_km: number | null;
})[] {
    const logs = db.getAllSync<FuelLog>(
        `SELECT * FROM logs WHERE vehicle_id = ? ORDER BY odometer ASC`,
        [vehicleId]
    );

    let lastFullOdometer: number | null = null;
    let previousOdometer: number | null = null;
    let accumulatedLiters = 0;

    const logsWithMetrics = logs.map((log) => {
        let kmPerLiter: number | null = null;
        let distanceDriven: number | null = null;
        let costPerKm: number | null = null;

        if (previousOdometer !== null) {
            distanceDriven = log.odometer - previousOdometer;
            if (distanceDriven > 0) {
                costPerKm = log.total_price / distanceDriven;
            }
        }
        previousOdometer = log.odometer;

        if (log.is_full === 1) {
            if (lastFullOdometer !== null) {
                const distance = log.odometer - lastFullOdometer;
                const totalLitersCalculated = accumulatedLiters + log.liters;
                
                if (totalLitersCalculated > 0) {
                    kmPerLiter = distance / totalLitersCalculated;
                }
            }
            lastFullOdometer = log.odometer;
            accumulatedLiters = 0;
        } else {
            accumulatedLiters += log.liters;
        }

        return {
            ...log,
            km_per_liter: kmPerLiter,
            distance_driven: distanceDriven,
            cost_per_km: costPerKm
        };
    });

    return logsWithMetrics.reverse();
}

export function getVehicleStats(vehicleId: string) {
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