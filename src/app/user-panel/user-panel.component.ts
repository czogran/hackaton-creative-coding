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
import { ElementSize } from '../app.component';
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
    private observer: ResizeObserver;
    size: ElementSize;
    usersOnline: number = 0;
    private interval: NodeJS.Timer;

    @HostListener('window:beforeunload', ['$event']) unloadHandler(
        event: Event
    ) {
        console.log('Processing beforeunload...', event);
        this.http.removeUser();
    }

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
        });
        this.observer = new ResizeObserver((entries) => {
            const nativeElement = this.paperComponent.nativeElement;
            this.size = {
                width: nativeElement.offsetWidth,
                height: nativeElement.offsetHeight,
            };
            this.cd.detectChanges();
        });
        // this.observer.observe(
        //     this.paperComponentWrapper.nativeElement as Element
        // );
    }

    ngOnDestroy() {
        this.observer.unobserve(this.paperComponentWrapper.nativeElement);
        clearInterval(this.interval);
    }
    contribute() {}

    addHappyUser() {
        this.http.addHappyUser().subscribe();
    }

    addSadUser() {
        this.http.addSadUser().subscribe();
    }
}
