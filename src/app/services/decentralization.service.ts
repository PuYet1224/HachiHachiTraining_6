// decentralization.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../PhanQuyen/DTO/DTOresponse.dto';
import { toDataSourceRequest } from '@progress/kendo-data-query';
import { RoleByDepartmentRequest } from '../PhanQuyen/DTO/DTOrole-by-department.dto';

@Injectable({
  providedIn: 'root'
})
export class DecentralizationService {
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDE4Njc3MTgsImV4cCI6MTc0MTg3MTMxOCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQxODY3NzE4LCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.KiBx-cm0KuSyymfmPrU1jmnN4BFq6Kr2PtLS4mPQcXJoeIgGoEuQrwC5kEzCzHyGOt9FkJBzsSQ5UKdInFEtSnl4VKk4uGdaWR3kDw1Uy7JbJGnMK1AwLoWeKaHQAPpWV2opkuFbTXSeQT7UtrImqkPlzDwFpdslMMlTjTQWHNyRK9qu2ZGGPz-sanHzJN8m1JaFvfbuIyYtYr8fbI5o4g0uZBAHEfNeaOvgC-t9DrwRYK8_jGOO5Qh7lhlivQDYPTidgeJ1QzlovA2VeosTymrh7FyxdcrP6twr-4lFQDieQ1oJYkSJiuWSqovjfMhJ1yxMRE7Z6QHf5HTdyCZTrw'; 
  private listUrl = 'http://10.10.30.121:75/qc/api/company/GetListCompany';
  private moduleTreeUrl = 'http://10.10.30.121:75/qc/api/sys/GetListModuleTree';
  private departmentUrl = 'http://10.10.30.121:75/qc/api/hr/GetListDepartment';
  private rolesUrl = 'http://10.10.30.121:75/qc/api/roles/GetListRoles';
  private sysStructureTreeUrl = 'http://10.10.30.121:75/qc/api/permission/GetListSysStructurePermissionTree';
  private getListRoleByDepartmentUrl = 'http://10.10.30.121:75/qc/api/permission/GetListRoleByDepartment';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      Company: '4', 
      'Content-Type': 'application/json'
    });
  }

  public getListCompany(req: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.listUrl, req, { headers: this.getHeaders() });
  }

  public getModuleTree(req: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.moduleTreeUrl, req, { headers: this.getHeaders() });
  }

  public getDepartmentList(req: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.departmentUrl, req, { headers: this.getHeaders() });
  }

  public getRolesList(state: any): Observable<ResponseDTO> {
    const req = { Filter: toDataSourceRequest(state), Keyword: "" };
    return this.http.post<ResponseDTO>(this.rolesUrl, req, { headers: this.getHeaders() });
  }

  public getSysStructurePermissionTree(req: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.sysStructureTreeUrl, req, { headers: this.getHeaders() });
  }

  public getListRoleByDepartment(req: RoleByDepartmentRequest[]): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.getListRoleByDepartmentUrl, req, { headers: this.getHeaders() });
  }
}
