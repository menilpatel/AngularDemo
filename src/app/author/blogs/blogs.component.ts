
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'blogs.component.html' })
export class BlogsComponent {
    blogForm!: FormGroup;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private toastr: ToastrService) {

    }

    ngOnInit() {
        // form with validation rules
        this.blogForm = this.formBuilder.group({
            id: [],
            title: ['', Validators.required],
            description: ['', Validators.required],
            isPublished: ['']
        });
    }

    get f() { return this.blogForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.blogForm.invalid) {
            return;
        }

        this.submitting = true;
    }
}