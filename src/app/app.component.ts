import { Component, ViewEncapsulation } from '@angular/core';

export const MAX_NUMBER_OF_HAPPY_USERS = 50;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}

export interface ElementSize {
    width: number;
    height: number;
}

export interface ElementPosition {
    x: number;
    y: number;
}
