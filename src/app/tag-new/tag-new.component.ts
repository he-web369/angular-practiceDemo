import { Component, OnInit } from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'

@Component({
  selector: 'app-tag-new',
  templateUrl: './tag-new.component.html',
  styleUrls: ['./tag-new.component.css']
})
export class TagNewComponent implements OnInit {
  public tag={
    title:''
  }
  constructor(private http:HttpClient,private router : Router) { }

  ngOnInit() {
  }
  public addTag(){
    this.http.post('http://localhost:3000/tags',this.tag)
      .toPromise().then(res=>{
        this.router.navigate(['/tags'])
      }).catch(err=>{
        console.log(err)
      })
  }
}
