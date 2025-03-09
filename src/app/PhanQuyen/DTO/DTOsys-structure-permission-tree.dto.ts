export interface SysStructurePermissionTreeDTO {
    Company: number;
    Code: number;
    ProductID: number;
    ModuleID: number | string;
    ModuleName: string;
    FunctionName?: string | null;
    Breadcrumb: string;
    ListGroup?: SysStructurePermissionTreeDTO[]; 
    ListFunctions?: any[];  
    ListAction?: any[];
    ListDataPermission?: any[];
  }
  