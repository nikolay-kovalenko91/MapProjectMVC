import {Component} from '@angular/core';

@Component({
    selector: 'help-spoiler',
    template: require('./help-spoiler.component.pug'),
    styles: [require('./help-spoiler.component.scss').toString()]
})

export class HelpSpoilerComponent {
    isHelpSpoilerVisible: boolean;

    constructor() {
        this.isHelpSpoilerVisible = false;
    }
}