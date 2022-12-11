import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    // @ViewChild('paperComponentWrapper')
    // paperComponentWrapper: ElementRef;
    // @ViewChild('paperComponent', { read: ElementRef })
    // paperComponent: ElementRef<HTMLElement>;

    title = 'hackaton-creative-coding';
    menuItems: MegaMenuItem[] = [];
    private observer: ResizeObserver;
    size: ElementSize;

    constructor(private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        // this.observer = new ResizeObserver((entries) => {
        //     const nativeElement = this.paperComponent.nativeElement;
        //     this.size = {
        //         width: nativeElement.offsetWidth,
        //         height: nativeElement.offsetHeight,
        //     };
        //     this.cd.detectChanges();
        // });
        // this.observer.observe(
        //     this.paperComponentWrapper.nativeElement as Element
        // );
    }

    ngOnDestroy() {
        // this.observer.unobserve(this.paperComponentWrapper.nativeElement);
    }

    ngOnInit(): void {}

    sendYourMouth() {
        console.log('sendYourMouth');
    }

    contribute() {
        console.log('contribute');
    }
}

export interface ElementSize {
    width: number;
    height: number;
}

export interface ElementPosition {
    x: number;
    y: number;
}
