import imageAISpaceTelescope from '@image/ai-space-telescope1.jpg';
import imageBookmarkLabeller from '@image/bookmark-labeller.jpg';
import imageBSplit from '@image/card-bsplit.jpg';
import imageCaveExploration from '@image/card-cave-exploration.jpg';
import imageCavernMinesweeper from '@image/card-cavern-minesweeper.jpg';
import imageDeliveryPlanner from '@image/card-delivery-route-planner.jpg';
import imageGraphVisualiser from '@image/card-graph-algorithm-visualiser.jpg';
import imageLucidLab from '@image/card-lucidlab.jpg';
import imagePortfolio from '@image/card-portfolio.jpg';
import imageReactMinesweeper from '@image/card-react-minesweeper.jpg';
import imageRollerCoaster from '@image/card-roller-coaster.jpg';
import imageRSCBot from '@image/card-rscbot.jpg';
import imageSortingVisualiser from '@image/card-sorting-algorithm-visualiser.jpg';
import imageSudoku from '@image/card-sudoku.jpg';
import imageToDoList from '@image/card-todo.jpg';
import imageURLShortener from '@image/card-url-shortener.jpg';
import CPlusPlusLogo from '@image/skill/cplusplus.svg';
import CSharpLogo from '@image/skill/csharp.svg';
import JavaScriptLogo from '@image/skill/javascript.svg';
import PythonLogo from '@image/skill/python.svg';
import ReactLogo from '@image/skill/react.svg';
import RubyLogo from '@image/skill/ruby.svg';
import TypeScriptLogo from '@image/skill/typescript.svg';

import { Project } from './types';

export const getProjectData = (projectKey: string) => {
  return projects.find((project) => project.id === projectKey) as Project;
};

enum ProjectFilter {
  CPLUSPLUS = 'C++',
  CSHARP = 'C#',
  GROUP_PROJECT = 'Group Projects',
  JAVASCRIPT = 'JavaScript',
  PHP = 'PHP',
  PUZZLE = 'Games/Puzzles',
  PYTHON = 'Python',
  REACT = 'React',
  SQL = 'SQL',
  WEB = 'Web',
}

const logos = {
  typescript: {
    src: TypeScriptLogo,
    alt: 'TypeScript Logo',
  },
  javascript: {
    src: JavaScriptLogo,
    alt: 'JavaScript Logo',
  },
  python: {
    src: PythonLogo,
    alt: 'Python Logo',
  },
  react: {
    src: ReactLogo,
    alt: 'React Logo',
  },
  ruby: {
    src: RubyLogo,
    alt: 'Ruby Logo',
  },
  cplusplus: {
    src: CPlusPlusLogo,
    alt: 'C++ Logo',
  },
  csharp: {
    src: CSharpLogo,
    alt: 'C# Logo',
  },
};

