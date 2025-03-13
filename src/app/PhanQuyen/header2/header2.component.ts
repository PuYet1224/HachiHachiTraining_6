import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompositeFilterDescriptor, toDataSourceRequest } from '@progress/kendo-data-query';
import { forkJoin } from 'rxjs';
import { DecentralizationService } from '../../services/decentralization.service';
import { CompanyObjectReturnDto } from '../DTO/DTOcompany.dto';
import { ModuleTreeDTO } from '../DTO/DTOmodule-tree.dto';
import { DepartmentDTO, PositionDTO } from '../DTO/DTOdepartment.dto';
import { RoleDTO } from '../DTO/DTOrole.dto';
import { ResponseDTO } from '../DTO/DTOresponse.dto';
import { RoleByDepartmentRequest } from '../DTO/DTOrole-by-department.dto';

@Component({
  selector: 'app-phan-quyen-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class PhanQuyenHeader2Component implements OnInit {
  @Output() modulesSelected = new EventEmitter<ModuleTreeDTO[]>();
  @Output() rolesSelected = new EventEmitter<RoleDTO[]>();
  @Output() departmentsSelected = new EventEmitter<DepartmentDTO[]>();

  companies: CompanyObjectReturnDto = [];
  companyList: CompanyObjectReturnDto = [];
  selectedCompany = '';
  modules: ModuleTreeDTO[] = [];
  selectedModules: ModuleTreeDTO[] = [];
  departments: DepartmentDTO[] = [];
  selectedDepartments: DepartmentDTO[] = [];
  roles: RoleDTO[] = [];
  selectedRoles: RoleDTO[] = [];
  filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };

  constructor(private service: DecentralizationService) {}

  ngOnInit(): void {
    const companyRequest = { Filter: this.filter.filters.length ? this.filter : {}, Keyword: '' };
    this.service.getListCompany(companyRequest).subscribe((res: ResponseDTO) => {
      this.companies = res.StatusCode === 0 && res.ObjectReturn?.Data ? res.ObjectReturn.Data : [];
      this.companyList = [
        {
          CompanyID: '',
          Bieft: '-- Chọn --',
          VNName: '',
          Address: '',
          CountryName: null,
          TypeCompanyName: '',
          URLLogo: '',
          Code: 0,
          Country: null,
          Province: null,
          District: null,
          Ward: null,
          ConfigDesc: null,
          IsSystem: false
        },
        ...this.companies
      ];
      const c = this.companies.find(x => x.Bieft === 'Việt Hạ Chí');
      this.selectedCompany = c ? c.CompanyID : '';
    });

    const moduleRequest = { Level: 2 };
    this.service.getModuleTree(moduleRequest).subscribe((res: ResponseDTO) => {
      this.modules = res.StatusCode === 0 && res.ObjectReturn ? res.ObjectReturn : [];
    });

    const deptRequest = {
      Brieft: '',
      Code: 0,
      Company: 1, 
      Department: '',
      DepartmentID: '',
      Fax: '',
      IsTree: true,
      ListDepartment: [],
      ListLocation: [],
      ListLocationCode: '',
      ListPosition: [],
      ParentCode: '',
      ParentID: null,
      Phone: '',
      Remark: '',
      StatusID: 0,
      StatusName: 'Tạo mới'
    };
    this.service.getDepartmentList(deptRequest).subscribe((res: ResponseDTO) => {
      if (res.StatusCode === 0 && res.ObjectReturn) {
        const deptData = res.ObjectReturn as DepartmentDTO[];
        this.departments = this.transformDepartmentData(deptData);
      } else {
        this.departments = [];
      }
    });

    const rolesState = {
      filter: { logic: 'and', filters: [{ field: 'Company', operator: 'eq', value: 1 }] }
    };
    this.service.getRolesList(rolesState).subscribe((res: ResponseDTO) => {
      if (res.StatusCode === 0 && res.ObjectReturn?.Data) {
        this.roles = res.ObjectReturn.Data;
      } else {
        this.roles = [];
      }
    });
  }

  transformDepartmentData(departments: DepartmentDTO[]): DepartmentDTO[] {
    return departments.map(dept => {
      const childDepartments = dept.ListDepartment ? this.transformDepartmentData(dept.ListDepartment) : [];
      const positionAsDepartment = (dept.ListPosition || []).map(pos => {
        const fakeDept: DepartmentDTO = {
          Brieft: '',
          Code: pos.Code,
          Company: dept.Company,
          Department: pos.Position,
          DepartmentID: pos.PositionID,
          Fax: '',
          IsTree: false,
          ListDepartment: [],
          ListLocation: [],
          ListLocationCode: '',
          ListPosition: [],
          ParentCode: '',
          ParentID: null,
          Phone: '',
          Remark: '',
          StatusID: pos.StatusID,
          StatusName: pos.StatusName
        };
        return fakeDept;
      });
      return { ...dept, ListDepartment: [...childDepartments, ...positionAsDepartment] };
    });
  }

  moduleChange(value: ModuleTreeDTO[]) {
    this.selectedModules = value;
    this.modulesSelected.emit(value);
  }

  rolesChange(value: RoleDTO[]) {
    this.selectedRoles = value;
    this.rolesSelected.emit(value);
  }

  departmentChange(value: DepartmentDTO[]) {
    this.selectedDepartments = value;
    this.departmentsSelected.emit(value);

    if (!value || value.length === 0) {
      this.roles = [];
      this.rolesSelected.emit([]);
      return;
    }

    const reqArray: RoleByDepartmentRequest[] = value.map((dept) => {
      const fixedCompany = dept.Company || Number(this.selectedCompany) || 1;
      return {
        Brieft: dept.Brieft || '',
        Code: dept.Code || 0,
        Company: fixedCompany,
        Config: null,
        Department: dept.Department || '',
        DepartmentID: dept.DepartmentID || '',
        Fax: dept.Fax || '',
        IsTree: dept.IsTree,
        ListDepartment: [],
        ListLocation: [],
        ListLocationCode: dept.ListLocationCode || '',
        ListPosition: dept.ListPosition || [],
        ParentCode: dept.ParentCode || '',
        ParentID: dept.ParentID,
        Phone: dept.Phone || '',
        Remark: dept.Remark || '',
        StatusID: dept.StatusID,
        StatusName: dept.StatusName || ''
      };
    });

    const firstDept = reqArray[0];
    const filterByDept: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [
        { field: 'Company', operator: 'eq', value: firstDept.Company || 1 },
        { field: 'Code', operator: 'neq', value: 134 },
        { field: 'Code', operator: 'neq', value: 148 },
        { field: 'Code', operator: 'neq', value: 128 },
        { field: 'Code', operator: 'neq', value: 40 },
        { field: 'Code', operator: 'neq', value: 133 },
        { field: 'Code', operator: 'neq', value: 132 },
        { field: 'Code', operator: 'neq', value: 3 },
        { field: 'Code', operator: 'neq', value: 11 },
        { field: 'Code', operator: 'neq', value: 7 },
        { field: 'Code', operator: 'neq', value: 23 }
      ]
    };
    const rolesState = { filter: filterByDept };

    forkJoin([
      this.service.getListRoleByDepartment(reqArray),
      this.service.getRolesList(rolesState)
    ]).subscribe(
      ([deptRoleRes, rolesRes]: [ResponseDTO, ResponseDTO]) => {
        if (deptRoleRes.StatusCode === 0 && deptRoleRes.ObjectReturn) {
          const deptRoles = deptRoleRes.ObjectReturn as RoleDTO[];
          let allRoles: RoleDTO[] = [];
          if (rolesRes.StatusCode === 0 && rolesRes.ObjectReturn?.Data) {
            allRoles = rolesRes.ObjectReturn.Data as RoleDTO[];
          }

          const merged = [...deptRoles];
          allRoles.forEach(r => {
            if (!merged.some(m => m.Code === r.Code)) {
              merged.push(r);
            }
          });

          this.roles = merged;
          this.rolesSelected.emit(this.roles);
        } else {
          this.roles = [];
          this.rolesSelected.emit(this.roles);
        }
      },
      (err) => {
        console.error('Error fetching roles', err);
        this.roles = [];
        this.rolesSelected.emit(this.roles);
      }
    );
  }
}
