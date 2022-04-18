import React, { MouseEventHandler, RefObject, useEffect, useRef } from 'react';
import Section from './components/Section';
import Divider from './components/Divider';
import renderSkills from './components/Skill';
import LabelledLogo from './components/LabelledLogo';
import GoalListItem, { Progress } from './components/GoalListItem';

// Technology logos.
import PythonLogo from './img/python.png';
import JavaLogo from './img/java.png';
import CSharpLogo from './img/c#.png';
import CPlusPlusLogo from './img/c++.png';
import VBLogo from './img/vb.png';
import HaskellLogo from './img/haskell.png';
import RubyLogo from './img/ruby.png';
import MatlabLogo from './img/matlab.png';
import JavaScriptLogo from './img/javascript.png';
import TypeScriptLogo from './img/typescript.png';
import ReactLogo from './img/react.png';
import TailwindLogo from './img/tailwind.png';
import HTMLLogo from './img/html.png';
import CSSLogo from './img/css.png';
import PHPLogo from './img/php.png';
import GitLogo from './img/git.png';
import BashLogo from './img/bash.png';
import TerminalLogo from './img/terminal.png';
import SQLLogo from './img/sql.png';
import LatexLogo from './img/latex.png';
import MarkdownLogo from './img/markdown.png';
import JqueryLogo from './img/jquery.png';
import NodeLogo from './img/node.png';
import BootstrapLogo from './img/bootstrap.png';
import MaterializeLogo from './img/materialize.png';
import WebixLogo from './img/webix.png';
import HerokuLogo from './img/heroku.png';

function ScrollButton(props: { value: string, onClick?: MouseEventHandler<HTMLButtonElement> | undefined }): React.ReactElement {
    return (
        <button onClick={props.onClick} className='shimmer h-[75px] px-12 py-4 bg-background text-link hover:text-link-hover focus:text-link-hover rounded-sm shadow border-light'>{props.value}</button>
    );
}

function UniModules(props: { name: string, children: React.ReactElement }): React.ReactElement {
    return (
        <div className='flex flex-row align-middle my-8'>
            <div className='flex items-center justify-center w-12'>
                <h3 className='text-xl text-center -rotate-90 whitespace-nowrap'>{props.name}</h3>
            </div>
            {props.children}
        </div>
    );
}

