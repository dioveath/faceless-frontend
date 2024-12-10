import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({
  className = "",
  fill = "white",
}: {
  className?: string;
  fill?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = div.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseXRef.current = x;
      mouseYRef.current = y;
      
      div.style.setProperty("--mouse-x", `${x}px`);
      div.style.setProperty("--mouse-y", `${y}px`);
    };

    div.addEventListener("mousemove", handleMouseMove);
    return () => div.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className={cn(
        "relative overflow-hidden bg-transparent w-full h-full",
        className
      )}
    >
      <div
        className="spotlight-gradient absolute pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${fill}15, transparent 40%)`,
        }}
      />
    </div>
  );
}