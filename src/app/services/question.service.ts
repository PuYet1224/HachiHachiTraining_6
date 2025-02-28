import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toDataSourceRequest } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDA3NDgyNjgsImV4cCI6MTc0MDc1MTg2OCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQwNzQ4MjY4LCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.ha8446ppjqWZ0Tv6eZymOtm1H7_0HvIBRkuNZzsojOPy1LcXR1OavDS9th95XLX468rGIE7x_vgxnCVNrtU6oIZTbg0xDHnO8wHgVT34AwSIOE56b8GSwK8luT9P8tiLrP9bcWFMKjKLVbX5aRw77hsAOqQpWZdcD0ztiLp_MR1rcF5qvi_0TK_m9oYfYUvtgcMg-TtBfAIvsCRLhw6omAiw0hVymNE472AH4_yM5mx0IdDY2DYP4LTLjUWJNu7r2xVfCo--rarxQV7ZyqLKHHqptgojUfWmIXO9qO8lRB9NS10pdiYhYygRj3eaOsT1hcYFPvIELjfoB3KHACzC3A';
  private baseUrl = 'http://10.10.30.121:75/qc/api/question';
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
    const query = toDataSourceRequest(req);
    return this.http.post<any>(`${this.listUrl}`, query, { headers: this.getHeaders() });
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
