export interface DepartmentDTO {
  Brieft: string | null;
  Code: number;
  Company: number;
  Department: string;
  DepartmentID: string;
  Fax: string | null;
  IsTree: boolean;
  ListDepartment: DepartmentDTO[]; 
  ListLocation: any[];
  ListLocationCode: string | null;
  ListPosition: PositionDTO[];
  ParentCode: string | null;
  ParentID: number | null;
  Phone: string | null;
  Remark: string | null;
  StatusID: number;
  StatusName: string;
}

export interface PositionDTO {
  DepartmentCode?: string | null;
  DepartmentName?: string | null;
  ReportToCode?: string | null;
  GroupPositionCode?: string | null;
  StatusName: string;
  ListChild?: any;
  ListLocation?: any;
  NoOfStaff: number;
  Code: number;
  PositionID: string;
  Position: string;
  IsLeader: boolean;
  IsSupervivor: boolean;
  DepartmentID: number | string;
  ReportTo: number | string;
  GroupPosition?: any;
  Remark?: string | null;
  OrderBy: number;
  ListOfRoles?: string | null;
  Config?: any; 
  StatusID: number;
}
