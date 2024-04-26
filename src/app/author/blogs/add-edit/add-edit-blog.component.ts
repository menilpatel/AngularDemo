
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../../_services/blog.service';
import { Blog } from '../../../_models/blog';
import { environment } from '../../../../enviroments/enviroment';

@Component({ templateUrl: 'add-edit-blog.component.html' })
export class AddEditBlogsComponent {
    blogForm!: FormGroup;
    blogImage?: FileList;
    blogDetails: any;
    title: string = "Add Blog";
    id?: string;
    loading = false;
    submitting = false;
    submitted = false;
    imgUrl: string = `${environment.apiUrl}`;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private blogService: BlogService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        // form with validation rules
        this.blogForm = this.formBuilder.group({
            id: [this.id],
            title: ['', Validators.required],
            description: ['', Validators.required],
            image: [null, Validators.required],
            isPublished: [true]
        });


        this.title = 'Add Blog';
        if (this.id) {
            // edit mode
            this.title = 'Edit Blog';
            this.loading = true;

            this.blogService.getBlogById(this.id).subscribe((response: any) => {
                if (response.statuscode == 200) {
                    this.blogDetails = response.data;
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

        const formData: FormData = new FormData();
        formData.append('title', this.blogForm.controls['title'].value);
        formData.append('description', this.blogForm.controls['description'].value);
        formData.append('isPublished', this.blogForm.controls['isPublished'].value);

        if (this.blogImage != undefined) {
            formData.append('image', this.blogImage[0]);
        }

        this.submitting = true;
        if (this.id) {
            formData.append('id', this.id);
            this.blogService.updateBlogDetails(formData).subscribe((response: any) => {
                if (response.statuscode == 200) {
                    this.router.navigateByUrl('author/blogs');
                }
                this.submitting = false;
            });
        }
        else{
            this.blogService.addBlogDetails(formData).subscribe((response: any) => {
                if (response.statuscode == 200) {
                    this.router.navigateByUrl('author/blogs');
                }
                this.submitting = false;
            });
        }
       
    }


    selectBlogImage(event: any): void {
        this.blogImage = event.target.files;
    }
}