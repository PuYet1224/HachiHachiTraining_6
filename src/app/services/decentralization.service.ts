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
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDE5NjI2NzUsImV4cCI6MTc0MTk2NjI3NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQxOTYyNjc1LCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.YYKFwZIwTVy8SF4PoliMjyj9dTMxUtvZioG-WnQ1E6spKra-JTxAdQklLfKgpP4Nug1OuiWC5rJVi2LNVmq116N_kzaa3YobTnPICyLxxJ37k3u0b6yGh9Z3XuVRVnK-JQuycXvj5HlsVo-xmxFFDOpZqPjCAqrDnszbevJhjto0sTzoG4UIPTHgZy5W2e7mqnVCiAqqBGbICFuH_Y_W86t_8DVB7JaeyHZ3gVtDN-axeY5oRv1GnCSlO9FDfK1pWYZBQXMOfghp-wFygqE5eFF2BzR6htPyiW5_fvkQK5dOs1j0_E4hPtItu7IYkdcWaGqze9HgTN9ZIu4WDmeDmA';
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
