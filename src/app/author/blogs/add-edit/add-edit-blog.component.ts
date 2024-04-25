
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../../_services/blog.service';

@Component({ templateUrl: 'add-edit-blog.component.html' })
export class AddEditBlogsComponent {
    blogForm!: FormGroup;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private blogService:BlogService) {
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
        this.blogService.addBlogDetails(this.blogForm.value).subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.router.navigateByUrl('author/blogs');
            }
            this.submitting = false;
        });
    }
}