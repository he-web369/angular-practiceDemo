import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts:any=[]
  public trueContacts:any=[]
  public tags=[]
  public value:string='all'
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getContacts()
    this.http.get('http://localhost:3000/tags').toPromise().then((res:any)=>{
      this.tags=res
    }).catch(err=>alert(err))
  }
  public getContacts(){
    this.http.get('http://localhost:3000/contacts').toPromise().then((res:any)=>{
      this.contacts=res
    }).catch(err=>{
      alert('请求联系人列表失败')
    })
  }
  ngDoCheck(){
    if(this.value==='all'){
      this.trueContacts=this.contacts 
    }else{
      this.trueContacts=this.contacts.filter(item=>item.value===this.value)
    }
  }
  public removeContact(e,id){
    e.preventDefault()
    if(confirm('确定删除吗？')){
      this.http.delete('http://localhost:3000/contacts/'+id)
      .toPromise().then((res)=>{
        this.getContacts()
      })
    }
  }
}
