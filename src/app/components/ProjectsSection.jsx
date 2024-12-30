"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "ShopEase",
    description: "Flutter E-Commerce Application",
    image: "/images/projects/1.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/ShopEase",
    previewUrl: "https://github.com/Awais-Chandio/ShopEase",
  },
  {
    id: 2,
    title: "ShopEase",
    description: "Flutter E-Commerce Application",
    image: "/images/projects/2.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/ShopEase",
    previewUrl: "https://github.com/Awais-Chandio/ShopEase",
  },
  {
    id: 3,
    title: "ShopEase",
    description: "Flutter E-Commerce Application",
    image: "/images/projects/3.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/ShopEase",
    previewUrl: "https://github.com/Awais-Chandio/ShopEase",
  },
  {
    id: 4,
    title: "ShopEase",
    description: "Flutter E-Commerce Application",
    image: "/images/projects/4.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/ShopEase",
    previewUrl: "https://github.com/Awais-Chandio/ShopEase",
  },
  {
    id: 5,
    title: "Medical App",
    description: "Flutter Medical Mobile Application",
    image: "/images/projects/5.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/MadProject",
    previewUrl: "https://github.com/Awais-Chandio/MadProject",
  },
  {
    id: 6,
    title: "Medical App",
    description: "Flutter Medical Mobile Application",
    image: "/images/projects/6.png",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/MadProject",
    previewUrl: "https://github.com/Awais-Chandio/MadProject",
  },
  {
    id: 7,
    title: "Bidubuyy application",
    description: "It is a bidding application made on Flutter",
    image: "/images/projects/7.jpeg",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/BidBuyy",
    previewUrl: "https://github.com/Awais-Chandio/BidBuyy",
  },
  {
    id: 8,
    title: "Bidubuyy application",
    description: "It is a bidding application made on Flutter",
    image: "/images/projects/8.jpeg",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/BidBuyy",
    previewUrl: "https://github.com/Awais-Chandio/BidBuyy",
  },
  {
    id: 9,
    title: "Workout Applications",
    description: "Workout Applications Made on Flutter",
    image: "/images/projects/9.jpeg",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/Workout-Application",
    previewUrl: "https://github.com/Awais-Chandio/Workout-Application",
  },
  {
    id: 10,
    title: "Workout Applications",
    description: "Workout Applications Made on Flutter",
    image: "/images/projects/10.jpeg",
    tag: ["All", "Mobile Applications"],
    gitUrl: "https://github.com/Awais-Chandio/Workout-Application",
    previewUrl: "https://github.com/Awais-Chandio/Workout-Application",
  },
  // {
  //   id: 11,
  //   title: "Covid-19-Tracker-App",
  //   description: "Covid-19-Tracker-App Made on Flutter",
  //   image: "Covid-19-Tracker-App.jpg",
  //   tag: ["All", "Mobile Applications"],
  //   gitUrl: "https://github.com/Awais-Chandio/Flutter-Covid-19-Tracker-App",
  //   previewUrl: "https://github.com/Awais-Chandio/Flutter-Covid-19-Tracker-App",
  // },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile Applications"
          isSelected={tag === "Mobile Applications"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
