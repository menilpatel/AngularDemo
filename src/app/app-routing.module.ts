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
        path: '',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: { roles: 'admin' }
    },
    {
        path: 'admin/users',
        loadChildren: UsersModule,
        canActivate: [AuthGuard],
        data: { roles: 'admin' }
    },
    {
        path: 'author',
        component: AuthorComponent,
        canActivate: [AuthGuard],
        data: { roles: 'author' }

    },
    {
        path: 'author/blogs',
        component: BlogsComponent,
        canActivate: [AuthGuard],
        data: { roles: 'author' }
    },
    {
        path: 'account',
        loadChildren: accountModule
    },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }