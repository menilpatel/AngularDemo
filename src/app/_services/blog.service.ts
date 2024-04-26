import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Blog } from '../_models/blog';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from './account.service';

@Injectable({ providedIn: 'root' })
export class BlogService {
    user: any;
    constructor(
        private http: HttpClient,
        private accountService:AccountService
    ) { }

    getAllBlogs() {
        return this.http.get<any>(`${environment.apiUrl}/auth/getallblogs`);
    }

    getBlogById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/getblogbyid?id=${id}`);
    }

    addBlogDetails(blog: Blog) {
        this.user = this.accountService.userValue;
        blog.publishedBy = this.user.id;
        return this.http.post(`${environment.apiUrl}/auth/addblog`, blog);
    }

    deleteBlogId(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/deleteblogbyid?id=${id}`);
    }
}