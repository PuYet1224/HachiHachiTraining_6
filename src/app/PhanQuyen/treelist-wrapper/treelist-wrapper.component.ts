import { Component, OnInit } from '@angular/core';
import { DecentralizationService } from '../../services/decentralization.service';
import { SysStructurePermissionTreeDTO } from '../DTO/DTOsys-structure-permission-tree.dto';
import { RoleDTO } from '../DTO/DTOrole.dto';
import { DepartmentDTO } from '../DTO/DTOdepartment.dto';

@Component({
  selector: 'app-treelist-wrapper',
  templateUrl: './treelist-wrapper.component.html',
  styleUrls: ['./treelist-wrapper.component.scss']
})
export class TreeListWrapperComponent implements OnInit {
  selectedRoles: RoleDTO[] = [];
  selectedDepartments: DepartmentDTO[] = [];
  modules: any[] = [];
  fullData: SysStructurePermissionTreeDTO[] = [];
  rootData: SysStructurePermissionTreeDTO[] = [];

  constructor(private service: DecentralizationService) {}

  ngOnInit(): void {
    const req = { Company: 1 };
    this.service.getSysStructurePermissionTree(req).subscribe(res => {
      if (res.StatusCode === 0 && res.ObjectReturn) {
        this.fullData = res.ObjectReturn;
        this.rootData = [...this.fullData];
      } else {
        this.fullData = [];
        this.rootData = [];
      }
    });
  }

  onModulesSelected(mods: any[]): void {
    this.modules = mods;
    this.applyModuleFilter();
  }

  onRolesSelected(roles: RoleDTO[]): void {
    this.selectedRoles = roles || [];
  }

  onDepartmentsSelected(depts: DepartmentDTO[]): void {
    this.selectedDepartments = depts || [];
  }

  applyModuleFilter(): void {
    if (!this.modules || !this.modules.length) {
      this.rootData = [...this.fullData];
      return;
    }
    const selectedCodes = this.modules.map(m => m.Code);
    this.rootData = this.fullData.filter(item => selectedCodes.includes(item.Code));
  }

  isAction(node: any): boolean {
    return !!node.ActionName;
  }

  hasChildren(node: SysStructurePermissionTreeDTO): boolean {
    return !!(node.ListGroup?.length || node.ListFunctions?.length || node.ListAction?.length);
  }

  fetchChildren(node: SysStructurePermissionTreeDTO): SysStructurePermissionTreeDTO[] {
    return [
      ...(node.ListGroup || []),
      ...(node.ListFunctions || []),
      ...(node.ListAction || [])
    ];
  }

  isExpanded(_: SysStructurePermissionTreeDTO): boolean {
    return true;
  }
}