export const projects: Project[] = [
  {
    id: 'ai-space-telescope',
    title: 'AI Space Telescope',
    date: {
      start: {
        month: 11,
        year: 2022,
      },
    },
    image: imageAISpaceTelescope,
    alt: 'AI Space Telescope Website',
    link: '/projects/ai-space-telescope',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.REACT, ProjectFilter.WEB],
    description:
      'Embark on a cosmic journey through a captivating image gallery, where the realm of science fiction comes to life, courtesy of the extraordinary DALL·E 2 API. Every image in this curated collection represents a handpicked selection of my personal favourites, each a testament to the boundless creativity of AI-generated artistry.',
    github: 'https://github.com/KyleGough/ai-space-telescope',
    skills: ['React', 'Typescript', 'TailwindCSS'],
    logo: logos.typescript,
    liveLink: 'https://ai-space-telescope.com',
  },
  {
    id: 'bookmark-labeller',
    title: 'Bookmark Labeller',
    date: {
      start: {
        month: 10,
        year: 2022,
      },
    },
    image: imageBookmarkLabeller,
    alt: 'Bookmark Labeller Popup',
    link: '/projects/bookmark-labeller',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      'Firefox browser extension that brings a touch of personalization to your bookmarks. This lightweight and minimalist tool empowers you to effortlessly label your bookmarks with your favorite emojis, adding a fun and visual twist to your browsing experience.',
    github: 'https://github.com/KyleGough/bookmark-labeller-extension',
    skills: ['JavaScript', 'WebExtensions API', 'HTML', 'CSS'],
    logo: logos.javascript,
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    date: {
      start: {
        month: 12,
        year: 2016,
      },
      end: {
        month: 11,
        year: 2022,
      },
    },
    image: imagePortfolio,
    alt: 'Portfolio',
    link: '/projects/portfolio',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.REACT, ProjectFilter.WEB],
    description:
      "Dynamic showcase of my evolving journey as a front-end engineer. Here, you'll find a curated collection of my projects and a glimpse into my ever-expanding technical repertoire.",
    github: 'https://github.com/KyleGough/portfolio',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'TailwindCSS',
      'HTML',
      'CSS',
      'Jest',
      'Cypress',
    ],
    logo: logos.typescript,
  },
  {
    id: 'lucidlab',
    title: 'LucidLab',
    subtitle: "Master's Group Project",
    date: {
      start: {
        month: 10,
        year: 2019,
      },
      end: {
        month: 5,
        year: 2020,
      },
    },
    image: imageLucidLab,
    alt: 'LucidLab',
    link: '/projects/lucidlab',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.PYTHON,
      ProjectFilter.REACT,
      ProjectFilter.SQL,
      ProjectFilter.GROUP_PROJECT,
      ProjectFilter.WEB,
    ],
    description:
      'An adaptable, heterogeneous IoT testbed, where I took the lead in developing the front-end user interface. This user-friendly platform empowers registered users to seamlessly upload, configure, and deploy tests and images on the testbed, all at their fingertips.',
    skills: [
      'React',
      'JavaScript',
      'Materialize',
      'HTML',
      'CSS',
      'Python',
      'Shell',
      'C',
      'SQL',
    ],
    logo: logos.javascript,
  },
  {
    id: 'sudoku',
    title: 'Logical Sudoku Solver',
    date: {
      start: {
        month: 11,
        year: 2019,
      },
      end: {
        month: 1,
        year: 2020,
      },
    },
    image: imageSudoku,
    alt: 'Logical sudoku solver',
    link: '/projects/sudoku',
    filters: [ProjectFilter.PYTHON, ProjectFilter.PUZZLE],
    description:
      'A powerful algorithmic tool designed to conquer even the most challenging Sudoku puzzles without resorting to brute force, guessing, or backtracking. This solver showcases a refined approach to puzzle solving, providing users with detailed insights at every step.',
    github: 'https://github.com/KyleGough/sudoku',
    skills: ['Python'],
    logo: logos.python,
  },
  {
    id: 'react-minesweeper',
    title: 'React Minesweeper',
    date: {
      start: {
        month: 10,
        year: 2019,
      },
    },
    image: imageReactMinesweeper,
    alt: 'React Minesweeper',
    link: '/projects/react-minesweeper',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.REACT,
      ProjectFilter.PUZZLE,
      ProjectFilter.WEB,
    ],
    description:
      'Step back in time and relive the classic Minesweeper experience with this faithful clone, meticulously crafted in React. Featuring an 18x18 game board, it offers all the elements you love about the original game and more.',
    github: 'https://github.com/KyleGough/react-minesweeper',
    skills: ['React', 'JavaScript', 'CSS', 'Materialize'],
    logo: logos.react,
  },
  {
    id: 'cave-exploration',
    title: 'Using Swarm AI to Map a Cave Network',
    subtitle: 'Dissertation',
    date: {
      start: {
        month: 12,
        year: 2018,
      },
      end: {
        month: 4,
        year: 2019,
      },
    },
    image: imageCaveExploration,
    alt: 'Cave Exploration',
    link: '/projects/cave-exploration',
    filters: [ProjectFilter.CPLUSPLUS],
    description:
      'Cave exploration is dangerous and time-consuming. This project demonstrates how swarm AI could be used in a group of autonomous flying drones to navigate and explore a cave as efficiently as possible. The project also includes random, realistic cave environment generation.',
    github: 'https://github.com/KyleGough/CS310-Dissertation',
    skills: ['C++', 'GLUT'],
    logo: logos.cplusplus,
  },
  {
    id: 'roller-coaster',
    title: 'Roller Coaster',
    subtitle: 'Computer Graphics Coursework',
    date: {
      start: {
        month: 12,
        year: 2018,
      },
      end: {
        month: 1,
        year: 2019,
      },
    },
    image: imageRollerCoaster,
    alt: 'Roller coaster',
    link: '/projects/roller-coaster',
    filters: [ProjectFilter.CPLUSPLUS],
    description:
      'Simulation of a 3-car roller coaster which traverses a small looped track featuring a lift hill, drop, loop-the-loop and turns. The coaster can be viewed from a first-person perspective in each of the carts, as well as additional views that track the carts round the track.',
    skills: ['C++', 'GLUT'],
    logo: logos.cplusplus,
  },
  {
    id: 'rscbot',
    title: 'RSCBot',
    subtitle: 'Software Engineering Group Project',
    date: {
      start: {
        month: 2,
        year: 2018,
      },
      end: {
        month: 3,
        year: 2019,
      },
    },
    image: imageRSCBot,
    alt: 'RSCBot',
    link: '/projects/rscbot',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.PHP,
      ProjectFilter.SQL,
      ProjectFilter.GROUP_PROJECT,
      ProjectFilter.WEB,
    ],
    description:
      "A specialised, personalisable trader chatbot that can fetch data and current news on financial stocks and sectors from the FTSE 100 index. RSCBot communicates with the user in a natural way, and has been designed to identify and adapt to the user's main interests in the stock market, making for a more personal trading experience.",
    skills: [
      'JavaScript',
      'jQuery',
      'HTML',
      'CSS',
      'Materialize',
      'PHP',
      'SQL',
    ],
    logo: logos.javascript,
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    date: {
      start: {
        month: 4,
        year: 2017,
      },
    },
    image: imageURLShortener,
    alt: 'URL shortener',
    link: '/projects/url-shortener',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      'Simple yet powerful URL shortening tool that is designed to simplify link management while ensuring efficient and reliable shortening. The project marks my debut in harnessing the capabilities of Node.js, Express.js, and MongoDB to create a seamless user experience.',
    skills: ['JavaScript', 'MongoDB', 'jQuery', 'HTML', 'CSS', 'Materialize'],
    logo: logos.javascript,
  },
  {
    id: 'graph-algorithm-visualiser',
    title: 'Graph Algorithm Visualiser',
    date: {
      start: {
        month: 4,
        year: 2017,
      },
    },
    image: imageGraphVisualiser,
    alt: 'Graph algorithm visualiser',
    link: '/projects/graph-algorithm-visualiser',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      'Dive into the captivating world of graph algorithms with a web application, designed to provide a visual and interactive experience. Explore the intricate elegance of algorithms on randomised nodes, offering an illuminating understanding of their real-world applications.',
    github: 'https://github.com/KyleGough/graph-algorithm-visualiser',
    skills: ['JavaScript', 'Materialize'],
    logo: logos.javascript,
    liveLink: 'https://kylegough.github.io/graph-algorithm-visualiser/',
  },
  {
    id: 'cavern-minesweeper',
    title: 'Cavern Minesweeper',
    date: {
      start: {
        month: 3,
        year: 2017,
      },
    },
    image: imageCavernMinesweeper,
    alt: 'Cavern Minesweeper',
    link: '/projects/cavern-minesweeper',
    filters: [ProjectFilter.PUZZLE],
    description:
      'Cavern Minesweeper takes the classic Minesweeper game to new depths, introducing tiered mines (ores) that add an exciting twist to your mining adventure. You must strategically uncover enough squares to reach the required mining level. With three challenging difficulty levels, Cavern Minesweeper offers competitive players an exhilarating test of their skills.',
    github: 'https://github.com/KyleGough/cavern-minesweeper',
    skills: ['Ruby'],
    logo: logos.ruby,
  },
  {
    id: 'bsplit',
    title: 'BSplit',
    subtitle: 'Web Development Technologies Coursework',
    date: {
      start: {
        month: 2,
        year: 2017,
      },
      end: {
        month: 3,
        year: 2017,
      },
    },
    image: imageBSplit,
    alt: 'BSplit',
    link: '/projects/bsplit',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.PHP,
      ProjectFilter.SQL,
      ProjectFilter.WEB,
    ],
    description:
      'Meet BSplit, your all-in-one web application designed to simplify the process of splitting bills and settling payments among friends and housemates. With user-friendly features and a commitment to enhancing the user experience, BSplit makes managing shared expenses a breeze.',
    skills: ['PHP', 'JavaScript', 'jQuery', 'SQL', 'HTML', 'CSS', 'Bootstrap'],
    logo: logos.javascript,
  },
  {
    id: 'todo-list',
    title: 'To Do List',
    subtitle: 'Web Development Technologies Lab Work',
    date: {
      start: {
        month: 1,
        year: 2017,
      },
      end: {
        month: 2,
        year: 2017,
      },
    },
    image: imageToDoList,
    alt: 'To Do List',
    link: '/projects/todo-list',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.PHP,
      ProjectFilter.SQL,
      ProjectFilter.GROUP_PROJECT,
      ProjectFilter.WEB,
    ],
    description:
      'Web application that empowers users to efficiently manage their tasks and to-do lists. This project was an educational journey in which I acquired proficiency in PHP and SQL to implement secure data storage and retrieval, safeguarding the application against SQL injection and cross-site scripting vulnerabilities.',
    skills: ['PHP', 'JavaScript', 'jQuery', 'SQL', 'HTML', 'CSS'],
    logo: logos.javascript,
  },
  {
    id: 'delivery-route-planner',
    title: 'Delivery Route Planner',
    subtitle: 'A-Level Computing Coursework',
    date: {
      start: {
        month: 12,
        year: 2015,
      },
      end: {
        month: 3,
        year: 2016,
      },
    },
    image: imageDeliveryPlanner,
    alt: 'Delivery route planner',
    link: '/projects/delivery-route-planner',
    filters: [ProjectFilter.CSHARP],
    description:
      'Delivery route planner designed for efficiency and precision. Seamlessly links multiple delivery locations, minimising travel time and maximising resource utilisation. Gain comprehensive insights with detailed reports that illuminate the delivery route, item inclusions, and estimated time of arrival.',
    skills: ['C#', 'SQL'],
    logo: logos.csharp,
  },
  {
    id: 'sorting-algorithm-visualiser',
    title: 'Sorting Algorithm Visualiser',
    date: {
      start: {
        month: 9,
        year: 2015,
      },
      end: {
        month: 11,
        year: 2015,
      },
    },
    image: imageSortingVisualiser,
    alt: 'Sorting Algorithm Visualiser',
    link: '/projects/sorting-algorithm-visualiser',
    filters: [ProjectFilter.CSHARP],
    description:
      "Journey into the mesmerizing world of data sorting with a visualisation tool designed to demystify the intricate sorting process. This versatile platform empowers you to not only witness but deeply understand how data transforms when processed by sorting algorithms. Featuring a vast array of options and capabilities, it's your gateway to exploring the fascinating realm of data organisation.",
    skills: ['C#'],
    logo: logos.csharp,
  },
];
