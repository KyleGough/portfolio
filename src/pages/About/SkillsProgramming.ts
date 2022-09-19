import { ISkill, Confidence } from '../../components/SkillList';
import PythonLogo from '../../img/python.png';
import JavaLogo from '../../img/java.png';
import CSharpLogo from '../../img/c#.png';
import CPlusPlusLogo from '../../img/c++.png';
import VBLogo from '../../img/vb.png';
import HaskellLogo from '../../img/haskell.png';
import RubyLogo from '../../img/ruby.png';
import MatlabLogo from '../../img/matlab.png';

export const skillsProgramming: ISkill[] = [
  {
    name: 'Python',
    progress: 90,
    className: 'w-[90%]',
    description: 'Logical Sudoku Solver, Machine Learning, Image Analysis',
    confidence: Confidence.CONFIDENT,
    logo: PythonLogo,
  },
  {
    name: 'Java',
    progress: 80,
    className: 'w-[80%]',
    description: 'Robot Maze Environment, Steganography, Witter',
    confidence: Confidence.CONFIDENT,
    logo: JavaLogo,
  },
  {
    name: 'C#',
    progress: 75,
    className: 'w-[75%]',
    description: 'Sorting Visualiser, Delivery Route Planner',
    confidence: Confidence.CONFIDENT,
    logo: CSharpLogo,
  },
  {
    name: 'C++',
    progress: 65,
    className: 'w-[65%]',
    description: 'GLUT Simulation of a Roller Coaster',
    confidence: Confidence.COMFORTABLE,
    logo: CPlusPlusLogo,
  },
  {
    name: 'Visual Basic',
    progress: 50,
    className: 'w-[50%]',
    description: 'First Programming Language, CLI Sorting Algorithm Visualiser',
    confidence: Confidence.COMFORTABLE,
    logo: VBLogo,
  },
  {
    name: 'Haskell',
    progress: 40,
    className: 'w-[40%]',
    description: 'Mastermind Coursework, Scratch Clone Coursework',
    confidence: Confidence.COMFORTABLE,
    logo: HaskellLogo,
  },
  {
    name: 'Ruby',
    progress: 30,
    className: 'w-[30%]',
    description: 'Minesweeper Game',
    confidence: Confidence.BEGINNER,
    logo: RubyLogo,
  },
  {
    name: 'MATLAB',
    progress: 45,
    className: 'w-[45%]',
    description: 'Digital Forensics on Images',
    confidence: Confidence.BEGINNER,
    logo: MatlabLogo,
  },
];
