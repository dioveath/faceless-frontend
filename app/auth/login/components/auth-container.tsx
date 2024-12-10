'use client';

import { motion, AnimatePresence } from "framer-motion";
import { AuthForm } from "./auth-form";

interface AuthContainerProps {
  mode: "login" | "register";
  onToggleMode: () => void;
}

export function AuthContainer({ mode, onToggleMode }: AuthContainerProps) {
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    onToggleMode();
  };

  return (
    <div className="relative w-full min-h-[500px] flex items-center justify-center">
      <AnimatePresence initial={false} custom={mode === "login" ? -1 : 1} mode="wait">
        <motion.div
          key={mode}
          custom={mode === "login" ? -1 : 1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 1000, damping: 100 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <AuthForm mode={mode} onToggleMode={onToggleMode} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}