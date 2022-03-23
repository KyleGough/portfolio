import React, { MouseEventHandler, RefObject, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Section from './components/Section';
import Divider from './components/Divider';
import renderSkills from './components/Skill';
import LabelledLogo from './components/LabelledLogo';

// Technology logos.
import PythonLogo from './icons/python.png';
import JavaLogo from './icons/java.png';
import CSharpLogo from './icons/c#.png';
import CPlusPlusLogo from './icons/c++.png';
import VBLogo from './icons/vb.png';
import HaskellLogo from './icons/haskell.png';
import RubyLogo from './icons/ruby.png';
import MatlabLogo from './icons/matlab.png';
import JavaScriptLogo from './icons/javascript.png';
import TypeScriptLogo from './icons/typescript.png';
import ReactLogo from './icons/react.png';
import TailwindLogo from './icons/tailwind.png';
import HTMLLogo from './icons/html.png';
import CSSLogo from './icons/css.png';
import PHPLogo from './icons/php.png';
import GitLogo from './icons/git.png';
import BashLogo from './icons/bash.png';
import TerminalLogo from './icons/terminal.png';
import SQLLogo from './icons/sql.png';
import LatexLogo from './icons/latex.png';
import MarkdownLogo from './icons/markdown.png';
import JqueryLogo from './icons/jquery.png';
import NodeLogo from './icons/node.png';
import BootstrapLogo from './icons/bootstrap.png';
import MaterializeLogo from './icons/materialize.png';
import WebixLogo from './icons/webix.png';
import HerokuLogo from './icons/heroku.png';

enum Progress {
  RED = 'border-traffic-red',
  AMBER = 'border-traffic-amber',
  GREEN = 'border-traffic-green'
};

function TabItem(props: { value: string, onClick?: MouseEventHandler<HTMLButtonElement> | undefined }): React.ReactElement {
    return (
        <button onClick={props.onClick} className='px-12 py-4 bg-background text-link hover:text-link-hover rounded-sm shadow border-light'>{props.value}</button>
    );
}

function Checkbox(props: { name: string, progress: Progress, checked: boolean }): React.ReactElement {
    return (
        <label className='leading-6 align-middle my-2 flex'>
            <input className={`appearance-none w-6 h-6 mr-4 border-2 rounded-xl focus:ring-0 checkbox ${props.progress}`} type='checkbox' checked={props.checked} readOnly/>
            <span>{ props.name }</span>
        </label>
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

    const skillsProgramming: string[][] = [
        ["Python", "w-[90%]", "Logical Sudoku Solver, Machine Learning, Image Analysis", "Confident", PythonLogo],
        ["Java", "w-[80%]", "Robot Maze Environment, Steganography, Witter", "Confident", JavaLogo],
        ["C#", "w-[75%]", "Sorting Visualiser, Delivery Route Planner", "Confident", CSharpLogo],
        ["C++", "w-[65%]", "GLUT Simulation of a Roller Coaster", "Comfortable", CPlusPlusLogo],
        ["Visual Basic", "w-[50%]", "First Programming Language, CLI Sorting Algorithm Visualiser", "Comfortable", VBLogo],
        ["Haskell", "w-[40%]", "Mastermind Coursework, Scratch Clone Coursework", "Comfortable", HaskellLogo],
        ["Ruby", "w-[30%]", "Minesweeper Game", "Beginner", RubyLogo],
        ["MATLAB", "w-[45%]", "Digital Forensics on Images", "Beginner", MatlabLogo]
    ];

    const skillsWeb: string[][] = [
        ["JavaScript", "w-[90%]", "Portfolio, LucidLab, QuRVe, Graph Algorithm Visualiser, RSCBot", "Confident", JavaScriptLogo],
        ["TypeScript", "w-[70%]", "Portfolio", "Comfortable", TypeScriptLogo],
        ["React", "w-[75%]", "Portfolio, LucidLab, QuRVe, Minesweeper", "Comfortable", ReactLogo],
        ["Tailwind", "w-[70%]", "Portfolio", "Comfortable", TailwindLogo],
        ["HTML", "w-[90%]", "Portfolio, BSplit, To Do List", "Confident", HTMLLogo],
        ["CSS", "w-[90%]", "Portfolio, LucidLab, QuRVe, BSplit, Minesweeper", "Confident", CSSLogo],
        ["PHP", "w-[55%]", "BSplit, Portfolio", "Comfortable", PHPLogo]
    ];

    const skillsOther: string[][] = [
        ["Git", "w-[85%]", "Used in all projects", "Comfortable", GitLogo],
        ["Bash", "w-[75%]", "Shell Scripting Exercises, Finding security defects in a VM", "Comfortable", BashLogo],
        ["Zsh", "w-[85%]", "Personal Shell of Choice, Everyday use with Manjaro i3", "Comfortable", TerminalLogo],
        ["SQL", "w-[60%]", "Delivery Route Planner, BSplit, Department Store Database Analysis", "Comfortable", SQLLogo],
        ["LaTeX", "w-[50%]", "Dissertation, Multiple Group Projects ", "Comfortable", LatexLogo],
        ["Markdown", "w-[80%]", "Lecture Notes, GitHub READMEs", "Confident", MarkdownLogo]
    ];

    useEffect(() => {
        document.title = 'About Me - Kyle Gough';
    }, []);

    return (
        <>
        <Section>
            <h1 className='project-title mb-8 text-center md:text-left'>About Me</h1>
            <p className='my-4 max-w-[780px]'>
                I am a technology analyst at Bank of America working on front office applications and batches.
                Recent graduate of the University of Warwick with a 1<sup>st</sup> class MEng in Computer Science.
                Interests lie in bouldering, cycling, guitar and physics. I enjoy learning new languages, frameworks and 
                technologies and have pursued multiple personal projects putting these skills into practice, detailed below.</p>
            <p className='mt-8 mb-4 text-center md:text-left'>
                <a className='text-link hover:text-link-hover' href='/CV.pdf' target='_blank' rel='noopener noreferrer'>Read my CV</a>
            </p>
            <p className='mt-4 text-center md:text-left'>You can view a list of all my projects
                <Link to='/projects' className='text-link hover:text-link-hover'> here.</Link>
            </p>
        </Section>

        <Divider />

        <Section>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 justify-center'>
                <TabItem onClick={() => scrollTo(anchorProgramming)} value='Programming Languages' />
                <TabItem onClick={() => scrollTo(anchorWeb)} value='Web Development' />
                <TabItem onClick={() => scrollTo(anchorOther)} value='Other Technologies' />
                <TabItem onClick={() => scrollTo(anchorGoals)} value='Goals for 2022' />
                <TabItem onClick={() => scrollTo(anchorUni)} value='University Modules' />
            </div>
        </Section>

        <Divider />

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
            <div className='flex flex-col'>
                <Checkbox name='TypeScript' progress={Progress.GREEN} checked={true} />
                <Checkbox name='React Native' progress={Progress.RED} checked={false} />
                <Checkbox name='Extension API' progress={Progress.RED} checked={false} />
                <Checkbox name='GraphQL' progress={Progress.RED} checked={false} />
                <Checkbox name='Unity' progress={Progress.RED} checked={false} />
                <Checkbox name='AWS' progress={Progress.RED} checked={false} />
                <Checkbox name='Docker' progress={Progress.RED} checked={false} />
            </div>
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
