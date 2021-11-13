import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
    editIcon = faEdit;
    confirmPasswordIcon = faEye;
    confirmPasswordType = 'password';
    passwordIcon = faEye;
    passwordType = 'password';

    active = 1;

    readonly = true;

    constructor() {}

    ngOnInit(): void {}

    reset() {
        this.readonly = true;
    }

    save() {
        this.readonly = true;
    }

    invertConfirmPassword() {
        if (this.confirmPasswordType === 'text') {
            this.confirmPasswordType = 'password';
        } else {
            this.confirmPasswordType = 'text';
        }
    }

    invertPassword() {
        if (this.passwordType === 'text') {
            this.passwordType = 'password';
        } else {
            this.passwordType = 'text';
        }
    }
}
