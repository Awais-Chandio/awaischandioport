"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Flutter</li>
        <li>Dart  </li>
        <li>Flutter Flow</li>
        <li>Firebase</li>
        <li>HTML, CSS JavaScript
        </li>
        <li>WordPress</li>
        <li>Content Writing</li>
        <li>API Integration Effectively</li>
        <li>MS word excel and Power</li>
        <li>Canva Expert</li>
        <li>Java</li>
        <li>C++</li>
        <li>DataBase system</li>
        
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
          <li>MEHRAN UNIVERSITY JAMSHORO
Bachelor of Software
Engineering
GPA: 3.1 / 4.0
</li>
<li>UB DEGREE COLLAGE DADU
Intermediate in PE Grade : A
2018-2020</li>
      </ul>
    ),
  },
  {
    title: "Experiences",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
       <li>Internship Alerts NOV 2022 -- DEC 2022
Flutter Developer Intern
Developed the frontend for various mobile applications, focusing on user-friendly
design.
Led the project for building a complete Learning Management System (LMS) for
students</li>
<li>NFTP(National freelancing Program) | Jamshoro MAY 2022 - JULY2022
Content Writer
During my internship at NFTP, I refined my content writing abilities while working in a
dynamic and collaborative setting. Collaborating closely with industry professionals,..
This opportunity not only expanded my practical knowledge but also prepared me to
adapt swiftly to industry demands, strengthening my ability to deliver quality content
efficiently</li>
<li>Bidbuy Start up JUNE-2021 - JULY-2021
Flutter Developer
Developed a cross-platform mobile app using Flutter for Bidbuy, a startup focused on
digital bidding and e-commerce.
Integrated Firebase for real-time data synchronization and user authentication.
Implemented responsive UI using Flutter widgets, ensuring optimal performance
across Android and iOS platforms.</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          width={500}
          height={500}
          alt="A description of the image"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
  As a skilled Flutter Developer with expertise in Dart, Firebase, REST APIs, and Flutter Flow, I specialize in creating robust and visually appealing cross-platform mobile applications. I excel at developing modern, scalable solutions tailored to client needs, ensuring optimal performance on both Android and iOS. Additionally, I leverage Flutter&apos;s rich UI frameworks to craft attractive, responsive, and user-friendly apps that seamlessly blend functionality with design, leaving a lasting impression. My freelancing experience has honed my ability to innovate, solve complex problems, and consistently deliver impactful results in mobile app development.
</p>

          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              Skills
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              Education
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              Certifications
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
