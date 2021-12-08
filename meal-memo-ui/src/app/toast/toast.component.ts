import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { ToastMessage } from './toast';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
    toasts$: Observable<ToastMessage[]>;

    constructor(
        toastService: ToastService,
        private domSanitizer: DomSanitizer
    ) {
        this.toasts$ = toastService.getToasts();
    }

    ngOnInit(): void {}

    getHtml(data: string) {
        return this.domSanitizer.bypassSecurityTrustHtml(data);
    }
}
