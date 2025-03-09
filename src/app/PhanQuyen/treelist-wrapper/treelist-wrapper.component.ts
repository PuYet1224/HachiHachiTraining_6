import { Component, OnInit } from '@angular/core';
import { DecentralizationService } from '../../services/decentralization.service';
import { SysStructurePermissionTreeDTO } from '../DTO/DTOsys-structure-permission-tree.dto';

@Component({
  selector: 'app-treelist-wrapper',
  templateUrl: './treelist-wrapper.component.html',
  styleUrls: ['./treelist-wrapper.component.scss']
})
export class TreeListWrapperComponent implements OnInit {
  public rootData: SysStructurePermissionTreeDTO[] = [];

  constructor(private decentralizationService: DecentralizationService) {}

  ngOnInit(): void {
    const req = { Company: 1 };
    this.decentralizationService.getSysStructurePermissionTree(req).subscribe(res => {
      if (res.StatusCode === 0 && res.ObjectReturn) {
        this.rootData = res.ObjectReturn;
      } else {
        this.rootData = [];
      }
    });
  }

  public hasChildren = (node: SysStructurePermissionTreeDTO): boolean =>
    Boolean((node.ListGroup && node.ListGroup.length > 0) || 
            (node.ListFunctions && node.ListFunctions.length > 0) || 
            (node.ListAction && node.ListAction.length > 0));

  public fetchChildren = (node: SysStructurePermissionTreeDTO): SysStructurePermissionTreeDTO[] =>
    [...(node.ListGroup || []), ...(node.ListFunctions || []), ...(node.ListAction || [])];

  public isExpanded = (_node: SysStructurePermissionTreeDTO): boolean => true;
}
