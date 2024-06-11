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
        return this.http.get<any>(`${environment.apiUrl}/public/getallblogs`);
    }

    getBlogsByAuthor() {
        return this.http.get<any>(`${environment.apiUrl}/auth/getblogsbyauthor`);
    }

    getBlogById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/getblogbyid?id=${id}`);
    }

    addBlogDetails(form: FormData) {
        this.user = this.accountService.userValue;
        form.append("publishedBy",this.user.id);
        return this.http.post(`${environment.apiUrl}/auth/addblog`, form);
    }

    updateBlogDetails(form: FormData) {
        this.user = this.accountService.userValue;
        form.append("publishedBy",this.user.id);
        return this.http.post(`${environment.apiUrl}/auth/updateblog`, form);
    }

    deleteBlogId(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/deleteblogbyid?id=${id}`);
    }
}