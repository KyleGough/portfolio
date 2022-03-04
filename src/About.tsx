import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Section from './components/Section';
import Divider from './components/Divider';
import Skill from './components/Skill';

function Checkbox(props: { name: string, checked: boolean }): React.ReactElement {
    return (
        <label className='leading-6 align-middle my-4 flex'>
            <input className='appearance-none w-6 h-6 mr-4 border-disbaled checked:border-link border-2 checked:bg-link rounded-xl focus:ring-0 checkbox' type='checkbox' checked={props.checked} readOnly/>
            <span>{ props.name }</span>
        </label>
    );
}

export default function About() {

    const skillsProgramming: string[][] = [
        ["Python", "w-[90%]", "Logical Sudoku Solver, Machine Learning, Image Analysis", "Confident"],
        ["Java", "w-[80%]", "Robot Maze Environment, Steganography, Witter", "Confident"],
        ["C#", "w-[75%]", "Sorting Visualiser, Delivery Route Planner", "Confident"],
        ["C++", "w-[65%]", "GLUT Simulation of a Roller Coaster", "Comfortable"],
        ["C", "w-[35%]", "3D Printing Algorithms", "Beginner"],
        ["Visual Basic", "w-[50%]", "First Programming Language, CLI Sorting Algorithm Visualiser", "Comfortable"],
        ["Haskell", "w-[40%]", "Mastermind Coursework, Scratch Clone Coursework", "Comfortable"],
        ["Ruby", "w-[30%]", "Minesweeper Game", "Beginner"],
        ["MATLAB", "w-[45%]", "Digital Forensics on Images", "Beginner"]
    ];

    const skillsWeb: string[][] = [
        ["JavaScript", "w-[90%]", "Portfolio, LucidLab, QuRVe, Graph Algorithm Visualiser, RSCBot", "Confident"],
        ["TypeScript", "w-[70%]", "Portfolio", "Comfortable"],
        ["React", "w-[75%]", "Portfolio, LucidLab, QuRVe, Minesweeper", "Comfortable"],
        ["Tailwind", "w-[70%]", "Portfolio", "Comfortable"],
        ["HTML", "w-[90%]", "Portfolio, BSplit, To Do List", "Confident"],
        ["CSS", "w-[90%]", "Portfolio, LucidLab, QuRVe, BSplit, Minesweeper", "Confident"],
        ["PHP", "w-[55%]", "BSplit, Portfolio", "Comfortable"]
    ];

    const skillsDatabase: string[][] = [
        ["SQL", "w-[60%]", "Delivery Route Planner, BSplit, Department Store Database Analysis", "Comfortable"],
        ["Access SQL", "w-[25%]", "Delivery Route Planner", "Beginner"],
        ["SQLite", "w-[30%]", "BSplit", "Beginner"],
        ["MongoDB", "w-[10%]", "URL Shortener", "Beginner"]
    ];

    const skillsOther: string[][] = [
        ["Git", "w-[75%]", "Used in all projects", "Comfortable"],
        ["Bash", "w-[75%]", "Shell Scripting Exercises, Finding security defects in a VM", "Comfortable"],
        ["Zsh", "w-[85%]", "Personal Shell of Choice, Everyday use with Manjaro i3", "Comfortable"],
        ["LaTeX", "w-[50%]", "Dissertation, Multiple Group Projects ", "Comfortable"],
        ["Markdown", "w-[75%]", "Lecture Notes, GitHub READMEs", "Confident"],
        ["Alloy", "w-[20%]", "Simple Exercises, CS262 Coursework", "Beginner"]
    ];

    useEffect(() => {
        document.title = 'About Me - Kyle Gough';
    }, []);

    return (
        <>
        <Section>
            <h1 className='project-title mb-8 text-center md:text-left'>About Me</h1>
            <p className='my-4'>
                I am a technology analyst at Bank of America working on front office applications and batches.
                Recent graduate of the University of Warwick with a 1<sup>st</sup> class MEng in Computer Science.
                Interests lie in bouldering, cycling, guitar and physics. I enjoy learning new languages, frameworks and 
                technologies and have pursued multiple personal projects putting these skills into practice, detailed below.</p>
            <p className='mt-8 mb-4 text-center md:text-left'>You can view my CV 
                <a className='text-link hover:text-link-hover' href='/CV.pdf' target='_blank' rel='noopener noreferrer'> here.</a>
            </p>
            <p className='mt-4 text-center md:text-left'>You can view a list of all my projects
                <Link to='/projects' className='text-link hover:text-link-hover'> here.</Link>
            </p>
        </Section>

        <Divider />

        <Section>
            <h2 className='project-header text-center md:text-left'>Goals for 2022</h2>
            <p className='my-4'>Here are some languages and technologies I am keen to learn in 2022.</p>
            <div className='flex flex-col'>
                <Checkbox name='TypeScript' checked={true} />
                <Checkbox name='React Native' checked={false} />
                <Checkbox name='Rust' checked={false} />
                <Checkbox name='GraphQL' checked={false} />
                <Checkbox name='Unity' checked={false} />
                <Checkbox name='AWS' checked={false} />
                <Checkbox name='Docker' checked={false} />
                <Checkbox name='Shopify' checked={false} />
            </div>
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header text-center md:text-left'>Programming Languages</h2>
            {skillsProgramming.map((skill, i) => {
                return (
                    <Skill
                        key={i}
                        type='progress-programming'
                        title={skill[0]}
                        progress={skill[1]}
                        description={skill[2]}
                        comment={skill[3]}
                    />
                );
            })}
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header text-center md:text-left'>Web Development</h2>
            {skillsWeb.map((skill, i) => {
                return (
                    <Skill
                        key={i}
                        type='progress-web'
                        title={skill[0]}
                        progress={skill[1]}
                        description={skill[2]}
                        comment={skill[3]}
                    />
                );
            })}
            <p className='font-extrabold mt-8 underline text-center md:text-left'>Other</p>
            <p className='text-center md:text-left'>Node.js, jQuery, AJAX, Materialize, Bootstrap, Webix.</p>
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header text-center md:text-left'>Database</h2>
            {skillsDatabase.map((skill, i) => {
                return (
                    <Skill
                        key={i}
                        type='progress-database'
                        title={skill[0]}
                        progress={skill[1]}
                        description={skill[2]}
                        comment={skill[3]}
                    />
                );
            })}
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header text-center md:text-left'>Other</h2>
            {skillsOther.map((skill, i) => {
                return (
                    <Skill
                        key={i}
                        type='progress-other'
                        title={skill[0]}
                        progress={skill[1]}
                        description={skill[2]}
                        comment={skill[3]}
                    />
                );
            })}
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header text-center md:text-left'>University Modules</h2>
            <h3 className='text-xl mb-4 text-center md:text-left'>Year 1 Modules</h3>
            <ul className='project-list mb-16'>
                <li>CS118: Programming for Computer Scientists</li>
                <li>CS126: Design of Information Structures</li>
                <li>CS130: Mathematics for Computer Scientists I</li>
                <li>CS131: Mathematics for Computer Scientists II</li>
                <li>CS132: Computer Organisation and Architecture</li>
                <li>CS133: Professional Skills</li>
                <li>CS139: Web Development Technologies → <br className='md:hidden' /> <span className='whitespace-nowrap'>
                        <Link to='/projects/todo-list' className='text-link hover:text-link-hover'> To Do List</Link>
                        ,  
                        <Link to='/projects/bsplit' className='text-link hover:text-link-hover'> BSplit</Link>
                    </span>
                </li>
                <li>CS140: Computer Security</li>
            </ul>

            <h3 className='text-xl mb-4 text-center md:text-left'>Year 2 Modules</h3>
            <ul className='project-list mb-16'>
                <li>CS241: Operating Systems and Computer Networks</li>
                <li>CS256: Functional Programming</li>
                <li>CS258: Database Systems</li>
                <li>CS259: Formal Languages</li>
                <li>CS260: Algorithms</li>
                <li>CS261: Software Engineering</li>
                <li>CS262: Logic and Verification → <br className='md:hidden' /><span className='whitespace-nowrap'>
                        <Link to='/projects/rscbot' className='text-link hover:text-link-hover'> RSCBot</Link>
                    </span>
                </li>
                <li>CS263: Cyber Security</li>
            </ul>

            <h3 className='text-xl mb-4 text-center md:text-left'>Year 3 Modules</h3>
            <ul className='project-list mb-16'>
                <li>CS310: Dissertation → <br className='md:hidden' /> <span className='whitespace-nowrap'>
                        <Link to='/projects/cave-exploration' className='text-link hover:text-link-hover'> Using Swarm AI to Map a Cave Network</Link>
                    </span>
                </li>
                <li>CS313: Mobile Robotics</li>
                <li>CS324: Computer Graphics → <br className='md:hidden' /><span className='whitespace-nowrap'>
                        <Link to='/projects/roller-coaster' className='text-link hover:text-link-hover'> Roller Coaster</Link>
                    </span>
                </li>
                <li>CS331: Neural Computing</li>
                <li>CS342: Machine Learning</li>
                <li>CS352: Project Management</li>
                <li>CS355: Digital Forensics</li>
            </ul>

            <h3 className='text-xl mb-4 text-center md:text-left'>Year 4 Modules</h3>
            <ul className='project-list mb-8'>
                <li>CS402: High Peformance Computing</li>
                <li>CS407: Group Project → <br className='md:hidden' /><span className='whitespace-nowrap'>
                        <Link to='/projects/lucidlab' className='text-link hover:text-link-hover'> LucidLab</Link>
                    </span>
                </li>
                <li>CS413: Image and Video Analysis</li>
                <li>CS419: Quantum Computing</li>
                <li>CS904: Computational Biology</li>
                <li>CS910: Foundations of Data Analytics</li>
                <li>CS915: Advanced Computer Security</li>
            </ul>
        </Section>
        </>
    );
}
