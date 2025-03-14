export interface RoleDTO {
  Code: number;
  Company: number;
  RoleName: string;
  IsSupperAdmin: boolean;
  TypeData: number;
  StaffID?: string | null;
  CreateBy?: string;
  CreateTime?: string;
  LastModifiedBy?: string | null;
  LastModifiedTime?: string | null;
  RoleID: string;
  Remark?: string | null;
  Role?: any;
  OrderBy: number;
  ListPositionApply?: any[];
}
