import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private toastr: ToastrService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];

        // form with validation rules
        this.form = this.formBuilder.group({
            id: [this.id],
            firstName: ['', Validators.required],
            middleName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            // password only required in add mode
            password: ['', [Validators.minLength(6), ...(!this.id ? [Validators.required] : [])]]
        });

        this.title = 'Add User';
        if (this.id) {
            // edit mode
            this.title = 'Edit User';
            this.loading = true;

            this.accountService.getUserById(this.id).subscribe((response: any) => {
                if (response.statuscode == 200) {
                    this.form.patchValue(response.data);
                    this.loading = false;
                }
            });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.submitting = true;

        this.saveUser().subscribe((response: any) => {
            if (response.statuscode == 200) {
                this.toastr.success(this.id ? "User updated" : "User added");
                this.router.navigateByUrl('/users');
            }
            this.submitting = false;
        });
    }

    private saveUser() {
        // create or update user based on id param
        return this.accountService.updateUserById(this.form.value);
    }
}