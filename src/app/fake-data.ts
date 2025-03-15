import { SysStructurePermissionTreeDTO } from './PhanQuyen/DTO/DTOsys-structure-permission-tree.dto';
import { DepartmentDTO } from './PhanQuyen/DTO/DTOdepartment.dto';
export const fakeData: SysStructurePermissionTreeDTO[] = [
  {
    Company: 1,
    Code: 1,
    ProductID: 0,
    ModuleID: "Module1",
    ModuleName: "Dashboard Module",
    FunctionName: null,
    ActionName: 'Dashboard',
    Vietnamese: 'Bảng điều khiển',
    Breadcrumb: "Dashboard",
    ListGroup: [
      {
        Company: 1,
        Code: 2,
        ProductID: 0,
        ModuleID: "Module1",
        ModuleName: "User Management Module",
        FunctionName: null,
        ActionName: 'User Management',
        Vietnamese: 'Quản lý người dùng',
        Breadcrumb: "Dashboard > User Management",
        ListGroup: [],
        ListFunctions: [
          {
            Company: 1,
            Code: 3,
            ProductID: 0,
            ModuleID: "Module1",
            ModuleName: "User Management Module",
            FunctionName: null,
            ActionName: 'Add User',
            Vietnamese: 'Thêm người dùng',
            Breadcrumb: "Dashboard > User Management > Add User",
            ListGroup: [],
            ListFunctions: [],
            ListAction: []
          },
          {
            Company: 1,
            Code: 4,
            ProductID: 0,
            ModuleID: "Module1",
            ModuleName: "User Management Module",
            FunctionName: null,
            ActionName: 'Edit User',
            Vietnamese: 'Sửa người dùng',
            Breadcrumb: "Dashboard > User Management > Edit User",
            ListGroup: [],
            ListFunctions: [],
            ListAction: []
          }
        ],
        ListAction: []
      }
    ],
    ListFunctions: [],
    ListAction: []
  },
  {
    Company: 1,
    Code: 5,
    ProductID: 0,
    ModuleID: "Module2",
    ModuleName: "Reports Module",
    FunctionName: null,
    ActionName: 'Reports',
    Vietnamese: 'Báo cáo',
    Breadcrumb: "Reports",
    ListGroup: [],
    ListFunctions: [
      {
        Company: 1,
        Code: 6,
        ProductID: 0,
        ModuleID: "Module2",
        ModuleName: "Reports Module",
        FunctionName: null,
        ActionName: 'Sales Report',
        Vietnamese: 'Báo cáo bán hàng',
        Breadcrumb: "Reports > Sales Report",
        ListGroup: [],
        ListFunctions: [],
        ListAction: []
      }
    ],
    ListAction: []
  }
];
export const fakeDepartments: DepartmentDTO[] = [
  {
    Brieft: 'Phòng Kỹ thuật (fake)',
    Code: 1,
    Company: 1,
    Department: 'Kỹ thuật (fake)',
    DepartmentID: 'KT001',
    Fax: null,
    IsTree: true,
    ListDepartment: [
      {
        Brieft: 'Tổ Bảo trì (fake)',
        Code: 11,
        Company: 1,
        Department: 'Bảo trì (fake)',
        DepartmentID: 'BT001',
        Fax: null,
        IsTree: false,
        ListDepartment: [],
        ListLocation: [],
        ListLocationCode: null,
        ListPosition: [],
        ParentCode: null,
        ParentID: null,
        Phone: null,
        Remark: null,
        StatusID: 1,
        StatusName: 'Active'
      }
    ],
    ListLocation: [],
    ListLocationCode: null,
    ListPosition: [],
    ParentCode: null,
    ParentID: null,
    Phone: null,
    Remark: null,
    StatusID: 1,
    StatusName: 'Active'
  },
  {
    Brieft: 'Phòng Kinh doanh (fake)',
    Code: 2,
    Company: 1,
    Department: 'Kinh doanh (fake)',
    DepartmentID: 'KD001',
    Fax: null,
    IsTree: true,
    ListDepartment: [],
    ListLocation: [],
    ListLocationCode: null,
    ListPosition: [],
    ParentCode: null,
    ParentID: null,
    Phone: null,
    Remark: null,
    StatusID: 1,
    StatusName: 'Active'
  }
];