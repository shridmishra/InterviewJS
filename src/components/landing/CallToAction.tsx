"use client"
import ArrowIcon from "@/assets/icons/arrow-right.svg";
import springImage from "@/assets/images/illustrations/spring.png";
import starImage from "@/assets/images/illustrations/star.png";
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
        <h2 className="text-3xl lg:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#733e0a] dark:from-white dark:to-[#fff085] text-transparent bg-clip-text leading-tight mt-6">Sign up for free today</h2>
        <p className="sub-heading">Start your journey to technical mastery. Sign up for free and get instant access to our challenges and quizzes.</p>
        <div className="mt-10">
          <button className="btn btn-primary bg-foreground text-background" onClick={() => handleNavigate('topics')}>Get started</button>
          <button className="btn btn-text gap-2" onClick={() => handleNavigate('topics')}><span>Learn more</span><ArrowIcon className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
    <motion.img src={springImage.src} width={360} alt="Spring Shape" className=" hidden lg:block  absolute top-20 right-20" style={{ translateY }} />
    <motion.img src={starImage.src} width={360} alt="Star Shape" className="hidden lg:block absolute top-0 left-8" style={{ translateY }} />
  </section>;
};
