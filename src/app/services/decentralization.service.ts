import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../PhanQuyen/DTO/DTOresponse.dto';
import { toDataSourceRequest } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class DecentralizationService {
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDE0MTAxNzAsImV4cCI6MTc0MTQxMzc3MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQxNDEwMTcwLCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.ftxqeiYzFqXYVVnHRi-o61eyS2ySbMQgqlyjUrsIK0_4N4J1R6chhkNUpp5gXhsj4eVf4O24Qn3hTb-8QRa2dbEp7AiaWGh16oCym-ecNLcFOgpcJYX8sEUoWzC3Q1dwjAma_sIiHIVtEQI2fECYAFi5YADKo1QfVgUyxL6BFsIOZSY05y4Vrj4Tsq8z1dNyDt9VU9YuoiPIe2P7AHQwxvIy8B6FU7FrB-DG7SvLCxkqd1I5V44OnyyNAcpPc9x9-_9WqT_NgPRNyI1WX_MGlJtCMGacHjX_pVFDZp9jlUDBowMzsAybSQ5WGBxKVtzNFgOWp6mwMD7GWvAwYfnbUw';
  private listUrl = 'http://10.10.30.121:75/qc/api/company/GetListCompany';
  private moduleTreeUrl = 'http://10.10.30.121:75/qc/api/sys/GetListModuleTree';
  private departmentUrl = 'http://10.10.30.121:75/qc/api/hr/GetListDepartment';
  private rolesUrl = 'http://10.10.30.121:75/qc/api/roles/GetListRoles';
  private sysStructureTreeUrl = 'http://10.10.30.121:75/qc/api/permission/GetListSysStructurePermissionTree';
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
}
