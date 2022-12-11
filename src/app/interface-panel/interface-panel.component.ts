import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { HttpServiceService } from '../services/http-service.service';


@Component({
    selector: 'app-interface-panel',
    templateUrl: './interface-panel.component.html',
    styleUrls: ['./interface-panel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class InterfacePanelComponent implements AfterViewInit, OnDestroy {
    @ViewChild('paperComponent', { read: ElementRef })
    paperComponent: ElementRef<HTMLElement>;

    drawInterface: boolean;
    usersOnline: number = 10;
    amountOfHappyUsers: number = 0;
    private interval: NodeJS.Timer;
    private usersInterval: NodeJS.Timer;

    constructor(private http: HttpServiceService) {}

    ngAfterViewInit(): void {
        if (this.paperComponent) {
            setTimeout(() => {
                this.drawInterface = true;
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
    }

    ngOnDestroy(): void {
        clearInterval(this.interval);
        clearInterval(this.usersInterval);
    }
}
