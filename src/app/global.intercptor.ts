import {Injectable} from '@angular/core'
import {HttpInterceptor,HttpEvent,HttpRequest,HttpHandler} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable()
export class NoopInterceptor implements HttpInterceptor {

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        const token=window.localStorage.getItem('auth_token')
        const authReq=req.clone({headers:req.headers.set("X-Access-Token",token)})
        return next.handle(authReq)
    }
}