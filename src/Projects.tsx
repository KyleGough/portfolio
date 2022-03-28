import React, { useEffect, useState } from 'react';
import Section from './components/Section';
import ProjectFilter from './components/ProjectFilter';
import ProjectItem from './components/ProjectItem';
import Divider from './components/Divider';

type Project = {
    title: string,
    date: string,
    video?: string,
    src: string,
    alt: string,
    link: string,
    filters: string[],
    description: string
};

export default function Projects() {
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        document.title = 'Project List - Kyle Gough';
    }, []);

    const filterProjects = (project: Project): boolean => {
        return (filter === 'All') ? true : project.filters.includes(filter);
    }
    
    const projects: Project[] = [
        {
            title: 'Portfolio',
            date: 'December 2016 - March 2022',
            src: '/img/portfolio-projects-v4b.jpg',
            alt: 'Portfolio',
            link: '/projects/portfolio',
            filters: ['JavaScript', 'React', 'Web'],
            description: 'Personal portfolio website created to showcase my projects and technical skills. First created in 2016 as a simple static HTML website, the website has experienced multiple improvements over the years including migration to PHP, then to React with Materialize, and most recently to React with Tailwind.'
        },
        {
            title: 'LucidLab',
            date: 'October 2019 - May 2020',
            src: '/img/lucidlab1.jpg',
            alt: 'LucidLab',
            link: '/projects/lucidlab',
            filters: ['JavaScript', 'Python', 'React', 'SQL', 'Group Projects', 'Web'],
            description: 'An adaptable, heterogeneous IoT testbed for which I developed the front-end user interface. The UI allows registered users to upload and configure tests and images to be deployed on the testbed. Additionally, test results and custom metrics including mote availability graphs and mote CCA charts can be viewed.'
        },
        {
            title: 'Logical Sudoku Solver',
            date: 'November 2019 - January 2020',
            src: '/img/sudoku1.jpg',
            alt: 'Logical sudoku solver',
            link: '/projects/sudoku',
            filters: ['Python', 'Games/Puzzles'],
            description: 'Program that can solve expert level Sudoku using only logical techniques (no brute forcing, guessing or backtracking). The program outputs a detailed description of the techniques and moves required at each step to solve Sudoku. The solver reads CSV files allowing for batch solving. In-depth analysis is displayed including but not limited to: difficulty rating, occurrences/probability of each technique, processing time for each technique and total processing time.'
        },
        {
            title: 'React Minesweeper',
            date: 'October 2019',
            src: '/img/react-minesweeper1.jpg',
            alt: 'React Minesweeper',
            link: '/projects/react-minesweeper',
            filters: ['JavaScript', 'React', 'Games/Puzzles', 'Web'],
            description: 'Clone of classic Minesweeper with an 18x18 board. Ability to reveal tiles and flag tiles for potential mines. Flood fill algorithms will reveal all adjacent tiles when a 0 is uncovered, mimicing the behaviour of the original game.'
        },
        {
            title: 'QuRVe',
            date: 'June 2019 - August 2019',
            src: '/img/qurve1.jpg',
            alt: 'QuRVe',
            link: '/projects/qurve',
            filters: ['JavaScript', 'React', 'Web'],
            description: 'Designed and created an updated UI for the application QuRVe, a credit tech tool using JavaScript, Webix, React and Less. Implemented an interface to retrieve financial instruments data with a configurable dashboard showing graphs, pivot tables and descriptions of selected securities.'
        },
        {
            title: 'Using Swarm AI to Map a Cave Network',
            date: 'December 2018 - April 2019',
            src: '/img/cave-exploration1.jpg',
            alt: 'Cave Exploration',
            link: '/projects/cave-exploration',
            filters: ['C++'],
            description: 'Cave exploration is dangerous and time-consuming. This project demonstrates how swarm AI could be used in a group of autonomous flying drones to navigate and explore a cave as efficiently as possible. The project also includes random, realistic cave environment generation.'
        },
        {
            title: 'Roller Coaster',
            date: 'December 2018 - January 2019',
            src: '/img/roller-coaster1.jpg',
            alt: 'Roller coaster',
            link: '/projects/roller-coaster',
            filters: ['C++'],
            description: 'Simulation of a 3-car roller coaster which traverses a small looped track featuring a lift hill, drop, loop-the-loop and turns. The coaster can be viewed from a first-person perspective in each of the carts, as well as additional views that track the carts round the track.'
        },
        {
            title: 'RSCBot',
            date: 'February 2018 - March 2019',
            src: '/img/rscbot1.jpg',
            alt: 'RSCBot',
            link: '/projects/rscbot',
            filters: ['JavaScript', 'PHP', 'SQL', 'Group Projects', 'Web'],
            description: 'A specialised, personalisable trader chatbot that can fetch data and current news on financial stocks and sectors from the FTSE 100 index. RSCBot communicates with the user in a natural way, and has been designed to identify and adapt to the user\'s main interests in the stock market, making for a more personal trading experience.'
        },
        {
            title: 'URL Shortener',
            date: 'April 2017',
            src: '/img/url-shortener1.jpg',
            alt: 'URL shortener',
            link: '/projects/url-shortener',
            filters: ['JavaScript', 'Web'],
            description: 'A URL shortening tool creating using Node.js, Express.js for routing GET and POST requests and MongoDB to store URLs. The project is my first using all three of these technologies. Long URLs are stored in the database and the ID is encoded and used as the short URL.'
        },
        {
            title: 'Graph Algorithm Visualiser',
            date: 'April 2017',
            src: '/img/graph-algorithm-visualiser1.jpg',
            alt: 'Graph algorithm visualiser',
            link: '/projects/graph-algorithm-visualiser',
            filters: ['JavaScript', 'Web'],
            description: 'Web application which visualises the process of various graph algorithms on randomised nodes. The application can simulate Prim\'s and Kruskal\'s algorithm for constructing minimum spanning trees, Graham scan to construct convex hulls, Greedy algorithm to construct minimal matchings, and Nearest neighbour with 2-Opt to create Hamiltonian cycles.'
        },
        {
            title: 'Cavern Minesweeper',
            date: 'March 2017',
            src: '/img/cavern-minesweeper1.jpg',
            alt: 'Cavern Minesweeper',
            link: '/projects/cavern-minesweeper',
            filters: ['Games/Puzzles'],
            description: 'Cavern Minesweeper is based off of the original Minesweeper game but with tiered mines (ores) which can only be mined if the player has uncovered enough squares to advance to the required mining level. The game has three levels of difficulty to challenge competitive players. The project served as a tool to teach me Ruby.',
        },
        {
            title: 'BSplit',
            date: 'February 2017 - March 2017',
            src: '/img/bsplit1.jpg',
            alt: 'BSplit',
            link: '/projects/bsplit',
            filters: ['JavaScript', 'PHP', 'SQL', 'Web'],
            description: 'BSplit is a web application that allows registered users to create and settle payments between friends and housemates for things such as restaurant bills, utility bills and food shopping. The app\'s dashboard utilises AJAX requests to prevent web page reloading to enchance user experience. Dashboard and email notifications are sent when a new bill or group is created.'
        },
        {
            title: 'To Do List',
            date: 'January 2017 - February 2017',
            src: '/img/todo-list1.jpg',
            alt: 'To Do List',
            link: '/projects/todo-list',
            filters: ['JavaScript', 'PHP', 'SQL', 'Group Projects', 'Web'],
            description: 'To Do List Web application where users can signup and create their own lists. Learned and integrated PHP and SQL to store and query user\'s lists. Protected the application from SQL injection and cross-site scripting.',
        },
        {
            title: 'Delivery Route Planner',
            date: 'December 2015 - March 2016',
            src: '/img/delivery-route-planner1.jpg',
            alt: 'Delivery route planner',
            link: '/projects/delivery-route-planner',
            filters: ['C#'],
            description: 'Software written in C# which creates an efficient route between multiple delivery locations. Uses SQL to store and query data on products, clients and their deliveries. Produces a report which communicates the route, all items in the deliveries, and the estimated time taken. Uses graph algorithms such as Dijkstra\'s and Nearest Neighbour with 2-Opt to optimise the route.',
        },
        {
            title: 'Sorting Algorithm Visualiser',
            date: 'September 2015 - November 2015',
            src: '/img/sorting-algorithm-visualiser1.jpg',
            alt: 'Sorting Algorithm Visualiser',
            link: '/projects/sorting-algorithm-visualiser',
            filters: ['C#'],
            description: 'Software tool for visualising the sorting process on generated datasets. Supports 20 different sorting algorithms including: Bubble sort, Merge sort, and Quicksort. The tool also has the ability to compare and visualise two sorting algorithms concurrently. The initial dataset can be a choice of 18 configurations such as: random, normally distributed or sawtooth.',
        }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title mb-8 text-center md:text-left'>Projects</h1>
            <p className='mb-4 font-thin text-light'>Currently working on a browser extension for Firefox and actively improving my portfolio website.</p>
        </Section>

        <hr className='mt-8 h-px bg-divider' />

        <div className='bg-circuits'>
        <Section>
            <ProjectFilter filter={filter} setFilterCallback={setFilter} />
        </Section>
        <hr className='mb-8 h-px bg-divider' />
        </div>

        {projects.filter(filterProjects).map((project, i) => {
            return (
                <React.Fragment key={project.title}>
                    { i !== 0 && <Divider /> }
                    <ProjectItem
                        title={project.title}
                        date={project.date}
                        description={project.description}
                        src={project.src}
                        alt={project.alt}
                        link={project.link}
                    />
                </React.Fragment>
            )
        })}
        </>
    );
}
