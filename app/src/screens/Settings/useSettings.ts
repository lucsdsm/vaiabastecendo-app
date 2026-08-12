import { useCallback, useState } from 'react';

import { exportFuelLogBackup, selectAndImportFuelLogBackup } from '@database/backupService';

import { useToast } from '@contexts/ToastContext';

import { useAppTheme } from '@theme/ThemeProvider';

export function useSettings() {
  const { colors, toggleTheme, isDark } = useAppTheme();

  const { showToast } = useToast();

  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  const handleExportBackup = useCallback(async () => {
    try {
      setIsExporting(true);

      const result = await exportFuelLogBackup();

      showToast(
        `${result.vehicles} veículo(s) e ${result.fuelLogs} abastecimento(s) foram preparados para exportação.`,
        {
          title: "Backup criado",
          type: "success",
        },
      );
    } catch (error) {
      console.error("Erro ao exportar backup:", error);

      showToast("Não foi possível criar o backup. Tente novamente.", {
        title: "Erro ao exportar",
        type: "danger",
      });
    } finally {
      setIsExporting(false);
    }
  }, [showToast]);

  const handleImportBackup = useCallback(async () => {
    try {
      setIsImporting(true);

      const result = await selectAndImportFuelLogBackup();

      if (!result) {
        return;
      }

      showToast(
        `${result.vehicles} veículo(s) e ${result.fuelLogs} abastecimento(s) foram importados.`,
        {
          title: "Backup restaurado",
          type: "success",
        },
      );
    } catch (error) {
      console.error("Erro ao importar backup:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível importar o backup selecionado.";

      showToast(message, {
        title: "Erro ao importar",
        type: "danger",
      });
    } finally {
      setIsImporting(false);
    }
  }, [showToast]);

  return {
    colors,
    isDark,
    toggleTheme,
    isExporting,
    isImporting,
    handleExportBackup,
    handleImportBackup,
  };
}