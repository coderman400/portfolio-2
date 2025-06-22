import React from "react";
import Lottie from "lottie-react";
import homeLoopAnimation from "../assets/HomeLoop.json";
import homeDropAnimation from "../assets/HomeDrop.json";
import diamond from "../assets/diamond.png";
const Landing = () => {
  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-[14rem] font-bold ">
        <span className="font-dianora mr-3">Arvind</span>
        <span className=" text-[12rem] font-saprona">Babu</span>
      </h1>
      <div className="w-full text-center">THIS IS THE MENU BAR</div>
      <div className="grid grid-cols-3 w-full">
        <div className="flex flex-col p-10 items-center justify-center">
          <img src={diamond} className="w-12 h-12"></img>
          <p className="font-saprona text-lg">
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
          <p className="font-saprona text-lg">
            I also do web design, digital art and a whole lot of other things.
            Let's talk and see what we can create together!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
