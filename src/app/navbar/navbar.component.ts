import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user = JSON.parse(localStorage.getItem('user_info')||"{}")
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  }
  public logout(e){
    e.preventDefault()
    if(confirm('确认退出吗？')){  
      this.http.delete('http://localhost:3000/session').toPromise().then((res:any)=>{
        this.router.navigate(['/signin'])
        localStorage.removeItem("auth_token")
        localStorage.removeItem('user_info')
      }).catch(err=>{
        alert('退出失败，请稍后重试')
      })
    }
  }
}
