import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];

    constructor() { }

    ngOnInit() {
    }
}