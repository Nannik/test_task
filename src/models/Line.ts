import Vector2 from "../types/Vector2";

export default class Line {
    private readonly _size: Vector2;
    private readonly _initialFrom: Vector2;
    private readonly _initialTo: Vector2;
    private readonly _from: Vector2;
    private readonly _to: Vector2;
    private _isCollapse: boolean;

    constructor(from: Vector2, to: Vector2) {
        this._initialFrom = {...from};
        this._from = {...from};
        this._initialTo = {...to};
        this._to = {...to};
        this._isCollapse = false;
        this._size = {
            x: this._initialTo.x - this._initialFrom.x,
            y: this._initialTo.y - this._initialFrom.y
        }
    }

    render(interval: number, ctx: CanvasRenderingContext2D) {
        if (this._isCollapse) this.collapse(interval);

        ctx.beginPath();
        ctx.moveTo(this._from.x, this._from.y);
        ctx.lineTo(this._to.x, this._to.y);
        ctx.stroke();
    }

    collapse(interval: number) {
        if (!this._size) return;

        const d = {
            x: this._size.x / 2 / 3000 * interval,
            y: this._size.y / 2 / 3000 * interval,
        }

        this._from.x = this._initialFrom.x + d.x;
        this._from.y = this._initialFrom.y + d.y;
        this._to.x = this._initialTo.x - d.x;
        this._to.y = this._initialTo.y - d.y;
    }

    get size(): Vector2 {
        return this._size;
    }

    get from(): Vector2 {
        return this._from;
    }

    get to(): Vector2 {
        return this._to;
    }

    set isCollapse(value: boolean) {
        this._isCollapse = value;
    }
}
