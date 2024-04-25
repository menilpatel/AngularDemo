import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListBlogsComponent } from './list/list-blogs.component';
import { AddEditBlogsComponent } from './add-edit/add-edit-blog.component';
import { BlogsComponent } from './blogs.component';

const routes: Routes = [
    {
        path: '', component: BlogsComponent,
        children: [
            { path: '', component: ListBlogsComponent },
            { path: 'addblog', component: AddEditBlogsComponent },
            { path: 'editblog/:id', component: AddEditBlogsComponent }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlogsRoutingModule { }