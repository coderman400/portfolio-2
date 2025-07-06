import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";

// Import project images
import neuroIdImage from "../assets/neuroid.png";
import skibidiDukaanImage from "../assets/skibididukaan.png";
import autitestImage from "../assets/autitest.png";
import ffcsImage from "../assets/ffcs.png";
import demespImage from "../assets/demesp.png";
import newsImage from "../assets/news.png";
import rockPaperScissorsImage from "../assets/rockpaperscissors.png";

interface WorksProps {
  onNavigate?: () => Promise<void>;
}

const Works: React.FC<WorksProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
      scrollContainer.style.cursor = "grabbing";
      scrollContainer.style.userSelect = "none";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
      scrollContainer.style.userSelect = "auto";
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
      scrollContainer.style.cursor = "grab";
      scrollContainer.style.userSelect = "auto";
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollContainer.offsetLeft);
      setScrollLeft(scrollContainer.scrollLeft);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const x = e.touches[0].pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 2;
      scrollContainer.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
    };

    // Add event listeners
    scrollContainer.addEventListener("mousedown", handleMouseDown);
    scrollContainer.addEventListener("mousemove", handleMouseMove);
    scrollContainer.addEventListener("mouseup", handleMouseUp);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);
    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchmove", handleTouchMove);
    scrollContainer.addEventListener("touchend", handleTouchEnd);

    // Set initial cursor
    scrollContainer.style.cursor = "grab";

    return () => {
      scrollContainer.removeEventListener("mousedown", handleMouseDown);
      scrollContainer.removeEventListener("mousemove", handleMouseMove);
      scrollContainer.removeEventListener("mouseup", handleMouseUp);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startX, scrollLeft]);

  const projects2025 = [
    {
      id: 1,
      title: "NeuroID",
      image: neuroIdImage,
      year: "2025",
      description:
        "A decentralized digital identity platform built on Ether.js, React and Solidity while combining a FastAPI backend with facial recognition for biometric authentication.",
      githubUrl: "https://github.com/coderman400/neuroID",
    },
    {
      id: 2,
      title: "Skibidi Dukaan",
      image: skibidiDukaanImage,
      year: "2025",
      description:
        "A local e-commerce website for students in my college hostels to buy and sell snacks after our stores closed. During exam week, we saw 20+ product listings per night with a total of 150+ products sold.",
      githubUrl: "https://github.com/coderman400/skibidi-dukaan",
    },
    {
      id: 3,
      title: "Autitest",
      image: autitestImage,
      year: "2025",
      description:
        "A friendly MBTI style quiz for predicting autism diagnosis using a trained Random Forest Classifier that showed 83.25% accuracy. Imbalanced data was handled using SMOTE.",
      githubUrl: "https://github.com/coderman400/autism-prediction",
    },
  ];

  const projects2024 = [
    {
      id: 4,
      title: "Skibidi FFCS Timetables",
      image: ffcsImage,
      year: "2024",
      description:
        "A web app for students to easily make their semester timetables. Implemented with OCR and a customized backtracking algorithm for optimal course selection. We gathered 750+ users over 2 days.",
      githubUrl: "https://github.com/coderman400/ffcs",
    },
    {
      id: 5,
      title: "De-MESP",
      image: demespImage,
      year: "2024",
      description:
        "A decentralized marketplace for medical datasets targeted at researchers. It uses our own fine-tuned ML models for validation and blockchain for transparency of sensitive medical records and images.",
      githubUrl: "https://github.com/coderman400/de-mesp",
    },
    {
      id: 6,
      title: "World News",
      image: newsImage,
      year: "2024",
      description:
        "A simple website that gathered news data from various sources around the world and filtered them by user's region choice to show relevant articles and additional information if needed.",
      githubUrl: "https://github.com/coderman400/news",
    },
  ];

  const projects2023 = [
    {
      id: 7,
      title: "Rock Paper Scissors",
      image: rockPaperScissorsImage,
      year: "2023",
      description:
        "A simple rock paper scissors game created purely with native JS and CSS animations while I was in my school years.",
      githubUrl: "https://github.com/coderman400/rockpaperscissors",
    },
  ];

  return (
    <div className="min-h-screen bg-[#ebebeb]">
      {/* Header Section */}
      <div className="flex justify-between items-start px-8 py-16">
        <div className="text-left">
          <p className="text-sm font-roobert uppercase tracking-wide">
            SELECTED WORKS I<br />
            HAVE DONE SINCE 2023
          </p>
        </div>

        <div className="text-center">
          <h1 className="text-8xl font-roxborough-italic">
            My<span className="font-roobert">Works</span>
          </h1>
        </div>

        <div className="text-right">
          <p className="text-sm font-roobert uppercase tracking-wide">
            HOLD AND DRAG
            <br />
            TO DISCOVER
          </p>
        </div>
      </div>

      {/* MenuBar Component */}
      <div className="border-t border-gray-300">
        <MenuBar onNavigate={onNavigate} showAnimation={true} />
      </div>

      {/* Horizontal Drag Scrolling Portfolio Section */}
      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div
          ref={contentRef}
          className="flex items-end gap-16 px-8 py-16"
          style={{
            width: "max-content",
            minWidth: "100%",
          }}
        >
          {/* 2025 Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-6xl font-roobert mb-8 self-start">2025</h2>
            <div className="flex gap-8">
              {projects2025.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <div className="w-72 h-52 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />
                  </div>
                  <div className="w-72 mt-4">
                    <p className="text-sm font-roobert font-medium">
                      {project.title}
                    </p>
                    <p className="text-sm font-roobert text-gray-600 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2024 Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-6xl font-roobert mb-8 self-start">2024</h2>
            <div className="flex gap-8">
              {projects2024.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <div className="w-72 h-52 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />
                  </div>
                  <div className="w-72 mt-4">
                    <p className="text-sm font-roobert font-medium">
                      {project.title}
                    </p>
                    <p className="text-sm font-roobert text-gray-600 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2023 Section */}
          <div className="flex flex-col items-start">
            <h2 className="text-6xl font-roobert mb-8 self-start">2023</h2>
            <div className="flex gap-8">
              {projects2023.map((project) => (
                <div
                  key={project.id}
                  className="group cursor-pointer"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <div className="w-72 h-52 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />
                  </div>
                  <div className="w-72 mt-4">
                    <p className="text-sm font-roobert font-medium">
                      {project.title}
                    </p>
                    <p className="text-sm font-roobert text-gray-600 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed bottom-8 left-8">
        <button
          onClick={async () => {
            if (onNavigate) {
              // Start the transition
              const transitionPromise = onNavigate();

              // Navigate to the homepage while the transition is happening
              setTimeout(() => {
                navigate("/");
              }, 400); // Navigate halfway through the transition

              // Wait for the transition to complete
              await transitionPromise;
            } else {
              // Direct navigation if no transition handler
              navigate("/");
            }
          }}
          className="px-6 py-3 bg-black text-white font-roobert rounded-full hover:bg-gray-800 transition-colors"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Works;
