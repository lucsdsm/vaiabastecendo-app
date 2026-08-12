import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import { db } from './index';
import { FuelLog, Vehicle } from './logService';

/**
 * Serviço para backup e importação de dados do aplicativo.
 */

const backup_schema_version = 1;
const backup_file_prefix = 'vaiabastecendo-backup';

interface AppBackup {
  schemaVersion: number;
  app: 'Vai Abastecendo';
  exportedAt: string;
  vehicles: Vehicle[];
  fuelLogs: FuelLog[];
}

interface ImportResult {
  vehicles: number;
  fuelLogs: number;
}

function createBackupFileName() {
  const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, '-');

  return `${backup_file_prefix}-${timestamp}.json`;
}

function isValidVehicle(value: unknown): value is Vehicle {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const vehicle = value as Vehicle;

  return (
    typeof vehicle.id === 'string' &&
    typeof vehicle.name === 'string' &&
    (typeof vehicle.plate === 'string' || vehicle.plate === null) &&
    typeof vehicle.tank_capacity === 'number'
  );
}

function isValidFuelLog(value: unknown): value is FuelLog {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const log = value as FuelLog;

  return (
    typeof log.id === 'string' &&
    typeof log.vehicle_id === 'string' &&
    typeof log.date === 'string' &&
    typeof log.odometer === 'number' &&
    typeof log.liters === 'number' &&
    typeof log.price_per_liter === 'number' &&
    typeof log.total_price === 'number' &&
    typeof log.is_full === 'number' &&
    typeof log.fuel_type === 'string'
  );
}

function parseBackup(rawContent: string): AppBackup {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawContent);
  } catch {
    throw new Error('O arquivo selecionado não contém um JSON válido.');
  }

  if (!parsed || typeof parsed !== 'object') {
    throw new Error('O formato do backup é inválido.');
  }

  const backup = parsed as Partial<AppBackup>;

  if (backup.schemaVersion !== backup_schema_version) {
    throw new Error(
      'Esta versão de backup não é compatível com a versão atual do aplicativo.'
    );
  }

  if (backup.app !== 'Vai Abastecendo') {
    throw new Error(
      'O arquivo selecionado não parece ser um backup do Vai Abastecendo.'
    );
  }

  if (!Array.isArray(backup.vehicles) || !Array.isArray(backup.fuelLogs)) {
    throw new Error('O backup não possui veículos ou abastecimentos válidos.');
  }

  if (!backup.vehicles.every(isValidVehicle)) {
    throw new Error('O backup possui dados de veículos inválidos.');
  }

  if (!backup.fuelLogs.every(isValidFuelLog)) {
    throw new Error('O backup possui dados de abastecimento inválidos.');
  }

  return backup as AppBackup;
}

export async function exportFuelLogBackup() {
  const vehicles = db.getAllSync<Vehicle>(
    `SELECT id, name, plate, tank_capacity
     FROM vehicles
     ORDER BY name ASC`
  );

  const fuelLogs = db.getAllSync<FuelLog>(
    `SELECT id, vehicle_id, date, odometer, liters,
            price_per_liter, total_price, is_full, fuel_type
     FROM logs
     ORDER BY date ASC, odometer ASC`
  );

  const backup: AppBackup = {
    schemaVersion: backup_schema_version,
    app: 'Vai Abastecendo',
    exportedAt: new Date().toISOString(),
    vehicles,
    fuelLogs,
  };

  const fileName = createBackupFileName();
  const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

  await FileSystem.writeAsStringAsync(
    fileUri,
    JSON.stringify(backup, null, 2),
    {
      encoding: FileSystem.EncodingType.UTF8,
    }
  );

  const sharingAvailable = await Sharing.isAvailableAsync();

  if (!sharingAvailable) {
    throw new Error(
      'O compartilhamento de arquivos não está disponível neste dispositivo.'
    );
  }

  await Sharing.shareAsync(fileUri, {
    mimeType: 'application/json',
    dialogTitle: 'Salvar backup do Vai Abastecendo',
    UTI: 'public.json',
  });

  return {
    fileName,
    vehicles: vehicles.length,
    fuelLogs: fuelLogs.length,
  };
}

export async function selectAndImportFuelLogBackup(): Promise<ImportResult | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: ['application/json', 'text/json', 'text/plain'],
    multiple: false,
    copyToCacheDirectory: true,
  });

  if (result.canceled) {
    return null;
  }

  const selectedFile = result.assets[0];

  if (!selectedFile?.uri) {
    throw new Error('Não foi possível acessar o arquivo selecionado.');
  }

  const content = await FileSystem.readAsStringAsync(selectedFile.uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const backup = parseBackup(content);

  db.withTransactionSync(() => {
    for (const vehicle of backup.vehicles) {
      db.runSync(
        `INSERT INTO vehicles (id, name, plate, tank_capacity)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET
           name = excluded.name,
           plate = excluded.plate,
           tank_capacity = excluded.tank_capacity`,
        [
          vehicle.id,
          vehicle.name,
          vehicle.plate,
          vehicle.tank_capacity,
        ]
      );
    }

    for (const log of backup.fuelLogs) {
      db.runSync(
        `INSERT INTO logs (
          id,
          vehicle_id,
          date,
          odometer,
          liters,
          price_per_liter,
          total_price,
          is_full,
          fuel_type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
          vehicle_id = excluded.vehicle_id,
          date = excluded.date,
          odometer = excluded.odometer,
          liters = excluded.liters,
          price_per_liter = excluded.price_per_liter,
          total_price = excluded.total_price,
          is_full = excluded.is_full,
          fuel_type = excluded.fuel_type`,
        [
          log.id,
          log.vehicle_id,
          log.date,
          log.odometer,
          log.liters,
          log.price_per_liter,
          log.total_price,
          log.is_full,
          log.fuel_type,
        ]
      );
    }
  });

  return {
    vehicles: backup.vehicles.length,
    fuelLogs: backup.fuelLogs.length,
  };
}