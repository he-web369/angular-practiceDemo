import {Injectable} from '@angular/core'
import {CanActivate,Router} from '@angular/router'

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private router : Router) {}
    canActivate(){
        const token=localStorage.getItem('auth_token')
        if(!token){
            this.router.navigate(['/signup'])
            return false
        }
        return true
    }
}