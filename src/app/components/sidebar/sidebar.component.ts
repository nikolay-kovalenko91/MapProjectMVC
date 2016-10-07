import {Component} from '@angular/core';

@Component({
    selector: 'sidebar',
    template: require('./sidebar.component.pug'),
    styles: [require('./sidebar.component.scss').toString()]
})

export class SidebarComponent {
    isSidebarVisible: boolean;

    constructor() {
        this.isSidebarVisible = false;
    }
}