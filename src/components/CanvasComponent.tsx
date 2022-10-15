import React, {FC, useEffect, useRef, useState} from "react";
import useRenderingContext from "../hooks/useRenderingContext";
import Canvas from "../models/Canvas";

type CanvasProps = {
    canvas: Canvas
}

const CanvasComponent: FC<CanvasProps> = ({ canvas }) => {
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - 100);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctx = useRenderingContext(canvasRef);

    // handle context change
    useEffect(() => {
        canvas.ctx = ctx;
    }, [ctx]);

    // handle window resize
    useEffect(() => {
        const listener = (e: UIEvent) => {
            setCanvasWidth(window.innerWidth - 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={600}
            onMouseMove={canvas.handleMouseMove.bind(canvas)}
            onMouseDown={canvas.handleMouseDown.bind(canvas)}
        />
    )
}

export default CanvasComponent;