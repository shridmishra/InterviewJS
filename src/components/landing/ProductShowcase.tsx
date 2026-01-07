'use client';
import Image from "next/image";
import pyramidImage from "@/assets/pyramid.png";
import tubeImage from "@/assets/tube.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ProductImage from '@/assets/product-image.png';
import ProductImageDark from '@/assets/product-image-dark.png';
import { useTheme } from "next-themes";

export const ProductShowcase = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const { theme, resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || theme;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const src = mounted && currentTheme === 'dark' ? ProductImageDark : ProductImage;

  return <section ref={sectionRef} className="pt-20 pb-10 sm:pt-32 bg-linear-to-b from-white to-[#fefce8] dark:from-black dark:to-[#1a202c] overflow-x-clip">
    <div className="container">
      <div className="">
        <div className=" md:mx-28 lg:mx-44 flex flex-col  items-center text-center">

          <div className="tag" >Master Technical Skills</div>
          <h2 className="text-3xl lg:text-7xl bg-linear-to-b from-black to-[#733e0a] dark:from-white dark:to-[#fff085] text-transparent bg-clip-text font-bold tracking-tighter mt-6 leading-normal">Learn by Doing</h2>
          <p className="sub-heading">The best way to learn to code is by solving challenges and building projects. Our platform provides a curated set of problems to help you master various topics.</p>
        </div>

        <div className="relative mt-10 sm:mt-20">
          <Image src={src} alt="Interview JS Product Showcase" className="mx-auto w-full max-w-7xl rounded-lg " />
          <motion.img src={pyramidImage.src} alt="Pyramid Shape" height={200} width={200} className=" hidden md:block md:absolute -top-24 -right-10" style={{ translateY }} />
          <motion.img src={tubeImage.src} alt="Tube Shape" height={180} width={180} className="hidden md:block md:absolute bottom-40 left-0" style={{ translateY }} />
        </div>

      </div>

    </div>

  </section>;
};