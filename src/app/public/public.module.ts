import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicRoutingModule
    ],
    declarations: [
        PublicComponent,
        HomeComponent,
        BlogsComponent
    ]
})
export class PublicModule { }
