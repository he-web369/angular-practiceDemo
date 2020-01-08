import { Component, OnInit } from '@angular/core'
import {Router,ActivatedRoute} from '@angular/router'
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.css']
})
export class TagEditComponent implements OnInit {

  public tag={
    title:'',
    id:0
  }
  constructor(private http: HttpClient,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    const id=this.route.snapshot.params.id*1
    this.http.get('http://localhost:3000/tags').toPromise()
      .then((res:any)=>{
        this.tag=res.find(item=>item.id===id)
      }).catch(err=>{
        console.log(err)
      })
  }
  saveTag(){
    this.http.patch('http://localhost:3000/tags/'+this.tag.id,this.tag).toPromise()
      .then((res:any)=>{
        this.router.navigate(['/tags'])
      }).catch(err=>{
        console.log(err)
      })
  } 
}
