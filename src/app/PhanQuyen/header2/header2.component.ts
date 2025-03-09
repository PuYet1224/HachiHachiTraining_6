// phan-quyen-header2.component.ts
import { Component, OnInit } from '@angular/core';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
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
  companies: CompanyObjectReturnDto = [];
  modules: ModuleTreeDTO[] = [];
  departments: DepartmentDTO[] = [];
  roles: RoleDTO[] = [];
  selectedCompany: any = null;
  selectedModules: ModuleTreeDTO[] = [];
  selectedDepartments: DepartmentDTO[] = [];
  selectedRole: any = null;
  filter: CompositeFilterDescriptor = { logic: 'and', filters: [] };
  constructor(private decentralizationService: DecentralizationService) {}
  ngOnInit(): void {
    const companyRequest = { Filter: this.filter.filters && this.filter.filters.length > 0 ? this.filter : {}, Keyword: "" };
    this.decentralizationService.getListCompany(companyRequest).subscribe((res: ResponseDTO) => {
      this.companies = (res.StatusCode === 0 && res.ObjectReturn && res.ObjectReturn.Data) ? res.ObjectReturn.Data : [];
    });
    const moduleRequest = { Level: 2 };
    this.decentralizationService.getModuleTree(moduleRequest).subscribe((res: ResponseDTO) => {
      this.modules = (res.StatusCode === 0 && res.ObjectReturn) ? res.ObjectReturn : [];
    });
    const departmentRequest = {
      Brieft: "",
      Code: 0,
      Company: 1,
      Department: "",
      DepartmentID: "",
      Fax: "",
      IsTree: true,
      ListDepartment: [],
      ListLocation: [],
      ListLocationCode: "",
      ListPosition: [],
      ParentCode: "",
      ParentID: null,
      Phone: "",
      Remark: "",
      StatusID: 0,
      StatusName: "Tạo mới"
    };
    this.decentralizationService.getDepartmentList(departmentRequest).subscribe((res: ResponseDTO) => {
      this.departments = (res.StatusCode === 0 && res.ObjectReturn) ? res.ObjectReturn : [];
    });
    const rolesState = {
      filter: {
        logic: "and",
        filters: [
          { field: "Company", operator: "eq", value: 1 }
        ]
      }
    };
    this.decentralizationService.getRolesList(rolesState).subscribe((res: ResponseDTO) => {
      this.roles = (res.StatusCode === 0 && res.ObjectReturn && res.ObjectReturn.Data) ? res.ObjectReturn.Data : [];
    });
  }
}
