import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    count = 0;

    constructor() { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        const token = localStorage['token'];

        if (req.url == 'http://localhost:3000/api/') {
            return next.handle(req).pipe(
                tap(
                    event => event,
                    error => console.log(error),
                ),
                finalize(() => {
                    // this.spinner.hide();
                }),
            );
        } else {
            // this.spinner.show();
            this.count++;

            const req1 = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
                // url: apiUrl(req.url),
                url: req.url,
            });

            return next.handle(req1).pipe(
                tap(
                    event => event,
                    error => console.log(error),
                ),
                finalize(() => {
                    this.count--;
                    // if (this.count == 0) this.spinner.hide();
                }),
            );
        }
    }
}
