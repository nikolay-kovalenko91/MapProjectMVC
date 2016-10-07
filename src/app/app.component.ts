import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: require('./app.component.pug'),
    styles: [require('./app.component.scss').toString()]
})
export class AppComponent {}