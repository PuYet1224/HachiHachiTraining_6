import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { toDataSourceRequestString } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjZCN0FDQzUyMDMwNUJGREI0RjcyNTJEQUVCMjE3N0NDMDkxRkFBRTEiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJhM3JNVWdNRnY5dFBjbExhNnlGM3pBa2ZxdUUifQ.eyJuYmYiOjE3NDA1NjgyNDAsImV4cCI6MTc0MDU3MTg0MCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0L3Jlc291cmNlcyIsImFkbWluYXBpIl0sImNsaWVudF9pZCI6ImFkbWluIiwic3ViIjoiMTc1ZWFhZDAtMjBhZC00ZDNlLWEyNzgtYTY1OGQwNWQ1NWJjIiwiYXV0aF90aW1lIjoxNzQwNTY4MjQwLCJpZHAiOiJsb2NhbCIsInByb2ZpbGUiOiIxIiwibmFtZSI6Ik5ndXnhu4VuIFbEg24gSGFjaGkiLCJzY29wZSI6WyJhZG1pbmFwaSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.pItMvM_EICZCJTcSDV_CTGZQdVhKAa4r8b3Xf83zvzjew41Flk368hCv8-vF8UYeh2-or4MTHTyGDqOHpbZqsxndrK0iF34fNoVU6GKh9BAOgwwnipBiHeNBE3wFWwy__Z7yR95xc9ArXVj_Be_m05QUgYr9eSZ8GNmAQVtwXET5ZTlUTktoeR_gshu8JVwWJkfWM9hFWe-2QXJ5UWhNBvvzKVYABL8pQLSuvqju2RkTAOKblnJSeC7yoT0IXtVY7-06qZQiUXPJqLz1xwnj37fxpvpO5YhJVfa66bFCfo-J4DRDIxA9RpSho-8ogyt5ghfyYn2YvpDTgJLpCE3Fsw';
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
      'Gửi duyệt': 1,
      'Duyệt áp dụng': 2,
      'Trả về': 3,
      'Ngừng áp dụng': 4
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
    // Sử dụng property "Code" thay vì "QuestionID"
    const validItems = items.filter(item => item.Code);
    if (!validItems.length) {
      return new Observable(observer => observer.complete());
    }

    // Nếu API delete yêu cầu 1 mảng các object với key "Code"
    const payload = validItems.map(item => ({ Code: item.Code }));
    return this.http.post<any>(this.deleteUrl, payload, { headers: this.getHeaders() });
  }
}
