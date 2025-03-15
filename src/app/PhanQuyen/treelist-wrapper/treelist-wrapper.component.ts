import { Component, OnInit } from '@angular/core';
import { DecentralizationService } from '../../services/decentralization.service';
import { SysStructurePermissionTreeDTO } from '../DTO/DTOsys-structure-permission-tree.dto';
import { RoleDTO } from '../DTO/DTOrole.dto';
import { DepartmentDTO } from '../DTO/DTOdepartment.dto';
import { ModuleTreeDTO } from '../DTO/DTOmodule-tree.dto';
import { fakeData } from '../../fake-data';

interface ExtendedTreeNode extends SysStructurePermissionTreeDTO {
  children?: ExtendedTreeNode[];
}

@Component({
  selector: 'app-treelist-wrapper',
  templateUrl: './treelist-wrapper.component.html',
  styleUrls: ['./treelist-wrapper.component.scss']
})
export class TreeListWrapperComponent implements OnInit {
  isLoading = false;
  expandedKeys: any[] = [];
  deptRoleColumns: RoleDTO[] = [];
  globalRoleColumns: RoleDTO[] = [];
  allRoleColumns: RoleDTO[] = [];
  combinedRoleColumns: RoleDTO[] = [];
  selectedRoles: RoleDTO[] = [];
  selectedDepartments: DepartmentDTO[] = [];
  modules: ModuleTreeDTO[] = [];
  fullData: ExtendedTreeNode[] = [];
  rootData: ExtendedTreeNode[] = [];
  selectedRolePermissions: { role: RoleDTO, permission: SysStructurePermissionTreeDTO }[] = [];

  constructor(private service: DecentralizationService) {}

  ngOnInit(): void {
    this.isLoading = true;
    const req = { Company: 1 };
    this.service.getSysStructurePermissionTree(req).subscribe(res => {
      if (res.StatusCode === 0 && res.ObjectReturn) {
        this.fullData = this.transformTree(res.ObjectReturn);
        this.rootData = [...this.fullData];
        this.expandedKeys = [];
        this.populateExpandedKeys(this.fullData);
      } else {
        this.fullData = [];
        this.rootData = [];
      }
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  populateExpandedKeys(nodes: ExtendedTreeNode[]): void {
    for (const node of nodes) {
      if (node.Code !== undefined) {
        this.expandedKeys.push(node.Code);
      }
      if (node.children && node.children.length) {
        this.populateExpandedKeys(node.children);
      }
    }
  }

  onModulesSelected(mods: any): void {
    this.modules = Array.isArray(mods) ? mods : [mods];
    this.applyModuleFilter();
    this.combinedRoleColumns = this.allRoleColumns;
  }
  
  onRolesSelected(roles: RoleDTO[]): void {
    this.globalRoleColumns = roles || [];
    this.combineRoleColumns();
  }

  onDepartmentsSelected(depts: DepartmentDTO[]): void {
    this.selectedDepartments = depts || [];
  }

  onDeptRolesSelected(deptRoles: RoleDTO[]): void {
    this.deptRoleColumns = deptRoles || [];
    this.combineRoleColumns();
  }

  combineRoleColumns(): void {
    const deptSorted = this.deptRoleColumns.sort((a, b) => a.RoleName.localeCompare(b.RoleName));
    const globalSorted = this.globalRoleColumns.sort((a, b) => a.RoleName.localeCompare(b.RoleName));
    this.allRoleColumns = [...deptSorted, ...globalSorted];
    this.combinedRoleColumns = this.allRoleColumns;
  }
  
  filterColumnsByModule(): void {
    this.combinedRoleColumns = this.allRoleColumns;
  }
  
  applyModuleFilter(): void {
    if (!this.modules || this.modules.length === 0 || this.modules.some(m => m.Code === -1)) {
      this.rootData = [...this.fullData];
      return;
    }
    const selectedCodes = this.modules.map(m => m.Code);
    this.rootData = this.fullData.filter(item => selectedCodes.includes(item.Code));
  }

  transformTree(nodes: SysStructurePermissionTreeDTO[]): ExtendedTreeNode[] {
    return nodes.map(node => {
      const children = [
        ...(node.ListGroup ? this.transformTree(node.ListGroup) : []),
        ...(node.ListFunctions ? this.transformTree(node.ListFunctions) : []),
        ...(node.ListAction ? this.transformTree(node.ListAction) : [])
      ];
      return { ...node, children } as ExtendedTreeNode;
    });
  }

  isAction(node: SysStructurePermissionTreeDTO): boolean {
    return !!node.ActionName;
  }

  fetchChildren(node: ExtendedTreeNode): ExtendedTreeNode[] {
    return node.children || [];
  }

  hasChildren(node: ExtendedTreeNode): boolean {
    return !!(node.children && node.children.length);
  }

  isExpanded(_: ExtendedTreeNode): boolean {
    return true;
  }

  onRoleCellClick(permission: SysStructurePermissionTreeDTO, role: RoleDTO): void {
    const index = this.selectedRolePermissions.findIndex(
      item => item.role.RoleID === role.RoleID && item.permission.Code === permission.Code
    );
    if (index > -1) {
      this.selectedRolePermissions.splice(index, 1);
    } else {
      this.selectedRolePermissions.push({ role, permission });
    }
  }

  isPermissionSelected(permission: SysStructurePermissionTreeDTO, role: RoleDTO): boolean {
    return !!this.selectedRolePermissions.find(
      item => item.role.RoleID === role.RoleID && item.permission.Code === permission.Code
    );
  }
}
