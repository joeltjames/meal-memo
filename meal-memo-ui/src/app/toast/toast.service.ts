import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastMessage } from './toast';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private toasts: ToastMessage[] = [];
    private toast$ = new BehaviorSubject<ToastMessage[]>([]);

    public getToasts(): Observable<ToastMessage[]> {
        return this.toast$.asObservable();
    }

    public createToast(toast: ToastMessage) {
        toast.onClose = () => {
            toast.onClose();
            const index = this.toasts.findIndex((t) => t.uuid === toast.uuid);
            if (index > -1) {
                this.toasts.splice(index, 1);
            }
        };

        if (toast.autoHide) {
            setTimeout(() => {
                toast.close();
            }, 5000);
        }

        this.toasts.unshift(toast);
        this.toast$.next(this.toasts);
    }
}