export default function About() {
    const anchorProgramming = useRef<HTMLDivElement>(null);
    const anchorWeb = useRef<HTMLDivElement>(null);
    const anchorOther = useRef<HTMLDivElement>(null);
    const anchorGoals = useRef<HTMLDivElement>(null);
    const anchorUni = useRef<HTMLDivElement>(null);

    // Smoothly scrolls to a ref.
    const scrollTo = (ref: RefObject<HTMLDivElement>) => {
        (ref.current as HTMLDivElement).scrollIntoView({ behavior: 'smooth' });
    }

    const skillsProgramming: [string, number, string, string, string, string][] = [
        ["Python", 90, "w-[90%]", "Logical Sudoku Solver, Machine Learning, Image Analysis", "Confident", PythonLogo],
        ["Java", 80, "w-[80%]", "Robot Maze Environment, Steganography, Witter", "Confident", JavaLogo],
        ["C#", 75, "w-[75%]", "Sorting Visualiser, Delivery Route Planner", "Confident", CSharpLogo],
        ["C++", 65, "w-[65%]", "GLUT Simulation of a Roller Coaster", "Comfortable", CPlusPlusLogo],
        ["Visual Basic", 50,"w-[50%]", "First Programming Language, CLI Sorting Algorithm Visualiser", "Comfortable", VBLogo],
        ["Haskell", 40, "w-[40%]", "Mastermind Coursework, Scratch Clone Coursework", "Comfortable", HaskellLogo],
        ["Ruby", 30, "w-[30%]", "Minesweeper Game", "Beginner", RubyLogo],
        ["MATLAB", 45, "w-[45%]", "Digital Forensics on Images", "Beginner", MatlabLogo]
    ];

    const skillsWeb: [string, number, string, string, string, string][] = [
        ["JavaScript", 90, "w-[90%]", "Portfolio, LucidLab, Graph Algorithm Visualiser, RSCBot", "Confident", JavaScriptLogo],
        ["TypeScript", 70, "w-[70%]", "Portfolio", "Comfortable", TypeScriptLogo],
        ["React", 75, "w-[75%]", "Portfolio, LucidLab, Minesweeper", "Comfortable", ReactLogo],
        ["Tailwind", 70, "w-[70%]", "Portfolio", "Comfortable", TailwindLogo],
        ["HTML", 90, "w-[90%]", "Portfolio, BSplit, To Do List", "Confident", HTMLLogo],
        ["CSS", 90, "w-[90%]", "Portfolio, LucidLab, BSplit, Minesweeper", "Confident", CSSLogo],
        ["PHP", 55, "w-[55%]", "BSplit, Portfolio", "Comfortable", PHPLogo]
    ];

    const skillsOther: [string, number, string, string, string, string][] = [
        ["Git", 85, "w-[85%]", "Used in all projects", "Comfortable", GitLogo],
        ["Bash", 75, "w-[75%]", "Shell Scripting Exercises, Finding security defects in a VM", "Comfortable", BashLogo],
        ["Zsh", 85, "w-[85%]", "Personal Shell of Choice, Everyday use with Manjaro i3", "Comfortable", TerminalLogo],
        ["SQL", 60, "w-[60%]", "Delivery Route Planner, BSplit, Department Store Database Analysis", "Comfortable", SQLLogo],
        ["LaTeX", 50, "w-[50%]", "Dissertation, Multiple Group Projects ", "Comfortable", LatexLogo],
        ["Markdown", 80, "w-[80%]", "Lecture Notes, GitHub READMEs", "Confident", MarkdownLogo]
    ];

    useEffect(() => {
        document.title = 'About Me - Kyle Gough';
    }, []);

    return (
        <>
        <Section>
            <h1 className='project-title mb-8 text-center md:text-left'>About Me</h1>
            <p className='my-4 max-w-[780px]'>
                Hello, I'm Kyle - a technology analyst at Bank of America and recent Computer Science MEng graduate of the University of Warwick.
                Interests lie in bouldering, cycling, guitar, movies and physics. I enjoy learning new languages, frameworks and 
                technologies and have pursued multiple personal projects putting these skills into practice, detailed below.</p>
            <p className='mt-8 text-center md:text-left'>
                <a className='text-link hover:text-link-hover focus:text-link-hover' href='/CV.pdf' target='_blank' rel='noopener noreferrer'>Read my CV</a>
            </p>
        </Section>

        <hr className='mt-8 h-px bg-divider' />

        <div className='bg-circuits'>
        <Section>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 justify-center'>
                <ScrollButton onClick={() => scrollTo(anchorProgramming)} value='Programming Languages' />
                <ScrollButton onClick={() => scrollTo(anchorWeb)} value='Web Development' />
                <ScrollButton onClick={() => scrollTo(anchorOther)} value='Other Technologies' />
                <ScrollButton onClick={() => scrollTo(anchorGoals)} value='Goals for 2022' />
                <ScrollButton onClick={() => scrollTo(anchorUni)} value='University Modules' />
            </div>
        </Section>
        <hr className='mb-8 h-px bg-divider' />
        </div>

        <Section ref={anchorProgramming} id='programming-languages'>    
            <h2 className='project-header text-center md:text-left'>Programming Languages</h2>
            {renderSkills(skillsProgramming, 'progress-programming')}
        </Section>

        <Divider />

        <Section ref={anchorWeb} id='web-development'>    
            <h2 className='project-header text-center md:text-left'>Web Development</h2>
            {renderSkills(skillsWeb, 'progress-web')}
            <p className='font-extrabold text-lg text-center md:text-left mb-8 mt-16'>Additional experience in</p>
            <div className='grid xl:grid-cols-12 md:grid-cols-6 grid-cols-3'>
                <LabelledLogo name='Node.js' logo={NodeLogo} />
                <LabelledLogo name='jQuery' logo={JqueryLogo} />
                <LabelledLogo name='Bootstrap' logo={BootstrapLogo} />
                <LabelledLogo name='Materialize' logo={MaterializeLogo} />
                <LabelledLogo name='Webix' logo={WebixLogo} />
                <LabelledLogo name='Heroku' logo={HerokuLogo} />
            </div>
        </Section>

        <Divider />

        <Section ref={anchorOther} id='other-technologies'>    
            <h2 className='project-header text-center md:text-left'>Other Technologies</h2>
            {renderSkills(skillsOther, 'progress-other')}
        </Section>

        <Divider />

        <Section ref={anchorGoals} id='goals'>
            <h2 className='project-header text-center md:text-left'>Goals for 2022</h2>
            <p className='my-4'>Here are some languages and technologies I am keen to learn in 2022.</p>
            <ul className='list-none mt-8 ml-14'>
                <GoalListItem name='TypeScript' progress={Progress.GREEN} />
                <GoalListItem name='Next.js' progress={Progress.RED} />
                <GoalListItem name='Web Sockets' progress={Progress.RED} />
                <GoalListItem name='React Native' progress={Progress.RED} />
                <GoalListItem name='Extension API' progress={Progress.AMBER} />
                <GoalListItem name='GraphQL' progress={Progress.RED} />
                <GoalListItem name='Unity' progress={Progress.RED} />
                <GoalListItem name='AWS' progress={Progress.RED} />
                <GoalListItem name='Docker' progress={Progress.RED} />
            </ul>
        </Section>

        <Divider />

        <Section ref={anchorUni} id='university-modules'>    
            <h2 className='project-header text-center md:text-left'>University Modules</h2>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <UniModules name='Year 1 Modules'>
                    <ul className='list-none pl-4 py-4 border-l-2 rounded-xl'>
                        <li>Programming for Computer Scientists</li>
                        <li>Design of Information Structures</li>
                        <li>Mathematics for Computer Scientists I</li>
                        <li>Mathematics for Computer Scientists II</li>
                        <li>Computer Organisation and Architecture</li>
                        <li>Professional Skills</li>
                        <li>Web Development Technologies</li>
                        <li>Computer Security</li>
                    </ul>
                </UniModules>

                <UniModules name='Year 2 Modules'>
                    <ul className='list-none pl-4 py-4 border-l-2 rounded-xl'>
                        <li>Operating Systems and Computer Networks</li>
                        <li>Functional Programming</li>
                        <li>Database Systems</li>
                        <li>Formal Languages</li>
                        <li>Algorithms</li>
                        <li>Software Engineering</li>
                        <li>Logic and Verification</li>
                        <li>Cyber Security</li>
                    </ul>
                </UniModules>

                <UniModules name='Year 3 Modules'>
                    <ul className='list-none pl-4 py-4 border-l-2 rounded-xl'>
                        <li>Dissertation</li>
                        <li>Mobile Robotics</li>
                        <li>Computer Graphics</li>
                        <li>Neural Computing</li>
                        <li>Machine Learning</li>
                        <li>Project Management</li>
                        <li>Digital Forensics</li>
                    </ul>
                </UniModules>

                <UniModules name='Year 4 Modules'>
                    <ul className='list-none pl-4 py-4 border-l-2 rounded-xl'>
                        <li>High Peformance Computing</li>
                        <li>Group Project</li>
                        <li>Image and Video Analysis</li>
                        <li>Quantum Computing</li>
                        <li>Computational Biology</li>
                        <li>Foundations of Data Analytics</li>
                        <li>Advanced Computer Security</li>
                    </ul>
                </UniModules>
            </div>         
        </Section>
        </>
    );
}
