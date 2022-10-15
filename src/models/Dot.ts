import Vector2 from "../types/Vector2";

export default class Dot {
    private position: Vector2;

    constructor(position: Vector2) {
        this.position = position;
    }

    public render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}