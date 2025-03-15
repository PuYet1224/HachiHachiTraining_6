import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CompositeFilterDescriptor, FilterDescriptor } from '@progress/kendo-data-query';
import { forkJoin } from 'rxjs';
import { DecentralizationService } from '../../services/decentralization.service';
import { CompanyObjectReturnDto } from '../DTO/DTOcompany.dto';
import { ModuleTreeDTO } from '../DTO/DTOmodule-tree.dto';
import { DepartmentDTO } from '../DTO/DTOdepartment.dto';
import { RoleDTO } from '../DTO/DTOrole.dto';
import { ResponseDTO } from '../DTO/DTOresponse.dto';

@Component({
  selector: 'app-phan-quyen-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class PhanQuyenHeader2Component implements OnInit {
  @Output() modulesSelected = new EventEmitter<ModuleTreeDTO[]>();
  @Output() rolesSelected = new EventEmitter<RoleDTO[]>();
  @Output() departmentsSelected = new EventEmitter<DepartmentDTO[]>();
  @Output() deptRolesSelected = new EventEmitter<RoleDTO[]>();

  companies: CompanyObjectReturnDto[] = [];
  companyList: CompanyObjectReturnDto[] = [];
  selectedCompany = '';
  modules: ModuleTreeDTO[] = [];
  selectedModules: ModuleTreeDTO[] = [];
  departments: DepartmentDTO[] = [];
  selectedDepartments: DepartmentDTO[] = [];
  allRoles: RoleDTO[] = [];
  selectedRoles: RoleDTO[] = [];
  filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  isLoading = false;

  constructor(private service: DecentralizationService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const companyReq = { Filter: this.filter, Keyword: '' };
    const moduleReq = { Level: 2 };
    const deptReq = {
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
    const baseRolesFilter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'Company', operator: 'eq', value: 1 }] as FilterDescriptor[]
    };

    forkJoin({
      companies: this.service.getListCompany(companyReq),
      modules: this.service.getModuleTree(moduleReq),
      departments: this.service.getDepartmentList(deptReq),
      roles: this.service.getRolesList({ filter: baseRolesFilter })
    }).subscribe(results => {
      const resCompanies: ResponseDTO = results.companies;
      this.companies = resCompanies.StatusCode === 0 && resCompanies.ObjectReturn?.Data
        ? resCompanies.ObjectReturn.Data as CompanyObjectReturnDto[]
        : [];
      this.companyList = [{
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
      }, ...this.companies];
      const c = this.companies.find(x => x.Bieft === 'Việt Hạ Chí');
      this.selectedCompany = c ? c.CompanyID : '';
      const resModules: ResponseDTO = results.modules;
      if (resModules.StatusCode === 0 && resModules.ObjectReturn) {
        const allItem: ModuleTreeDTO = {
          Company: 0,
          Code: -1,
          ModuleID: '-1',
          Vietnamese: 'Tất cả',
          OrderBy: 0,
          IsVisible: true,
          ListGroup: []
        };
        this.modules = [allItem, ...(resModules.ObjectReturn as ModuleTreeDTO[])];
        this.selectedModules = [allItem];
        this.modulesSelected.emit(this.selectedModules);
      } else {
        this.modules = [];
      }
      const resDepts: ResponseDTO = results.departments;
      this.departments = resDepts.StatusCode === 0 && resDepts.ObjectReturn
        ? resDepts.ObjectReturn as DepartmentDTO[]
        : [];
      const resRoles: ResponseDTO = results.roles;
      this.allRoles = resRoles.StatusCode === 0 && resRoles.ObjectReturn?.Data
        ? resRoles.ObjectReturn.Data as RoleDTO[]
        : [];
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  moduleChange(value: any): void {
    this.selectedModules = Array.isArray(value) ? value : [value];
    this.modulesSelected.emit(this.selectedModules);
  }

  rolesChange(value: RoleDTO[]): void {
    this.selectedRoles = value;
    this.rolesSelected.emit(value);
  }

  departmentChange(value: DepartmentDTO[]): void {
    this.selectedDepartments = value;
    this.departmentsSelected.emit(value);
    if (!value || value.length === 0) {
      this.deptRolesSelected.emit([]);
      return;
    }
    this.isLoading = true;
    const reqArray = value.map(dept => ({
      Brieft: dept.Brieft,
      Code: dept.Code,
      Company: dept.Company,
      Config: null,
      Department: dept.Department,
      DepartmentID: dept.DepartmentID,
      Fax: dept.Fax,
      IsTree: dept.IsTree,
      ListDepartment: dept.ListDepartment,
      ListLocation: dept.ListLocation,
      ListLocationCode: dept.ListLocationCode,
      ListPosition: dept.ListPosition,
      ParentCode: dept.ParentCode,
      ParentID: dept.ParentID,
      Phone: dept.Phone,
      Remark: dept.Remark,
      StatusID: dept.StatusID,
      StatusName: dept.StatusName
    }));
    const baseRolesFilter: CompositeFilterDescriptor = {
      logic: 'and',
      filters: [{ field: 'Company', operator: 'eq', value: 1 }] as FilterDescriptor[]
    };
    forkJoin({
      deptRolesResp: this.service.getListRoleByDepartment(reqArray),
      globalRolesResp: this.service.getRolesList({ filter: baseRolesFilter })
    }).subscribe(({ deptRolesResp, globalRolesResp }) => {
      const deptRoles = (deptRolesResp.StatusCode === 0 && deptRolesResp.ObjectReturn)
        ? deptRolesResp.ObjectReturn as RoleDTO[]
        : [];
      this.deptRolesSelected.emit(deptRoles);
      const rolesData = (globalRolesResp.StatusCode === 0 && globalRolesResp.ObjectReturn?.Data)
        ? globalRolesResp.ObjectReturn.Data as RoleDTO[]
        : [];
      this.allRoles = rolesData;
      this.isLoading = false;
    }, () => {
      this.deptRolesSelected.emit([]);
      this.isLoading = false;
    });
  }
}
