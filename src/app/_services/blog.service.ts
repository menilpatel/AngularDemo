import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Blog } from '../_models/blog';

@Injectable({ providedIn: 'root' })
export class BlogService {
    constructor(private http: HttpClient) { }

    getAllBlogs() {
        return this.http.get<any>(`${environment.apiUrl}/auth/getallblogs`);
    }

    // getUserById(id: string) {
    //     return this.http.get<any>(`${environment.apiUrl}/auth/getuserbyid?id=${id}`);
    // }

    addBlogDetails(blog: Blog) {
        return this.http.post(`${environment.apiUrl}/auth/addblog`, blog);
    }
}