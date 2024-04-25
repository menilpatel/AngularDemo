import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get<any>(`${environment.apiUrl}/auth/getallusers`);
    }

    getUserById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/getuserbyid?id=${id}`);
    }

    updateUserById(user: User) {
        user.role="author";
        return this.http.post(`${environment.apiUrl}/auth/updateuserbyid`, user);
    }

    deleteUserById(id: string) {
        return this.http.get<any>(`${environment.apiUrl}/auth/deleteuserbyid?id=${id}`);
    }
}