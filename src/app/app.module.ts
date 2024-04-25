import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorComponent } from './author/author.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { AlertComponent } from './_components/alert.component';
import { UsersComponent } from './admin/users/users.component';
import { BlogsComponent } from './author/blogs/blogs.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ToastrModule.forRoot(), 
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        AuthorComponent,
        BlogsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
