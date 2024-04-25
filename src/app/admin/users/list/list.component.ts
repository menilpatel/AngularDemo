import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../_services/users.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.userService.getAllUsers().subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.users = response.data;
            }
        });
    }

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.userService.deleteUserById(id).subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.users = this.users!.filter(x => x.id !== id)
            }
        });
    }
}