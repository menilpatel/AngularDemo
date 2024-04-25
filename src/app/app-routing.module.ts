import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';
import { BlogsComponent } from './author/blogs/blogs.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const UsersModule = () => import('./admin/users/users.module').then(x => x.UsersModule);

const routes: Routes = [
    {
        path: 'account/author',
        component: AuthorComponent,
        canActivate: [AuthGuard],
        data: { roles: 'author' }

    },
    {
        path: 'account/author/blogs',
        component: BlogsComponent,
        canActivate: [AuthGuard],
        data: { roles: 'author' }
    },
    {
        path: 'account/admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: 'admin' }
    },
    {
        path: 'account/admin/users',
        loadChildren: UsersModule,
        canActivate: [AuthGuard],
        data: { roles: 'admin' }
    },
    {
        path: 'account',
        loadChildren: accountModule
    },
    { path: '**', redirectTo: 'account' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }