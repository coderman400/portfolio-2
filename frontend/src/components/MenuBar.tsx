import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

interface MenuBarProps {
  onNavigate?: () => Promise<void>;
  showAnimation?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({
  onNavigate,
  showAnimation = true,
}) => {
  const navigate = useNavigate();
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const blackBarRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const overlayTextRef = useRef<HTMLDivElement>(null);

  // Custom function to split text into characters
  const splitTextIntoChars = (text: string, container: HTMLElement) => {
    container.innerHTML = "";
    const chars: HTMLSpanElement[] = [];

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(20px)";

      if (i === 0) {
        span.style.fontFamily = "Roxborough Regular, sans-serif";
      }

      container.appendChild(span);
      chars.push(span);
    }

    return chars;
  };

  const handleMenuClick = async (menuItem: string) => {
    if (onNavigate) {
      // Start the transition
      const transitionPromise = onNavigate();

      // Navigate to the new page while the transition is happening
      setTimeout(() => {
        navigate(`/${menuItem.toLowerCase()}`);
      }, 400); // Navigate halfway through the transition

      // Wait for the transition to complete
      await transitionPromise;
    } else {
      // Direct navigation if no transition handler
      navigate(`/${menuItem.toLowerCase()}`);
    }
  };

  useEffect(() => {
    if (!showAnimation) return;

    if (blackBarRef.current) {
      gsap.set(blackBarRef.current, { scaleY: 0 });
    }
    if (overlayTextRef.current) {
      gsap.set(overlayTextRef.current, { opacity: 0 });
    }

    buttonsRef.current.forEach((button, index) => {
      if (button) {
        const buttonTexts = ["Works", "About", "Contact", "Art"];

        button.addEventListener("mouseenter", () => {
          if (blackBarRef.current) {
            gsap.to(blackBarRef.current, {
              scaleY: 1,
              duration: 0.6,
              ease: "power1.easeInOut",
            });
          }

          if (overlayTextRef.current) {
            const chars = splitTextIntoChars(
              buttonTexts[index],
              overlayTextRef.current
            );

            gsap.set(overlayTextRef.current, { opacity: 1 });

            gsap.fromTo(
              chars,
              {
                y: 20,
                autoAlpha: 0,
              },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                stagger: 0.05,
                delay: 0.35,
                ease: "power1.easeOut",
              }
            );
          }

          buttonsRef.current.forEach((btn) => {
            if (btn) {
              gsap.to(btn, {
                color: "#ffffff",
                duration: 0.6,
                ease: "power1.easeOut",
              });
            }
          });
        });

        button.addEventListener("mouseleave", () => {
          if (blackBarRef.current) {
            gsap.to(blackBarRef.current, {
              scaleY: 0,
              duration: 0.6,
              ease: "power1.easeOut",
            });
          }

          if (overlayTextRef.current) {
            const chars = overlayTextRef.current.querySelectorAll("span");

            gsap.to(chars, {
              y: -20,
              autoAlpha: 0,
              duration: 0.15,
              stagger: 0.01,
              ease: "power1.easeIn",
              onComplete: () => {
                gsap.set(overlayTextRef.current, { opacity: 0 });
              },
            });
          }

          buttonsRef.current.forEach((btn) => {
            if (btn) {
              gsap.to(btn, {
                color: "#000000",
                duration: 0.6,
                ease: "power1.easeOut",
              });
            }
          });
        });

        button.addEventListener("click", () => {
          handleMenuClick(buttonTexts[index]);
        });
      }
    });
  }, [onNavigate, showAnimation]);

  return (
    <div
      ref={menuContainerRef}
      className="w-full h-24 flex flex-row items-center justify-between px-20 py-4 font-roobert text-sm relative"
    >
      {showAnimation && (
        <>
          <div
            ref={blackBarRef}
            className="absolute inset-0 bg-black"
            style={{ transformOrigin: "center" }}
          />
          <div
            ref={overlayTextRef}
            className="absolute inset-0 flex items-center justify-center text-[#2c2c2c] text-8xl font-roobert pointer-events-none"
            style={{ opacity: 0 }}
          />
        </>
      )}
      <button
        ref={(el) => {
          buttonsRef.current[0] = el;
        }}
        className="relative z-10 text-black cursor-pointer"
      >
        01<br></br>Works
      </button>
      <button
        ref={(el) => {
          buttonsRef.current[1] = el;
        }}
        className="relative z-10 text-black cursor-pointer"
      >
        02<br></br>About
      </button>
      <button
        ref={(el) => {
          buttonsRef.current[2] = el;
        }}
        className="relative z-10 text-black cursor-pointer"
      >
        03<br></br>Contact
      </button>
      <button
        ref={(el) => {
          buttonsRef.current[3] = el;
        }}
        className="relative z-10 text-black cursor-pointer"
      >
        04<br></br>Art
      </button>
    </div>
  );
};

export default MenuBar;
