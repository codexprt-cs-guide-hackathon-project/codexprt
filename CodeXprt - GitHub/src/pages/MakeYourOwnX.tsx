import React from 'react';
import { motion } from 'framer-motion';
import { Code2, ExternalLink, ArrowUpRight, Database, Box, Github as Git, Terminal, Globe, Brain, Monitor, Gamepad2 as GameController, Network, Cpu, TextCursor, Box as Container, Boxes as Blocks, Bot, Glasses, Box as Cube } from 'lucide-react';

const categoryColors = {
  "3D Graphics": "text-purple-600 dark:text-purple-400",
  "Augmented Reality": "text-pink-500 dark:text-pink-300",
  "Blockchain": "text-orange-500 dark:text-orange-300",
  "Bot": "text-blue-600 dark:text-blue-400",
  "Database": "text-green-600 dark:text-green-400",
  "Docker": "text-cyan-600 dark:text-cyan-400",
  "Emulator": "text-red-500 dark:text-red-300",
  "Front-end Framework": "text-indigo-600 dark:text-indigo-400",
  "Game": "text-rose-500 dark:text-rose-300",
  "Git": "text-orange-600 dark:text-orange-400",
  "Network Stack": "text-teal-600 dark:text-teal-400",
  "Neural Network": "text-violet-600 dark:text-violet-400",
  "Operating System": "text-blue-600 dark:text-blue-400",
  "Programming Language": "text-fuchsia-600 dark:text-fuchsia-400",
  "Shell": "text-amber-600 dark:text-amber-400",
  "Text Editor": "text-emerald-600 dark:text-emerald-400",
  "Virtual Machine": "text-sky-600 dark:text-sky-400",
  "Web Server": "text-lime-600 dark:text-lime-400"
};

const projects = [
  {
    title: "Build your own 3D Renderer",
    category: "3D Graphics",
    description: "Create a software-based 3D renderer and learn about computer graphics fundamentals.",
    url: "https://github.com/ssloy/tinyrenderer/wiki",
    icon: Cube
  },
  {
    title: "Build your own Augmented Reality",
    category: "Augmented Reality",
    description: "Develop an AR application and understand computer vision concepts.",
    url: "https://www.youtube.com/watch?v=uXNjNcqW4kY",
    icon: Glasses
  },
  {
    title: "Build your own Blockchain",
    category: "Blockchain",
    description: "Implement a basic blockchain and cryptocurrency from scratch.",
    url: "https://programmingblockchain.gitbook.io/programmingblockchain",
    icon: Blocks
  },
  {
    title: "Build your own Bot",
    category: "Bot",
    description: "Create automated bots for various platforms and learn about automation.",
    url: "https://www.fullstackpython.com/blog/build-first-slack-bot-python.html",
    icon: Bot
  },
  {
    title: "Build your own Database",
    category: "Database",
    description: "Create your own database engine and understand how data is stored and retrieved.",
    url: "https://build-your-own.org/redis/",
    icon: Database
  },
  {
    title: "Build your own Docker",
    category: "Docker",
    description: "Build a container system from scratch and understand containerization technology.",
    url: "https://www.youtube.com/watch?v=8fi7uSYlOdc",
    icon: Container
  },
  {
    title: "Build your own Emulator",
    category: "Emulator",
    description: "Create an emulator for retro gaming systems and learn about computer architecture.",
    url: "https://web.archive.org/web/20200121100942/https://blog.felixangell.com/virtual-machine-in-c/",
    icon: GameController
  },
  {
    title: "Build your own Front-end Framework",
    category: "Front-end Framework",
    description: "Create your own version of popular front-end frameworks like React.",
    url: "https://www.youtube.com/watch?v=_MAD4Oly9yg",
    icon: Code2
  },
  {
    title: "Build your own Game",
    category: "Game",
    description: "Develop your own video games and learn about game development concepts.",
    url: "https://www.youtube.com/watch?v=025QFeZfeyM",
    icon: GameController
  },
  {
    title: "Build your own Git",
    category: "Git",
    description: "Implement core Git functionalities and understand version control systems.",
    url: "https://wyag.thb.lt/",
    icon: Git
  },
  {
    title: "Build your own Network Stack",
    category: "Network Stack",
    description: "Create your own networking stack and understand internet protocols.",
    url: "https://github.com/codecrafters-io/build-your-own-x#build-your-own-network-stack",
    icon: Network
  },
  {
    title: "Build your own Neural Network",
    category: "Neural Network",
    description: "Create a neural network from scratch and understand machine learning fundamentals.",
    url: "https://www.saminiir.com/lets-code-tcp-ip-stack-1-ethernet-arp/",
    icon: Brain
  },
  {
    title: "Build your own Operating System",
    category: "Operating System",
    description: "Create a basic operating system and learn about system programming.",
    url: "https://tuhdo.github.io/os01/",
    icon: Monitor
  },
  {
    title: "Build your own Programming Language",
    category: "Programming Language",
    description: "Create your own programming language and understand language design.",
    url: "https://www.buildyourownlisp.com/",
    icon: Code2
  },
  {
    title: "Build your own Shell",
    category: "Shell",
    description: "Implement a command-line shell and learn about process management.",
    url: "https://brennan.io/2015/01/16/write-a-shell-in-c/",
    icon: Terminal
  },
  {
    title: "Build your own Text Editor",
    category: "Text Editor",
    description: "Create your own text editor and understand how editors work.",
    url: "https://www.fltk.org/doc-1.1/editor.html",
    icon: TextCursor
  },
  {
    title: "Build your own Virtual Machine",
    category: "Virtual Machine",
    description: "Build a virtual machine and understand computer architecture.",
    url: "https://imrannazar.com/GameBoy-Emulation-in-JavaScript",
    icon: Cpu
  },
  {
    title: "Build your own Web Server",
    category: "Web Server",
    description: "Create your own web server and understand HTTP protocols.",
    url: "https://aosabook.org/en/500L/a-simple-web-server.html",
    icon: Globe
  }
];

function MakeYourOwnX() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Create Your Own X
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Dive into the world of programming by building your own versions of the tools we use every day.
              Learn by doing - create everything from databases to operating systems. Build projects that
              showcase your skills and make you stand out to potential employers.
            </p>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              category={project.category}
              description={project.description}
              url={project.url}
              Icon={project.icon}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ title, category, description, url, Icon }) {
  return (
    <div className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium px-3 py-1 rounded-full">
            <span className={categoryColors[category]}>{category}</span>
          </span>
          <Icon className={`h-6 w-6 ${categoryColors[category]}`} />
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
        >
          Learn More <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>
    </div>
  );
}

export default MakeYourOwnX;
