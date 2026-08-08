export type DataEntity = 
  | 'prospects' 
  | 'customers' 
  | 'sales' 
  | 'employees' 
  | 'products' 
  | 'vendors';

export type ImportStatus = 'uploading' | 'validating' | 'mapping' | 'preview' | 'processing' | 'completed' | 'failed';

export interface ColumnMapping {
  sourceColumn: string;
  targetField: string;
}

export interface ImportHistory {
  id: string;
  fileName: string;
  entity: DataEntity;
  uploadedBy: string;
  timestamp: string;
  totalRows: number;
  successRows: number;
  failedRows: number;
  updatedRows: number;
  status: 'success' | 'partial' | 'failed';
}

export interface ValidationError {
  row: number;
  field: string;
  error: string;
  suggestion: string;
}

export interface ExportConfig {
  id: string;
  name: string;
  entity: DataEntity;
  frequency: 'daily' | 'weekly' | 'monthly' | 'one-time';
  format: 'csv' | 'xlsx' | 'pdf';
  lastRun?: string;
}
