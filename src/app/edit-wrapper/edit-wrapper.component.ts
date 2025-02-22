import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDto, EMPLOYEES_DATA } from '../data/employee.dto';

@Component({
  selector: 'app-edit-wrapper',
  templateUrl: './edit-wrapper.component.html',
  styleUrls: ['./edit-wrapper.component.scss']
})
export class EditWrapperComponent implements OnInit {
  gridData: EmployeeDto[] = [];

  genderOptions = [
    { text: 'Nam', value: 'Male' },
    { text: 'Nữ', value: 'Female' },
    { text: 'Khác', value: 'Other' }
  ];
  maritalStatusOptions = [
    { text: 'Độc thân', value: 'Single' },
    { text: 'Đã kết hôn', value: 'Married' },
    { text: 'Ly hôn', value: 'Divorced' }
  ];
  nationalityOptions = [
    { text: 'Việt Nam', value: 'Vietnamese' },
    { text: 'Mỹ', value: 'American' },
    { text: 'Nhật Bản', value: 'Japanese' }
  ];
  ethnicityOptions = [
    { text: 'Kinh', value: 'Kinh' },
    { text: 'Tày', value: 'Tay' },
    { text: 'Thái', value: 'Thai' }
  ];
  religionOptions = [
    { text: 'Không', value: 'None' },
    { text: 'Phật giáo', value: 'Buddhism' },
    { text: 'Công giáo', value: 'Catholic' }
  ];
  yearOptions = Array.from({ length: 70 }, (_, i) => {
    const year = 1950 + i;
    return { text: year.toString(), value: year };
  });
  monthOptions = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { text: month.toString(), value: month };
  });
  dayOptions = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return { text: day.toString(), value: day };
  });

  academicLevelOptions = [
    { text: 'Trung học', value: 'High School' },
    { text: 'Cao đẳng', value: 'College' },
    { text: 'Đại học', value: 'Bachelor' },
    { text: 'Thạc sĩ', value: 'Master' },
    { text: 'Tiến sĩ', value: 'PhD' }
  ];
  academicTitleOptions = [
    { text: 'Kỹ sư', value: 'Engineer' },
    { text: 'MBA', value: 'MBA' },
    { text: 'Cử nhân', value: 'Bachelor' }
  ];
  academicDegreeOptions = [
    { text: 'BSc', value: 'BSc' },
    { text: 'BA', value: 'BA' },
    { text: 'MSc', value: 'MSc' },
    { text: 'PhD', value: 'PhD' }
  ];
  specializedFieldOptions = [
    { text: 'CNTT', value: 'IT' },
    { text: 'Kinh doanh', value: 'Business' },
    { text: 'Giáo dục', value: 'Education' }
  ];
  professionOptions = [
    { text: 'Lập trình viên', value: 'Software Developer' },
    { text: 'Quản lý dự án', value: 'Project Manager' },
    { text: 'Giáo viên', value: 'Teacher' },
    { text: 'Thực tập sinh', value: 'Intern' }
  ];
  countryOptions = [
    { text: 'Việt Nam', value: 'Vietnam' },
    { text: 'Mỹ', value: 'USA' },
    { text: 'Canada', value: 'Canada' }
  ];
  provinceOptions = [
    { text: 'Hà Nội', value: 'Ha Noi' },
    { text: 'Hồ Chí Minh', value: 'Ho Chi Minh' },
    { text: 'Đà Nẵng', value: 'Da Nang' }
  ];

  districtOptionsPermanent = [
    { text: 'Cầu Giấy', value: 'Cau Giay' },
    { text: 'Ba Đình', value: 'Ba Dinh' },
    { text: 'Thanh Xuân', value: 'Thanh Xuan' }
  ];
  wardOptionsPermanent = [
    { text: 'Dịch Vọng Hậu', value: 'Dich Vong Hau' },
    { text: 'Kim Mã', value: 'Kim Ma' },
    { text: 'Phương Liệt', value: 'Phuong Liet' }
  ];

  districtOptionsTemporary = [
    { text: 'Quận 1', value: 'District 1' },
    { text: 'Hải Châu', value: 'Hai Chau' },
    { text: 'Bến Thành', value: 'Ben Thanh' }
  ];
  wardOptionsTemporary = [
    { text: 'Bến Nghé', value: 'Ben Nghe' },
    { text: 'Hải Châu I', value: 'Hai Chau I' },
    { text: 'Tân Định', value: 'Tan Dinh' }
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const empId = params['id'];
      if (empId) {
        const foundEmp = EMPLOYEES_DATA.find(emp => emp.nationalId === empId);
        if (foundEmp) {
          this.gridData = [foundEmp];
        }
      }
      if (!this.gridData.length) {
        const state = this.router.getCurrentNavigation()?.extras.state;
        if (state && state['data']) {
          this.gridData = [state['data']];
        }
      }
      if (!this.gridData.length) {
        this.gridData = [EMPLOYEES_DATA[0]];
      }
      const emp = this.gridData[0];
      if (emp && emp.dateOfBirth && typeof emp.dateOfBirth === 'string') {
        const [yyyy, mm, dd] = emp.dateOfBirth.split('-');
        emp.birthYear = yyyy ? Number(yyyy) : undefined;
        emp.birthMonth = mm ? Number(mm) : undefined;
        emp.birthDay = dd ? Number(dd) : undefined;
      }
      if (emp.nationalIdIssueDate && typeof emp.nationalIdIssueDate === 'string') {
        emp.nationalIdIssueDate = this.parseDate(emp.nationalIdIssueDate);
      }
      if (emp.nationalIdExpiryDate && typeof emp.nationalIdExpiryDate === 'string') {
        emp.nationalIdExpiryDate = this.parseDate(emp.nationalIdExpiryDate);
      }
      if (emp.passportIssueDate && typeof emp.passportIssueDate === 'string') {
        emp.passportIssueDate = this.parseDate(emp.passportIssueDate);
      }
      if (emp.passportExpiryDate && typeof emp.passportExpiryDate === 'string') {
        emp.passportExpiryDate = this.parseDate(emp.passportExpiryDate);
      }
      if (emp.taxRegistrationDate && typeof emp.taxRegistrationDate === 'string') {
        emp.taxRegistrationDate = this.parseDate(emp.taxRegistrationDate);
      }
    });
  }

  private parseDate(dateStr: string): Date {
    const [yyyy, mm, dd] = dateStr.split('-');
    return new Date(+yyyy, +mm - 1, +dd);
  }

  onDayChange(emp: EmployeeDto) {
    if (!emp.birthDay) {
      emp.birthMonth = undefined;
      emp.birthYear = undefined;
    }
  }

  onMonthChange(emp: EmployeeDto) {}
  onSave() {
    const emp = this.gridData[0];
    if (emp.birthYear && emp.birthMonth && emp.birthDay) {
      const y = emp.birthYear.toString().padStart(4, '0');
      const m = emp.birthMonth.toString().padStart(2, '0');
      const d = emp.birthDay.toString().padStart(2, '0');
      emp.dateOfBirth = `${y}-${m}-${d}`;
    }
    alert('Lưu thành công!');
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
