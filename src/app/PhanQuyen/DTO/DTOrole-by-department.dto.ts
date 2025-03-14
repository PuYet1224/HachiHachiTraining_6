import { DepartmentDTO } from './DTOdepartment.dto';

export interface RoleByDepartmentRequest {
  Brieft: string | null;
  Code: number | null;
  Company: number | null;
  Config?: any;
  Department: string;
  DepartmentID: string;
  Fax: string | null;
  IsTree: boolean;
  ListDepartment: DepartmentDTO[]; 
  ListLocation: any[];
  ListLocationCode: string | null;
  ListPosition: any[]; 
  ParentCode: string | null;
  ParentID: number | null;
  Phone: string | null;
  Remark: string | null;
  StatusID: number;
  StatusName: string | null;
}

export interface RoleByDepartmentResponse {
  Code: number;
  Company: number | null;
  Department: string;
  DepartmentID: string;
  IsTree: boolean;
  ListPosition: any[]; 
  ParentCode: string | null;
  ParentID: number | null;
  StatusID: number;
  StatusName: string;
  Remark: string | null;
}
