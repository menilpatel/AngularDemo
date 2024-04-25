import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f['email'].value, this.f['password'].value)
            .subscribe((response: any) => {
                if (response.statuscode == 200 && response.status == true) {
                    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                    const role = response.data.role;
                    console.log(returnUrl);
                    if (returnUrl != null) {
                        if (returnUrl.match(`/${role}/?`)) {
                            this.router.navigateByUrl(returnUrl);
                        } else {
                            this.router.navigateByUrl(`/${role}`);
                        }
                    } else {
                        this.router.navigateByUrl(`/${role}`);
                    }
                }
                else {
                    this.alertService.error(response.message);
                    this.loading = false;
                }
            });
    }
}