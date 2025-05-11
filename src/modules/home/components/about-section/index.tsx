"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Button } from "@medusajs/ui";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "black",
    color: "white",
  });

  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);
  const text5Ref = useRef(null);

  useEffect(() => {
    // Animate body background and text color
    gsap.to(document.body, {
      backgroundColor: inView ? "#000000" : "#FBFEFC",
      color: inView ? "#FBFEFC" : "black",
      duration: 1,
      ease: "power3.out",
    });

    setButtonStyle({
      backgroundColor: inView ? "white" : "#000000",
      color: inView ? "black" : "#ffffff",
    });
  }, [inView]);

  useEffect(() => {
    const animations = [
      {
        ref: text1Ref,
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
      },
      {
        ref: text2Ref,
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0 },
      },
      {
        ref: text3Ref,
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0 },
      },
      {
        ref: text4Ref,
        from: { opacity: 0, y: -50 },
        to: { opacity: 1, y: 0 },
      },
      {
        ref: text5Ref,
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0 },
      },
    ];

    animations.forEach(({ ref, from, to }) => {
      gsap.fromTo(ref.current, from, {
        ...to,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "top 10%",
          toggleActions: "play none none reset",
        },
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      className="about-section h-[700px] md:h-[700px] lg:h-[900px] w-full overflow-hidden flex flex-col items-center relative"
    >
      <div className="z-20 font-poppins text-[70px] w-full text-center font-bold uppercase absolute top-[10%] flex flex-col">
        <p
          ref={text5Ref}
          className="text-[70px] lg:text-[94px] font-poppins italic font-black"
        >
          /JC BLADES
        </p>
        <div className="gap-4 flex flex-col items-center justify-center">
          <div className="text-[20px] lg:text-[80px]">
            <h1 ref={text1Ref}>
              a knifemaker in{" "}
              <b className="text-[34px] italic">DAVAO CITY</b>
            </h1>
          </div>
          <div className="text-[30px] lg:text-[80px] font-light">
            <h1 ref={text2Ref}>
              <b className="font-black text-[40px]">Designing</b>{" "}
              <b className="italic font-extralight">high-quality,</b>
            </h1>
          </div>
          <div className="text-[30px] lg:text-[80px] font-light">
            <h1 ref={text3Ref} className="italic font-extralight">
              curiosity-sparking knives.
            </h1>
          </div>
          <div>
            <LocalizedClientLink href="/about">
              <Button
                ref={text4Ref}
                variant="transparent"
                className="rounded-none px-10 py-4 uppercase text-black bg-white border hover:bg-black hover:text-white hover:border-white"
              >
                ABOUT ME
              </Button>
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
