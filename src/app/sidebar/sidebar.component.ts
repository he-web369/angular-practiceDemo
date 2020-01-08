import { Component, OnInit } from '@angular/core'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public classState=''
  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.classState=this.route.routeConfig.path
  }
  public changeClass(str:string){
      this.classState=str
  }
}
