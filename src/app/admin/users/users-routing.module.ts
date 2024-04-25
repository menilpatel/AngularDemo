import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';

const routes: Routes = [
    {
        path: 'account/users', component: UsersComponent,
        children: [
            { path: 'account/users', component: ListComponent },
            { path: 'account/users/add', component: AddEditComponent },
            { path: 'account/users/edit/:id', component: AddEditComponent }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }