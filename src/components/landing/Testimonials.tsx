"use client"
import avatar1 from "@/assets/images/avatars/avatar-1.png";
import avatar2 from "@/assets/images/avatars/avatar-2.png";
import avatar3 from "@/assets/images/avatars/avatar-3.png";
import avatar4 from "@/assets/images/avatars/avatar-4.png";
import avatar5 from "@/assets/images/avatars/avatar-5.png";
import avatar6 from "@/assets/images/avatars/avatar-6.png";
import avatar7 from "@/assets/images/avatars/avatar-7.png";
import avatar8 from "@/assets/images/avatars/avatar-8.png";
import avatar9 from "@/assets/images/avatars/avatar-9.png";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: "The challenges on this platform are top-notch. They've helped me solidify my understanding of core coding concepts.",
    imageSrc: avatar1.src,
    name: "Sarah L.",
    username: "@sarahdev",
  },
  {
    text: "I love the quiz feature! It's a fun and quick way to test my knowledge and identify areas for improvement.",
    imageSrc: avatar2.src,
    name: "Mike P.",
    username: "@mikep_codes",
  },
  {
    text: "As a beginner, I found the progressive difficulty of the challenges to be perfect. I never felt overwhelmed.",
    imageSrc: avatar3.src,
    name: "Emily R.",
    username: "@emily_codes",
  },
  {
    text: "This platform has been a great supplement to my bootcamp curriculum. The hands-on practice is invaluable.",
    imageSrc: avatar4.src,
    name: "Chris T.",
    username: "@christ_dev",
  },
  {
    text: "I finally landed my first developer job, and I owe a big part of it to the skills I gained on this platform.",
    imageSrc: avatar5.src,
    name: "Jessica M.",
    username: "@jess_makes_apps",
  },
  {
    text: "The community aspect is fantastic. It's great to be able to discuss solutions and learn from others.",
    imageSrc: avatar6.src,
    name: "David K.",
    username: "@david_codes",
  },
  {
    text: "I've been a developer for years, but this platform helped me brush up on the latest features and patterns.",
    imageSrc: avatar7.src,
    name: "Maria G.",
    username: "@mariacodes",
  },
  {
    text: "The code editor is clean and easy to use. I love that I can practice right in the browser.",
    imageSrc: avatar8.src,
    name: "Tom H.",
    username: "@tom_the_dev",
  },
  {
    text: "The progress tracking is super motivating. It's rewarding to see how far I've come.",
    imageSrc: avatar9.src,
    name: "Linda S.",
    username: "@lindas_codes",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialColumns = (props: {
  className?: string;
  duration?: number;
  testimonials: typeof testimonials;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{ translateY: "-50%" }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6"
    >
      {[...new Array(2)].fill(0).map((_, outerIndex) => (
        <React.Fragment key={outerIndex}>
          {props.testimonials.map(({ text, imageSrc, name, username }) => (
            <div key={name} className="card">
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="tracking-tight leading-5">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return <section className="py-24 bg-white dark:bg-black">
    <div className="container">
      <div className="flex flex-col justify-center items-center text-center lg:mx-44">
        <div className="tag">Testimonial</div>
        <h2 className="text-3xl lg:text-7xl font-bold tracking-tighter bg-linear-to-b from-black to-[#733e0a] dark:from-white dark:to-[#fff085] text-transparent bg-clip-text leading-tight mt-6 py-2">What our learners say</h2>
        <p className="sub-heading mt-5">Hear from our community of learners who have leveled up their technical skills with our platform.</p>
      </div>

      <div className="flex justify-center gap-6 mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] mt-10 max-h-[738px] overflow-hidden">
        <TestimonialColumns testimonials={firstColumn} duration={17} />
        <TestimonialColumns testimonials={secondColumn} className="hidden md:block" duration={17} />
        <TestimonialColumns testimonials={thirdColumn} className="hidden lg:block" duration={17} />

      </div>
    </div>



  </section>
};
