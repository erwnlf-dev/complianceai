// FILE: src/lib/utils.ts
import { Policy, Integration, Evidence, ActivityLog } from './types';

export function formatDate(date: number): string {
  return new Date(date).toLocaleDateString('id-ID');
}

export function formatNumber(num: number): string {
  return num.toLocaleString('id-ID');
}

export function classNames(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function exportJSON(data: any, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importJSON(file: File, callback: (data: any) => void): void {
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target?.result) {
      callback(JSON.parse(event.target.result as string));
    }
  };
  reader.readAsText(file);
}
