import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { gsap } from "gsap";

export interface PageTransitionRef {
  startTransition: () => Promise<void>;
}

const PageTransition = forwardRef<PageTransitionRef>((_, ref) => {
  const transitionRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    startTransition: () => {
      return new Promise<void>((resolve) => {
        if (!transitionRef.current) {
          resolve();
          return;
        }

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: () => {
            // Wait a bit before sliding up to reveal the new page
            setTimeout(() => {
              if (transitionRef.current) {
                gsap.to(transitionRef.current, {
                  y: "-100vh",
                  duration: 0.8,
                  ease: "power2.inOut",
                  onComplete: () => {
                    // Reset for next use
                    gsap.set(transitionRef.current, {
                      height: "0vh",
                      y: "0vh",
                      zIndex: -1,
                    });
                    resolve();
                  },
                });
              } else {
                resolve();
              }
            }, 100);
          },
        });

        // Set initial state - positioned at top of screen
        gsap.set(transitionRef.current, {
          height: "0vh",
          zIndex: 9999,
          y: "0vh",
        });

        // Animate the black bar expanding to cover the entire screen
        tl.to(transitionRef.current, {
          height: "100vh",
          duration: 0.8,
          ease: "power2.out",
        });
      });
    },
  }));

  return (
    <div
      ref={transitionRef}
      className="fixed top-0 left-0 w-full bg-black pointer-events-none"
      style={{
        zIndex: -1,
        height: "0vh",
      }}
    />
  );
});

PageTransition.displayName = "PageTransition";

export default PageTransition;
