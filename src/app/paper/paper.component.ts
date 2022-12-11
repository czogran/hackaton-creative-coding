import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Project, Path, Point, Color, Curve, Rectangle } from 'paper';
import * as paper from 'paper';
import { ElementSize } from '../app.component';

@Component({
    selector: 'app-paper',
    templateUrl: './paper.component.html',
    styleUrls: ['./paper.component.scss'],
})
export class PaperComponent implements OnInit, AfterViewInit {
    @ViewChild('canvas') canvasElement: ElementRef<HTMLCanvasElement>;
    public canvas: HTMLCanvasElement;
    private myCircle: paper.Path.Circle;
    private robotBase: paper.Path.Rectangle;
    private project: paper.Project;
    private face: paper.Path.Circle;
    private leftEye: paper.Path.Circle;
    private rightEye: paper.Path.Circle;

    @Input()
    set size(size: ElementSize) {
        if (!size) {
            return;
        }

        // this.width = size.width;
        // this.height = size.height;

        // this.canvas.style.height = this.height + 'px';
        // this.canvas.style.width = this.width + 'px';
        this.project.clear();
        this.drawRobot();
        this.drawFace();
    }

    width: number = 1080;
    height: number = 1920;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        setTimeout(() => this.draw(), 100);
    }

    draw() {}

    drawRobot() {
        console.log('this.height');
        console.log(this.height);
        const rectangle = new Rectangle(
            this.width * 0.1,
            this.height,
            this.width * 0.1,
            -this.height * 0.3
        );
        this.robotBase = new Path.Rectangle(rectangle);
        this.robotBase.fillColor = new Color(255, 0, 0, 0.5);
        console.log('drawRobot');
    }

    drawFace() {
        const faceCenter = { x: this.width / 2, y: this.height * 0.25 };

        const faceRadius = faceCenter.x * 0.75;

        this.face = new Path.Circle({
            center: [faceCenter.x, faceCenter.y],
            radius: faceRadius,
            strokeColor: 'black',
        });

        this.face.fillColor = new Color(200, 200, 0, 0.5);

        const eyeShift = {
            x: faceRadius / 2,
            y: faceRadius / 2,
        };

        this.leftEye = new Path.Circle({
            center: [faceCenter.x - eyeShift.x, faceCenter.y - eyeShift.y],
            radius: faceRadius / 4,
            strokeColor: 'blue',
        });

        this.leftEye.fillColor = new Color(0, 0, 255, 0.7);

        this.rightEye = new Path.Circle({
            center: [faceCenter.x + eyeShift.x, faceCenter.y - eyeShift.y],
            radius: faceRadius / 4,
            strokeColor: 'blue',
        });

        this.rightEye.fillColor = new Color(0, 0, 255, 0.7);
    }

    ngAfterViewInit(): void {
        this.canvas = this.canvasElement.nativeElement;
        // this.width = this.canvas.width;
        // this.height = this.canvas.height;
        // console.log(this.canvas);
        this.project = new Project(this.canvas);
        this.myCircle = new Path.Circle({
            center: [80, 50],
            radius: 30,
            strokeColor: 'black',
        });

        let mouth = new Path({
            strokeColor: '#E4141B',
            strokeWidth: 20,
            strokeCap: 'round',
        });

        for (let i = 0; i < 10; i++) {
            mouth.add(new Point(i * length, i));
        }

        // this.drawRobot();
    }
    // myCircle.selected = false;

    // myCircle.add(event.point);

    mouseMove(event: any) {
        // console.log(event);
        // this.myCircle.position.x = event.clientX;
        // this.myCircle.position.y = event.clientY;
    }
}
