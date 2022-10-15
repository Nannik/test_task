import {RefObject, useEffect, useState} from "react";

const useRenderingContext = (canvasRef: RefObject<HTMLCanvasElement>) => {
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (!canvasRef.current) setCtx(null);
        else setCtx(canvasRef.current.getContext('2d'));
    }, [canvasRef]);

    return ctx;
}

export default useRenderingContext;