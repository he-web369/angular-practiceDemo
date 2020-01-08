import { Component, OnInit } from '@angular/core'
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  public tags=[]
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
    this.getTags()
  }
  public getTags(){
    this.http.get('http://localhost:3000/tags').toPromise()
      .then((res:any)=>{
        this.tags=res
      }).catch(err=>{
        console.log(err)
      })
  }
  public deleteTag(e,tag){
    e.preventDefault()
    if(confirm('确认删除此标签吗？')){
      this.http.delete('http://localhost:3000/tags/'+tag.id).toPromise()
        .then(res=>{
          this.getTags()
        }).catch(err=>{
          console.log(err)
        })
    }
  }
}
