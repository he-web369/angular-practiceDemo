import { Component, OnInit } from '@angular/core'
import {Router ,ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {

  public formData={
    name:'',
    email:'',
    phone:'',
    value:'',
    id:0
  }
  public tags=[]
  constructor(private router:Router,private route:ActivatedRoute,private http:HttpClient) { }

  ngOnInit() {
    //获取动态路由路径参数
   const {id}= this.route.snapshot.params
    this.getContactById(id)
    this.http.get('http://localhost:3000/tags').toPromise().then((res:any)=>{
      this.tags=res
    })
  }
  public getContactById(id){
    this.http.get('http://localhost:3000/contacts/'+id).toPromise()
      .then((res:any)=>{
        this.formData=res
      })
  }
  public editingContact(){
    const {id}=this.formData
    this.http.patch('http://localhost:3000/contacts/'+id,this.formData)
      .toPromise().then(res=>{
        this.router.navigate(['/contacts'])
      }).catch(err=>{
        alert(err)
      })
    
  }
}
