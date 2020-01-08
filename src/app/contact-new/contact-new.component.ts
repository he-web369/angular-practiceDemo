import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Component({
  selector: 'app-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.css']
})
export class ContactNewComponent implements OnInit {
  public formData={
    email:'',
    phone:'',
    name:'',
    value:'朋友'
  }
  public tags=[]
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/tags').toPromise().then((res:any)=>{
      this.tags=res
    })
  }
  public addContact(){
    this.http.post('http://localhost:3000/contacts',this.formData).toPromise()
      .then(res=>{
        this.router.navigate(['/contacts'])
      })
  }
}
