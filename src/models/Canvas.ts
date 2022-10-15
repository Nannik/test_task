import Line from "./Line";
import React from "react";
import Dot from "./Dot";

class Canvas {
    private _lines: Line[];
    private _drawingLine: Line | null;
    private _ctx: CanvasRenderingContext2D | null;
    private _isAnimate: boolean;

    constructor() {
        this._lines = [];
        this._ctx = null;
        this._isAnimate = false;
        this._drawingLine = null;
    }

    render(interval: number) {
        if (!this.ctx) return;

        this._ctx?.clearRect(0, 0, this._ctx!.canvas.clientWidth, this._ctx!.canvas.clientHeight);
        this.lines.forEach(line => line.render(interval, this.ctx!));
        this._drawingLine?.render(interval, this.ctx!);

        this.getDots().forEach(dot => dot.render(this.ctx!));
    }

    private getDots() {
        const dots: Dot[] = [];
        const lines = [...this._lines];
        !!this._drawingLine && lines.push(this._drawingLine);

        // O((n^2 - n) / 2)
        for (let i = 0; i < lines.length; i++) {
            for (let j = i + 1; j < lines.length; j++) {
                const x1 = lines[i].from.x;
                const y1 = lines[i].from.y;

                const x2 = lines[i].to.x;
                const y2 = lines[i].to.y;

                const x3 = lines[j].from.x;
                const y3 = lines[j].from.y;

                const x4 = lines[j].to.x;
                const y4 = lines[j].to.y;

                const ua = ((x4-x3)*(y1-y3)-(y4-y3)*(x1-x3))/((y4-y3)*(x2-x1)-(x4-x3)*(y2-y1));
                const ub = ((x2-x1)*(y1-y3)-(y2-y1)*(x1-x3))/((y4-y3)*(x2-x1)-(x4-x3)*(y2-y1));

                if ((ua < 0 || ua > 1) || (ub < 0 || ub > 1)) continue;

                dots.push(new Dot({
                    x: x1 + ua * (x2 - x1),
                    y: y1 + ua * (y2 - y1)
                }))
            }
        }

        return dots;
    }

    collapse() {
        if (this._lines.length === 0) return;

        this.lines.forEach(line => line.isCollapse = true);
        this._isAnimate = true;
        this._drawingLine = null;

        const start = Date.now();
        const f = (timestamp: number) => {
            const interval = Date.now() - start;

            if (interval > 3000) {
                this.lines = [];
                this._isAnimate = false;
            } else {
                requestAnimationFrame(f);
            }

            this.render(interval)
        }

        requestAnimationFrame(f);
    }

    handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        if (this._drawingLine && !this._isAnimate) {
            const point = {
                x: e.pageX - 50, // 50 - canvas margin
                y: e.pageY - 50
            }
            this._drawingLine = new Line(this._drawingLine.from, point)

            this.render(0);
        }
    }

    handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        if (this._isAnimate) return;

        if (e.button === 2) {
            this._drawingLine = null;
            this.render(0);
            return;
        }

        if (this._drawingLine) {
            this._lines.push(this._drawingLine);
            this._drawingLine = null;
        } else {
            const point = {
                x: e.pageX - 50, // 50 - canvas margin
                y: e.pageY - 50
            }
            this._drawingLine = new Line(point, point);
        }
    }

    // getter & setters
    get lines(): Line[] {
        return this._lines;
    }

    set lines(value: Line[]) {
        this._lines = value;
    }

    get ctx(): CanvasRenderingContext2D | null {
        return this._ctx;
    }

    set ctx(value: CanvasRenderingContext2D | null) {
        this._ctx = value;

        if (this._ctx) {
            this._ctx.strokeStyle = "#000";
            this._ctx.fillStyle = "#f00";
            this._ctx.lineWidth = 1;
        }

        this.render(0);
    }

    get isAnimate(): boolean {
        return this._isAnimate;
    }

    set isAnimate(value: boolean) {
        this._isAnimate = value;
    }
}

export default Canvas;