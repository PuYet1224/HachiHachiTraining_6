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
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDIwMTcwMDYsImV4cCI6MTc0MjAyMDYwNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQyMDE3MDA2LCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.iVuN5bjRuPLTq4mYPxzBWxc0oMJmjecPW4TIrrWfoJMb5HupTWVVZBsWeUB0uh5alL-T_jFqeT04t88eBe62Z0BF9uaI20XXWKzQostCicemJXF6-heau3LRd7Jvo0byZacNd1bDbHO-UZD5y1kfdfyfyWRWRy39dHPQXNdlDgv-MbqZI4c2CEeiI-noIx1Jn060ANOnAjgPpJzuufo4GJ47zrz-IrhMzy_AQAY-Hoy2n6SFKVTS2DJ4ShP5gt3zunabhcaoQuu_5i_is-O_2qa03QtqHPBTug26xsqlyMIi5IvtguhS_YmsFI4COTCxHCKjLacUbPmjRXTokThcJA';
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
    if (typeof state.filter === 'object') {
      const reqBody = { Filter: toDataSourceRequest(state), Keyword: '' };
      return this.http.post<ResponseDTO>(this.rolesUrl, reqBody, { headers: this.getHeaders() });
    } else {
      const reqBody = { Filter: state.filter, Keyword: '' };
      return this.http.post<ResponseDTO>(this.rolesUrl, reqBody, { headers: this.getHeaders() });
    }
  }

  public getSysStructurePermissionTree(req: any): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.sysStructureTreeUrl, req, { headers: this.getHeaders() });
  }

  public getListRoleByDepartment(req: RoleByDepartmentRequest[]): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.getListRoleByDepartmentUrl, req, { headers: this.getHeaders() });
  }
}
