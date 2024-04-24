import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services/account.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users?: any[];

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.getAllUsers();
    }

    getAllUsers() {
        this.accountService.getAllUsers().subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.users = response.data;
            }
        });
    }

    deleteUser(id: string) {
        const user = this.users!.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.deleteUserById(id).subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.users = this.users!.filter(x => x.id !== id)
            }
        });
    }
}