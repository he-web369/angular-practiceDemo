import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signInForm:{
    email:string,
    password:string
  }={email:'',password:''}
  public err_msg=''
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }
  public signIn(){
    this.http.post('http://localhost:3000/session',this.signInForm).toPromise().then((res:any)=>{
      localStorage.setItem('auth_token',res.token)
      localStorage.setItem('user_info',JSON.stringify(res.user))
      this.router.navigate(['/contacts'])
    }).catch(err=>{
      if(err.status===401){
        this.err_msg='登录失败，邮箱或密码错误'
      }
    })
  }
}
