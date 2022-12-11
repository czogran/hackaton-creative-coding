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
import { ElementPosition, ElementSize } from '../app.component';

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
    private firstJoint: paper.Path.Circle;
    private faceCenter: ElementPosition;
    private faceRadius: number;
    private mouth: paper.Path;
    private isMouseClicked: boolean;
    private wait: Boolean = false;
    private robotArm1: paper.Path.Rectangle;
    private secondJoint: paper.Path.Circle;
    private robotArm2: paper.Path.Rectangle;
    private gripper: paper.Path.Circle;

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
        this.drawMouth();
    }

    width: number = 1080;
    height: number = 1500;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        setTimeout(() => this.draw(), 100);
    }

    draw() {}

    drawRobot() {
        const joint1RotatingAngle = 110;
        const joint2RotatingAngle = -90;

        // const joint1RotatingAngle = 0;
        // const joint2RotatingAngle = 0;

        const baseHeight = -this.height * 0.2;
        const rectangle = new Rectangle(
            this.width * 0.1,
            this.height,
            this.width * 0.1,
            baseHeight
        );
        this.robotBase = new Path.Rectangle(rectangle);
        this.robotBase.fillColor = new Color(255, 0, 0, 0.5);

        const jointRadius = this.width * 0.2;

        const firstJointCenter = [
            rectangle.center.x,
            rectangle.center.y + (rectangle.height - jointRadius / 2) / 2,
        ];

        this.firstJoint = new Path.Circle({
            center: firstJointCenter,
            radius: jointRadius / 4,
            strokeColor: 'black',
        });

        this.firstJoint.fillColor = new Color(0.5, 0.5, 0.5);

        const rectangleArm1 = new Rectangle(
            this.width * 0.12,
            this.height + baseHeight - jointRadius / 2,
            this.width * 0.06,
            -this.height * 0.2
        );

        this.robotArm1 = new Path.Rectangle(rectangleArm1);
        this.robotArm1.fillColor = new Color(255, 0, 0, 0.5);
        this.robotArm1.rotate(joint1RotatingAngle, new Point(firstJointCenter));

        const secondJointCenter = [
            rectangleArm1.center.x,
            rectangleArm1.center.y +
                (rectangleArm1.height - jointRadius / 2) / 2,
        ];

        this.secondJoint = new Path.Circle({
            center: secondJointCenter,
            radius: jointRadius / 4,
            strokeColor: 'black',
        });

        this.secondJoint.fillColor = new Color(0.5, 0.5, 0.5);

        this.secondJoint.rotate(
            joint1RotatingAngle,
            new Point(firstJointCenter)
        );

        const movedSecondJoint = this.secondJoint.clone();
        const secondJointTransformedCenter = [
            movedSecondJoint.position.x,
            movedSecondJoint.position.y,
        ];

        const rectangleArm2 = new Rectangle(
            this.width * 0.12,
            this.height + 2 * baseHeight - jointRadius,
            this.width * 0.06,
            baseHeight
        );

        this.robotArm2 = new Path.Rectangle(rectangleArm2);
        this.robotArm2.fillColor = new Color(200, 0, 0, 1);
        this.robotArm2.rotate(joint1RotatingAngle, new Point(firstJointCenter));
        const backup = this.robotArm2.clone();
        this.robotArm2.remove();
        this.robotArm2 = backup;

        this.robotArm2.rotate(
            joint2RotatingAngle,
            new Point(secondJointTransformedCenter)
        );

        const gripperJointCenter = [
            rectangle.center.x,
            rectangle.center.y +
                baseHeight * 2.5 -
                jointRadius -
                jointRadius / 8,
        ];

        this.gripper = new Path.Circle({
            center: gripperJointCenter,
            radius: jointRadius / 8,
            strokeColor: 'black',
        });

        this.gripper.fillColor = new Color(0.5, 0.5, 1);

        this.gripper.rotate(joint1RotatingAngle, new Point(firstJointCenter));
        const gripperBackup = this.gripper.clone();
        gripperBackup.rotate(
            joint2RotatingAngle,
            new Point(secondJointTransformedCenter)
        );
      this.gripper.remove();
      this.gripper = gripperBackup;
    }

    drawFace() {
        this.faceCenter = { x: this.width / 2, y: this.height * 0.3 };

        this.faceRadius = this.faceCenter.x * 0.75;

        this.face = new Path.Circle({
            center: [this.faceCenter.x, this.faceCenter.y],
            radius: this.faceRadius,
            strokeColor: 'black',
        });

        this.face.fillColor = new Color(200, 200, 0, 0.5);

        const eyeShift = {
            x: this.faceRadius / 2,
            y: this.faceRadius / 2,
        };

        this.leftEye = new Path.Circle({
            center: [
                this.faceCenter.x - eyeShift.x,
                this.faceCenter.y - eyeShift.y,
            ],
            radius: this.faceRadius / 4,
            strokeColor: 'blue',
        });

        this.leftEye.fillColor = new Color(0, 0, 255, 0.7);

        this.rightEye = new Path.Circle({
            center: [
                this.faceCenter.x + eyeShift.x,
                this.faceCenter.y - eyeShift.y,
            ],
            radius: this.faceRadius / 4,
            strokeColor: 'blue',
        });

        this.rightEye.fillColor = new Color(0, 0, 255, 0.7);
    }

    drawMouth() {
        this.mouth = new Path({
            strokeColor: '#E4141B',
            strokeWidth: this.height * 0.01,
            strokeCap: 'round',
        });

        const mouthShift = {
            x: this.faceRadius * 0.5,
            y: this.faceRadius / 2,
        };

        const mouthWidth = mouthShift.x * 2;
        const mouthStep = this.width * 0.04;

        let i = 0;
        while (i < mouthWidth) {
            this.mouth.add(
                new Point(
                    this.faceCenter.x - mouthShift.x + i,
                    this.faceCenter.y + mouthShift.y
                )
            );
            i += mouthStep;
        }

        this.mouth.smooth({ type: 'continuous' });
        this.mouth.selected = true;
    }

    moveMouth(point: ElementPosition) {
        if (!this.isMouseClicked) {
            return;
        }

        if (
            point.x <
                this.mouth.segments[0].point.x - this.faceRadius * 0.1 * 0.1 ||
            point.x >
                this.mouth.segments[this.mouth.segments.length - 1].point.x +
                    this.faceRadius * 0.1
        ) {
            return;
        }

        if (
            point.y < this.mouth.segments[0].point.y - this.faceRadius * 0.2 ||
            point.y >
                this.mouth.segments[this.mouth.segments.length - 1].point.x +
                    this.faceRadius * 0.2
        ) {
            return;
        }

        const minDistance = { distance: 99999999999, index: 0 };
        this.mouth.segments.forEach((segment, index) => {
            const distance = this.calculateDistanceBetweenPoints(
                segment.point,
                point
            );
            if (distance < minDistance.distance) {
                minDistance.distance = distance;
                minDistance.index = index;
            }
        });

        if (
            minDistance.index === 0 ||
            minDistance.index === this.mouth.segments.length - 1
        ) {
            return;
        }

        if (minDistance.distance < 5) {
            this.mouth.segments[minDistance.index].point = new Point([
                point.x,
                point.y,
            ]);
        }
    }

    calculateDistanceBetweenPoints(
        point1: ElementPosition,
        point2: ElementPosition
    ): number {
        return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y));
    }

    ngAfterViewInit(): void {
        this.canvas = this.canvasElement.nativeElement;
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
    }

    mouseMove(event: any) {
        if (!this.wait) {
            this.wait = true;
            // after a fraction of a second, allow events again
            setTimeout(() => {
                this.wait = false;
                const eventPoint: ElementPosition = {
                    x: event.clientX,
                    y: event.clientY,
                };
                this.moveMouth(eventPoint);
            }, 20);
        }
    }

    touchMove(event: TouchEvent) {
        const eventPoint: ElementPosition = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
        };
        this.moveMouth(eventPoint);
    }

    mouseClicked(isMouseClicked: boolean) {
        this.isMouseClicked = isMouseClicked;
    }
}
