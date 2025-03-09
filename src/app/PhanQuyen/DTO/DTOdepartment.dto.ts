export interface DepartmentDTO {
    Brieft: string;
    Code: number;
    Company: number;
    Department: string;
    DepartmentID: string;
    Fax: string;
    IsTree: boolean;
    ListDepartment: DepartmentDTO[]; 
    ListLocation: any[];           
    ListLocationCode: string;
    ListPosition: PositionDTO[];    
    ParentCode: string;
    ParentID: number | null;
    Phone: string;
    Remark: string;
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
  