import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AuthorComponent } from './author/author.component';
import { AdminComponent } from './admin/admin.component';

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const PublicModule = () => import('./public/public.module').then(x => x.PublicModule);
const UsersModule = () => import('./admin/users/users.module').then(x => x.UsersModule);
const BlogsModule = () => import('./author/blogs/blogs.module').then(x => x.BlogsModule);

const routes: Routes = [
    {
        path: '',
        loadChildren: PublicModule
    },
    {
        path: 'admin',
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
        loadChildren: BlogsModule,
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