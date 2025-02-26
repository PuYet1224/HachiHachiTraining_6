// import { Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpErrorResponse,
//   HttpClient
// } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { switchMap, catchError } from 'rxjs/operators';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private refreshing = false;

//   constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         // handle error
//         return throwError(() => error);
//       })
//     );
//   }

//   private refreshToken(): Observable<any> {
//     const body = {
//       refresh_token: 'e938771e9a6925ec943e72d27abfa61633003095ae610b66f0edaa08f2e6375a',
//       grant_type: 'refresh_token',
//       scope: 'adminapi offline_access',
//       client_id: 'admin',
//       client_secret: 'adminsecret'
//     };
//     return this.http.post('http://172.16.10.86:5001/connect/token', body);  }
// }
