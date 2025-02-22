import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeDto, EMPLOYEES_DATA } from '../data/employee.dto';
import { iconList } from '../../assets/icons/icon-lists';

@Component({
  selector: 'app-grid-wrapper',
  templateUrl: './grid-wrapper.component.html',
  styleUrls: ['./grid-wrapper.component.scss']
})
export class GridWrapperComponent implements OnInit {
  public icons = iconList;
  data: Array<{ fullName: string; gender?: string; birthYear?: string; email?: string; phone?: string; account?: string; company?: string; cccd?: string; }> = [];
  openedRowIndex: number | null = null;
  popupAnchor: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.data = EMPLOYEES_DATA.map((emp: EmployeeDto) => ({
      fullName: [emp.lastName, emp.middleName, emp.firstName].filter(Boolean).join(' '),
      birthYear: emp.dateOfBirth ? emp.dateOfBirth.slice(0, 4) : '',
      gender: emp.gender,
      phone: emp.phoneMobile1,
      email: emp.personalEmail,
      account: emp.userName,
      company: emp.belongsToCompanies?.join(', '),
      cccd: emp.nationalId
    }));
  }
  toggleMenu(rowIndex: number, button: HTMLElement): void {
    this.openedRowIndex = this.openedRowIndex === rowIndex ? null : rowIndex;
    this.popupAnchor = button;
    this.cdr.detectChanges();
  }
  openEditPage(dataItem: any) {
    this.router.navigate(['/edit-page'], { queryParams: { id: dataItem.cccd } });
  }
}
