import { Component } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';
import { BlogService } from '../../_services/blog.service';

@Component({ templateUrl: 'blogs.component.html' })
export class BlogsComponent { 
    listBlogs?: any[];
    imgUrl: string = `${environment.apiUrl}`;

    constructor(private blogService: BlogService) { }

    ngOnInit() {
        this.getAllBlogs();
    }

    getAllBlogs() {
        this.blogService.getAllBlogs(1,25,"","","DESC").subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.listBlogs = response.data;
            }
        });
    }
}
