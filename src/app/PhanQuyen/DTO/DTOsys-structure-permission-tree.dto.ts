export interface SysStructurePermissionTreeDTO {
  Company: number;
  Code: number;
  ProductID: number;
  ModuleID: number | string;
  ModuleName: string;
  FunctionName?: string | null;
  ActionName?: string | null;     
  Vietnamese?: string | null;     
  Breadcrumb: string;
  ListGroup?: SysStructurePermissionTreeDTO[];
  ListFunctions?: any[];
  ListAction?: any[];
  ListDataPermission?: any[];
}
