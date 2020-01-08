import { Component, ElementRef } from '@angular/core';
import {format} from 'date-fns'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public todoList:{
      id:string,
      taskName:string,
      isDone:boolean
    }[]=JSON.parse(window.localStorage.getItem('_todos'))||[]
    public currentEditing:{
      id:number,
      taskName:string,
      isDone:boolean
    }=null
    public  selecteState:string='all'
    get filterTodos(){
      if(this.selecteState==='all'){
        return this.todoList
      }else if(this.selecteState==='active'){
        return this.todoList.filter(item=>!item.isDone)
      }else if(this.selecteState==='completed'){
        return this.todoList.filter(item=>item.isDone) 
      }
    }
    constructor(private el:ElementRef){}
    //生命周期函数
    ngOnInit(){
      this.hashChangeHandler()
      window.onhashchange=()=>this.hashChangeHandler()
    }
    //生命周期函数
    ngDoCheck(){
      if(this.todoList.length===0){
        window.localStorage.removeItem('_todos')
      }else{
        window.localStorage.setItem('_todos',JSON.stringify(this.todoList))
      }
    }
    set stateString(val:string){
      this.selecteState=val
    }
    public addTodo($event):void{
      const taskName=$event.target.value
      if(taskName)this.todoList.unshift({id:this.formatDate(Date.now()),taskName,isDone:false})
      $event.target.value=''
    }
    public formatDate(date:number|Date):string{
      return format(date,'HH:mm:ss')
    }
    get toggleAll(){
      return this.todoList.every(t=>t.isDone)
    }
    set toggleAll(val){
      this.todoList.forEach(item=>item.isDone=val)
    }
    public destroyTodo(index:number):void{
      this.todoList.splice(index,1)
    }
    public saveEditing(e:any,todo:any){
      this.currentEditing=null
      todo.taskName=e.target.value
    }
    public handleBlur(e,todo):void{
      e.target.value=todo.taskName
      this.currentEditing=null
    }
    public handleKeyEsc(e){
      if(e.keyCode===27){
        this.currentEditing=null
      }
    }
    public showEdit(todo){
      this.currentEditing=todo
      setTimeout(() => {
        const edits=this.el.nativeElement.querySelectorAll('.edit')
        for (let index = 0; index < edits.length; index++) {
          if(edits[index].value===todo.taskName){
            edits[index].focus()
          }          
        }
      }, 0)
    }
    get remaningCount(){
      return this.todoList.filter(item=>!item.isDone).length
    }
    public hashChangeHandler(){
        const hash=window.location.hash.substr(1)
        switch(hash){
          case '/':
            this.selecteState='all'
            break
          case '/active':
            this.selecteState='active'
            break
          case '/completed':
            this.selecteState='completed'
            break
          default :
            break
        }
    }
    public clearCompleted(){
      this.todoList=this.todoList.filter(item=>!item.isDone)
    }
}
