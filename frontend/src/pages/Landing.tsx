import React from "react";
import Lottie from "lottie-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import homeLoopAnimation from "../assets/HomeLoop.json";
import homeDropAnimation from "../assets/HomeDrop.json";
import diamond from "../assets/diamond.png";

const Landing = () => {
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

  useEffect(() => {
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

            // Animate each character
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

          // Animate text color for all buttons
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

          // Hide overlay text with character animation
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

          // Animate text color back for all buttons
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
      }
    });
  }, []);

  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-[14rem] font-bold ">
        <span className="font-roxborough-italic mr-3">Arvind</span>
        <span className=" text-[12rem] font-roobert">Babu</span>
      </h1>
      <div
        ref={menuContainerRef}
        className="w-full h-24 flex flex-row items-center justify-between px-20 py-4 font-roobert text-sm relative"
      >
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
        <button
          ref={(el) => {
            buttonsRef.current[0] = el;
          }}
          className="relative z-10 text-black"
        >
          01<br></br>Works
        </button>
        <button
          ref={(el) => {
            buttonsRef.current[1] = el;
          }}
          className="relative z-10 text-black"
        >
          02<br></br>About
        </button>
        <button
          ref={(el) => {
            buttonsRef.current[2] = el;
          }}
          className="relative z-10 text-black"
        >
          03<br></br>Contact
        </button>
        <button
          ref={(el) => {
            buttonsRef.current[3] = el;
          }}
          className="relative z-10 text-black"
        >
          04<br></br>Art
        </button>
      </div>
      <div className="grid grid-cols-3 w-full px-10">
        <div className="flex flex-col py-10 items-center justify-center">
          <img src={diamond} className="w-12 h-12"></img>
          <p className="font-roobert text-lg">
            Hey there! I'm a developer and student at VIT. I make websites that
            look good, feel smooth and actually work (most of the time).
          </p>
        </div>
        <div className="">
          <Lottie
            animationData={homeLoopAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
          />
        </div>
        <div className="flex flex-col p-10 items-center justify-center">
          <img src={diamond} className="w-12 h-12"></img>
          <p className="font-roobert text-lg">
            I also do marketing, web design, digital art and a whole lot of
            other things. Let's talk and see what we can create together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
