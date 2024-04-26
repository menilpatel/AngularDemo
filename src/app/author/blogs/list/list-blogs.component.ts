import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../_services/blog.service';
import { Blog } from '../../../_models/blog';

@Component({ templateUrl: 'list-blogs.component.html' })
export class ListBlogsComponent implements OnInit {
    listBlogs?: any[];
    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.getAllBlogs();
    }

    getAllBlogs() {
        this.blogService.getAllBlogs().subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.listBlogs = response.data;
            }
        });
    }

    deleteBlog(id: string) {
        const user = this.listBlogs!.find(x => x.id === id);
        user.isDeleting = true;
        this.blogService.deleteBlogId(id).subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.listBlogs = this.listBlogs!.filter(x => x.id !== id)
            }
        });
    }
}