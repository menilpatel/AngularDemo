import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListBlogsComponent } from './list/list-blogs.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { AddEditBlogsComponent } from './add-edit/add-edit-blog.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlogsRoutingModule
    ],
    declarations: [
        BlogsComponent,
        ListBlogsComponent,
        AddEditBlogsComponent
    ]
})
export class BlogsModule { }
