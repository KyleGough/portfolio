import { Project } from './types';

export const getProjectData = (projectKey: string) => {
  return projects.find((project) => project.id === projectKey) as Project;
};

enum ProjectFilter {
  REACT = 'React',
  JAVASCRIPT = 'JavaScript',
  WEB = 'Web',
  PYTHON = 'Python',
  SQL = 'SQL',
  GROUP_PROJECT = 'Group Projects',
  PUZZLE = 'Games/Puzzles',
  CPLUSPLUS = 'C++',
  PHP = 'PHP',
  CSHARP = 'C#',
}

const TypeScriptLogo = {
  src: '/img/typescript.svg',
  alt: 'TypeScript Logo',
};

const JavaScriptLogo = {
  src: '/img/javascript.svg',
  alt: 'JavaScript Logo',
};

const PythonLogo = {
  src: '/img/python.svg',
  alt: 'Python Logo',
};

const ReactLogo = {
  src: '/img/react.svg',
  alt: 'React Logo',
};

const RubyLogo = {
  src: '/img/ruby.svg',
  alt: 'Ruby Logo',
};

const CPlusPlusLogo = {
  src: '/img/cplusplus.svg',
  alt: 'C++ Logo',
};

const CSharpLogo = {
  src: '/img/csharp.svg',
  alt: 'C# Logo',
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
    src: 'img/ai-space-telescope1.jpg',
    alt: 'AI Space Telescope Website',
    link: '/projects/ai-space-telescope',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.REACT, ProjectFilter.WEB],
    description:
      'Gallery of science-fiction themed images generated using the amazing DALL·E 2 API. These pictures are a hand-picked selection of my favourite generated images.',
    github: 'https://github.com/KyleGough/ai-space-telescope',
    skills: {
      active: ['React', 'Typescript', 'TailwindCSS'],
    },
    logo: TypeScriptLogo,
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
    src: 'img/bookmark-labeller.jpg',
    alt: 'Bookmark Labeller Popup',
    link: '/projects/bookmark-labeller',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      'Bookmark Labeller is a lightweight and minimalistic Firefox browser extension that allows you to label bookmarks with your favourite emojis. The extension comes with 9 default emojis which can be customised. Use the action button to select emojis or right-click bookmarks to add emojis with the context menu.',
    github: 'https://github.com/KyleGough/bookmark-labeller-extension',
    skills: {
      active: ['JavaScript', 'WebExtensions API', 'HTML', 'CSS'],
    },
    logo: JavaScriptLogo,
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
        month: 10,
        year: 2022,
      },
    },
    src: '/img/card-portfolio.jpg',
    alt: 'Portfolio',
    link: '/projects/portfolio',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.REACT, ProjectFilter.WEB],
    description:
      'Personal portfolio website created to showcase my projects and technical skills. First created in 2016 as a simple static HTML website, the website has experienced multiple improvements over the years including migration to PHP, then to React with Materialize, and most recently to React with Tailwind.',
    github: 'https://github.com/KyleGough/portfolio',
    skills: {
      active: [
        'Next.js',
        'React',
        'TypeScript',
        'JavaScript',
        'TailwindCSS',
        'HTML',
        'CSS',
      ],
      disabled: ['PHP', 'Materialize', 'Bootstrap', 'Sass'],
    },
    logo: TypeScriptLogo,
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
    src: '/img/card-lucidlab.jpg',
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
      'An adaptable, heterogeneous IoT testbed for which I developed the front-end user interface. The UI allows registered users to upload and configure tests and images to be deployed on the testbed. Additionally, test results and custom metrics including mote availability graphs and mote CCA charts can be viewed.',
    skills: {
      active: ['React', 'JavaScript', 'Materialize', 'HTML', 'CSS'],
      disabled: ['Python', 'Shell', 'C', 'SQL'],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-sudoku.jpg',
    alt: 'Logical sudoku solver',
    link: '/projects/sudoku',
    filters: [ProjectFilter.PYTHON, ProjectFilter.PUZZLE],
    description:
      'Program that can solve expert level Sudoku using only logical techniques (no brute forcing, guessing or backtracking). The program outputs a detailed description of the techniques and moves required at each step to solve Sudoku. The solver reads CSV files allowing for batch solving. In-depth analysis is displayed including but not limited to: difficulty rating, occurrences of each technique, probability of each technique, processing time for each technique and total processing time.',
    github: 'https://github.com/KyleGough/sudoku',
    skills: {
      active: ['Python'],
    },
    logo: PythonLogo,
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
    src: 'img/card-react-minesweeper.jpg',
    alt: 'React Minesweeper',
    link: '/projects/react-minesweeper',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.REACT,
      ProjectFilter.PUZZLE,
      ProjectFilter.WEB,
    ],
    description:
      'Clone of classic Minesweeper with an 18x18 board. Ability to reveal tiles and flag tiles for potential mines. Flood fill algorithms will reveal all adjacent tiles when a 0 is uncovered, mimicing the behaviour of the original game.',
    github: 'https://github.com/KyleGough/react-minesweeper',
    skills: {
      active: ['React', 'JavaScript', 'CSS', 'Materialize'],
    },
    logo: ReactLogo,
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
    src: '/img/card-cave-exploration.jpg',
    alt: 'Cave Exploration',
    link: '/projects/cave-exploration',
    filters: [ProjectFilter.CPLUSPLUS],
    description:
      'Cave exploration is dangerous and time-consuming. This project demonstrates how swarm AI could be used in a group of autonomous flying drones to navigate and explore a cave as efficiently as possible. The project also includes random, realistic cave environment generation.',
    github: 'https://github.com/KyleGough/CS310-Dissertation',
    skills: {
      active: ['C++', 'GLUT'],
    },
    logo: CPlusPlusLogo,
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
    src: '/img/card-roller-coaster.jpg',
    alt: 'Roller coaster',
    link: '/projects/roller-coaster',
    filters: [ProjectFilter.CPLUSPLUS],
    description:
      'Simulation of a 3-car roller coaster which traverses a small looped track featuring a lift hill, drop, loop-the-loop and turns. The coaster can be viewed from a first-person perspective in each of the carts, as well as additional views that track the carts round the track.',
    skills: {
      active: ['C++', 'GLUT'],
    },
    logo: CPlusPlusLogo,
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
    src: '/img/card-rscbot.jpg',
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
    skills: {
      active: ['JavaScript', 'jQuery', 'HTML', 'CSS', 'Materialize'],
      disabled: ['PHP', 'SQL'],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-url-shortener.jpg',
    alt: 'URL shortener',
    link: '/projects/url-shortener',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      'A URL shortening tool creating using Node.js, Express.js for routing GET and POST requests and MongoDB to store URLs. The project is my first using all three of these technologies. Long URLs are stored in the database and the ID is encoded and used as the short URL.',
    skills: {
      active: ['JavaScript', 'MongoDB', 'jQuery', 'HTML', 'CSS', 'Materialize'],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-graph-algorithm-visualiser.jpg',
    alt: 'Graph algorithm visualiser',
    link: '/projects/graph-algorithm-visualiser',
    filters: [ProjectFilter.JAVASCRIPT, ProjectFilter.WEB],
    description:
      "Web application which visualises the process of various graph algorithms on randomised nodes. The application can simulate Prim's and Kruskal's algorithm for constructing minimum spanning trees, Graham scan to construct convex hulls, Greedy algorithm to construct minimal matchings, and Nearest neighbour with 2-Opt to create Hamiltonian cycles.",
    github: 'https://github.com/KyleGough/graph-algorithm-visualiser',
    skills: {
      active: ['JavaScript', 'Materialize'],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-cavern-minesweeper.jpg',
    alt: 'Cavern Minesweeper',
    link: '/projects/cavern-minesweeper',
    filters: [ProjectFilter.PUZZLE],
    description:
      'Cavern Minesweeper is based off of the original Minesweeper game but with tiered mines (ores) which can only be mined if the player has uncovered enough squares to advance to the required mining level. The game has three levels of difficulty to challenge competitive players. The project served as a tool to teach me Ruby.',
    github: 'https://github.com/KyleGough/cavern-minesweeper',
    skills: {
      active: ['Ruby'],
    },
    logo: RubyLogo,
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
    src: '/img/card-bsplit.jpg',
    alt: 'BSplit',
    link: '/projects/bsplit',
    filters: [
      ProjectFilter.JAVASCRIPT,
      ProjectFilter.PHP,
      ProjectFilter.SQL,
      ProjectFilter.WEB,
    ],
    description:
      "BSplit is a web application that allows registered users to create and settle payments between friends and housemates for things such as restaurant bills, utility bills and food shopping. The app's dashboard utilises AJAX requests to prevent web page reloading to enchance user experience. Dashboard and email notifications are sent when a new bill or group is created.",
    skills: {
      active: [
        'PHP',
        'JavaScript',
        'jQuery',
        'SQL',
        'HTML',
        'CSS',
        'Bootstrap',
      ],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-todo.jpg',
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
      "To Do List Web application where users can signup and create their own lists. Learned and integrated PHP and SQL to store and query user's lists. Protected the application from SQL injection and cross-site scripting.",
    skills: {
      active: ['PHP', 'JavaScript', 'jQuery', 'SQL', 'HTML', 'CSS'],
    },
    logo: JavaScriptLogo,
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
    src: '/img/card-delivery-route-planner.jpg',
    alt: 'Delivery route planner',
    link: '/projects/delivery-route-planner',
    filters: [ProjectFilter.CSHARP],
    description:
      "Creates an efficient route between multiple delivery locations. Store, view and query data on products, clients and their deliveries. Produces a report which communicates the route, delivery items, and ETA. Uses graph algorithms such as Dijkstra's and Nearest Neighbour with 2-Opt to optimise the route.",
    skills: {
      active: ['C#', 'SQL'],
    },
    logo: CSharpLogo,
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
    src: '/img/card-sorting-algorithm-visualiser.jpg',
    alt: 'Sorting Algorithm Visualiser',
    link: '/projects/sorting-algorithm-visualiser',
    filters: [ProjectFilter.CSHARP],
    description:
      'Tool for visualising the sorting process on generated datasets. Supports 20 different sorting algorithms including: Bubble sort, Merge sort, and Quicksort. The tool also has the ability to compare and visualise two sorting algorithms concurrently. The initial dataset can be a choice of 18 configurations such as: random, normally distributed or sawtooth.',
    skills: {
      active: ['C#'],
    },
    logo: CSharpLogo,
  },
];
