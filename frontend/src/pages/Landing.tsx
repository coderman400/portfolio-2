import React from "react";
import Lottie from "lottie-react";
import homeLoopAnimation from "../assets/HomeLoop.json";
import homeDropAnimation from "../assets/HomeDrop.json";
import diamond from "../assets/diamond.png";
import MenuBar from "../components/MenuBar";

interface LandingProps {
  onNavigate?: () => Promise<void>;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-[14rem] font-bold ">
        <span className="font-roxborough-italic mr-3">Arvind</span>
        <span className=" text-[12rem] font-roobert">Babu</span>
      </h1>
      <MenuBar onNavigate={onNavigate} showAnimation={true} />
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
