import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toDataSourceRequestString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDA2MzI1MjksImV4cCI6MTc0MDYzNjEyOSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQwNjMyNTI5LCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.l6h8wuA0KcQmKecvWQCLgnRtWpEuktdEe_OY7lXsvIWHkP07i9AoQzgA8lrdNULVkVC9H7nW1xQNC1Tos_Mx6M3WPU2ApZVmAeFPsAbti8xKDm6mjXIi7hH_F-0PEMTgqBpPsZ9X9VVdYTG0JzfzwfvQiXs5MOcLEoiZRIJpZYt0XoAkEt28sYKIhL7tTpe2o3jRw96QKPTdFywVHdgFHWDyZeqzNrYCPOrAE_4QQPDlz4fctIt2nvh6bzkIGafyhUkE8yjH4xrh8yRbV_E9VPS8d7HLZcRIMgn-gf_veEFGpMmgxiNBcT_qJJBwkP722t41rtEA4zFCOqFfNrtwMQ';
  private baseUrl = 'http://172.16.10.86:75/qc/api/question';
  private listUrl = `${this.baseUrl}/GetListQuestion`;
  private updateStatusUrl = `${this.baseUrl}/UpdateQuestionStatus`;
  private deleteUrl = `${this.baseUrl}/DeleteQuestion`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      Company: '1',
      'Content-Type': 'application/json'
    });
  }

  public getAllQuestions(req: any): Observable<any> {
    const query = toDataSourceRequestString(req);
    return this.http.post<any>(`${this.listUrl}?${query}`, req, { headers: this.getHeaders() });
  }

  public updateStatus(items: any[], newStatus: string): Observable<any> {
    const statusMap: any = {
      'Đang soạn thảo': 0,
      'Gởi duyệt': 1,
      'Duyệt áp dụng': 2,
      'Ngưng áp dụng': 3,
      'Trả về': 4
    };

    const validItems = items.filter(item => item.Code);
    if (!validItems.length || !statusMap.hasOwnProperty(newStatus)) {
      return new Observable(observer => observer.complete());
    }

    const payload = {
      ListDTO: validItems,
      StatusID: statusMap[newStatus]
    };

    return this.http.post<any>(this.updateStatusUrl, payload, { headers: this.getHeaders() });
  }

  public deleteQuestions(items: any[]): Observable<any> {
    const validItems = items.filter(item => item.Code);
    if (!validItems.length) {
      return new Observable(observer => observer.complete());
    }

    const payload = validItems.map(item => ({ Code: item.Code }));
    return this.http.post<any>(this.deleteUrl, payload, { headers: this.getHeaders() });
  }
}
