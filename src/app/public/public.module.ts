import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PublicRoutingModule
    ],
    declarations: [
        PublicComponent
    ]
})
export class PublicModule { }
