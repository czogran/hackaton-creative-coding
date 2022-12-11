import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    HostListener,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { ElementSize, MAX_NUMBER_OF_HAPPY_USERS } from '../app.component';
import { HttpServiceService } from '../services/http-service.service';

@Component({
    selector: 'app-user-panel',
    templateUrl: './user-panel.component.html',
    styleUrls: ['./user-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements AfterViewInit, OnDestroy {
    @ViewChild('paperComponentWrapper')
    paperComponentWrapper: ElementRef;
    @ViewChild('paperComponent', { read: ElementRef })
    paperComponent: ElementRef<HTMLElement>;
    size: ElementSize;
    usersOnline: number = 0;
    private interval: NodeJS.Timer;
    private usersInterval: NodeJS.Timer;
    amountOfHappyUsers: number;
    MAX_NUMBER_OF_HAPPY_USERS = MAX_NUMBER_OF_HAPPY_USERS;

    constructor(
        private cd: ChangeDetectorRef,
        private http: HttpServiceService
    ) {
        this.interval = setInterval(() => {
            this.http.getUsers().subscribe((response) => {
                const users = JSON.parse(JSON.stringify(response));
                this.usersOnline = users['users'];
            });
        }, 1000);

        this.http.addUser().subscribe();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.size = {
                width: window.innerWidth,
                height: window.innerHeight * 0.8,
            };

            this.interval = setInterval(() => {
                this.http.getUserMood().subscribe((response) => {
                    const usersMood = JSON.parse(JSON.stringify(response));
                    this.amountOfHappyUsers = usersMood['mood'];
                });
            }, 500);

            this.usersInterval = setInterval(() => {
                this.http.getUsers().subscribe((response) => {
                    const users = JSON.parse(JSON.stringify(response));
                    this.usersOnline = users['users'];
                });
            }, 1000);
        });
    }

    ngOnDestroy() {
        clearInterval(this.interval);
        clearInterval(this.usersInterval);
    }
    contribute() {}

    addHappyUser() {
        this.http.addHappyUser().subscribe();
    }

    addSadUser() {
        this.http.addSadUser().subscribe();
    }
}
