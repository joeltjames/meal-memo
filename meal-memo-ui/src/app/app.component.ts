import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'meal-memo-ui';
    isPrinting = true;

    constructor(private router: Router) {}

    ngOnInit() {
        this.printpath('', this.router.config);
    }

    printpath(parent: string, config: Route[]) {
        for (const route of config) {
            console.log(parent + '/' + route.path);
            if (route.children) {
                const currentPath = route.path ? parent + '/' + route.path : parent;
                this.printpath(currentPath, route.children);
            }
        }
    }
}
