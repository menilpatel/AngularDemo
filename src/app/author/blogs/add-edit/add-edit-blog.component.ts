
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../../_services/blog.service';

@Component({ templateUrl: 'add-edit-blog.component.html' })
export class AddEditBlogsComponent {
    blogForm!: FormGroup;
    title: string = "Add Blog";
    id?: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private blogService:BlogService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        // form with validation rules
        this.blogForm = this.formBuilder.group({
            id: [this.id],
            title: ['', Validators.required],
            description: ['', Validators.required],
            isPublished: ['']
        });

        
        this.title = 'Add Blog';
        if (this.id) {
            // edit mode
            this.title = 'Edit Blog';
            this.loading = true;

            this.blogService.getBlogById(this.id).subscribe((response: any) => {
                if (response.statuscode == 200) {
                    this.blogForm.patchValue(response.data);
                    this.loading = false;
                }
            });
        }
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