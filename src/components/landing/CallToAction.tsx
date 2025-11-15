"use client"
import ArrowIcon from "@/assets/arrow-right.svg";
import springImage from "@/assets/spring.png";
import starImage from "@/assets/star.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export const CallToAction = () => {
  const ctaRef = useRef(null);
    const router = useRouter();
    const handleNavigate = (page: string) => {
      router.push(`/${page}`);
    };

  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150])


  return <section ref={ctaRef} className="py-24 bg-linear-to-b from-white to-[#fefce8] dark:from-black dark:to-[#1a202c] overflow-x-clip relative">
    <div className="container">
      <div className="flex flex-col items-center justify-center text-center lg:mx-44">
        <h2 className="heading gradient-text">Sign up for free today</h2>
        <p className="sub-heading">Start your journey to JavaScript mastery. Sign up for free and get instant access to our challenges and quizzes.</p>
        <div className="mt-10">
          <button className="btn btn-primary bg-foreground" onClick={() => handleNavigate('challenges')}>Get started</button>
          <button className="btn btn-text gap-2" onClick={() => handleNavigate('challenges')}><span>Learn more</span><ArrowIcon className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
    <motion.img src={springImage.src} width={360} alt="Spring Shape" className=" hidden lg:block  absolute top-20 right-20" style={{translateY}} />
    <motion.img src={starImage.src} width={360} alt="Star Shape" className="hidden lg:block absolute top-0 left-8" style={{translateY}}/>
  </section>;
};
