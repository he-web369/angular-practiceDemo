import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SigninComponent} from './signin/signin.component'
import {SignupComponent} from './signup/signup.component'
import {LayoutComponent} from './layout/layout.component'
import {ContactListComponent} from './contact-list/contact-list.component'
import {ContactEditComponent} from './contact-edit/contact-edit.component'
import {ContactNewComponent} from './contact-new/contact-new.component'
import {TagEditComponent} from './tag-edit/tag-edit.component'
import {TagListComponent} from './tag-list/tag-list.component'
import {TagNewComponent} from './tag-new/tag-new.component'
import {AuthGuard} from './auth_guard'

const routes: Routes = [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'contacts', 
      component: LayoutComponent,
      canActivate:[AuthGuard],
      children:[
        { path: 'list', component: ContactListComponent},
        { path: 'edit/:id', component: ContactEditComponent },
        { path: 'new', component: ContactNewComponent },
        { path: '', redirectTo: 'list' ,pathMatch:'full'}
      ] ,
    },
    { path: '', redirectTo: 'contacts' ,pathMatch:'full'},
    { path: 'tags', 
      component: LayoutComponent,
      canActivate:[AuthGuard],
      children:[
        { path: 'edit/:id', component: TagEditComponent },
        { path: 'list', component: TagListComponent },
        { path: 'new', component: TagNewComponent },
        { path: '', redirectTo: 'list' ,pathMatch:'full'}
      ]
    }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
