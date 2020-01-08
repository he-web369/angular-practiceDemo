import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm:{
    email:string,
    password:string
  }={email:'',password:''}
  public email_err_msg:string=''
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  }
  public signUp(){
    const formData=this.signUpForm
    this.http.post('http://localhost:3000/users',formData).toPromise().then((res:any)=>{
      this.email_err_msg=''
      window.localStorage.setItem('auth_token',res.token)
      localStorage.setItem('user_info',JSON.stringify(res.user))
      this.router.navigate(['/contacts'])
    }).catch(err=>{
      if(err.status===409){
        this.email_err_msg='邮箱已被占用'
      }
    })
  }
}
