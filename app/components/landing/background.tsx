"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawBackground = () => {
      const backgroundColor = theme === "dark" ? "#020817" : "#ffffff";
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawGraph = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      ctx.strokeStyle = "rgba(139, 92, 246, 0.05)";
      ctx.lineWidth = 1;

      const cellSize = 50;
      const skewAngle = Math.PI / 6;

      for (let x = -cellSize; x <= canvas.width + canvas.height / Math.tan(skewAngle); x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - canvas.height / Math.tan(skewAngle), canvas.height);
        ctx.stroke();
      }

      for (let y = -cellSize; y <= canvas.height + cellSize; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y + canvas.width * Math.tan(skewAngle));
        ctx.stroke();
      }
    };

    const animate = () => {
      drawGraph();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" style={{ opacity: theme === "dark" ? 0.5 : 1 }} />;
}
