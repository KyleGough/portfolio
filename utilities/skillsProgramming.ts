import CPlusPlusLogo from '@image/skill/cplusplus.svg';
import CSharpLogo from '@image/skill/csharp.svg';
import JavaLogo from '@image/skill/java.svg';
import PythonLogo from '@image/skill/python.svg';
import VBLogo from '@image/skill/vb.svg';
import { Skill } from '@utilities/types';

export const skillsProgramming: Skill[] = [
  {
    name: 'Python',
    progress: 90,
    className: 'w-[90%]',
    description: 'Bank of America, Logical Sudoku Solver, ML, Image Analysis',
    logo: PythonLogo,
  },
  {
    name: 'Java',
    progress: 80,
    className: 'w-[80%]',
    description: 'Robot Maze, Steganography',
    logo: JavaLogo,
  },
  {
    name: 'C#',
    progress: 75,
    className: 'w-[75%]',
    description: 'Sorting Algorithm Visualiser, Delivery Route Planner',
    logo: CSharpLogo,
  },
  {
    name: 'C++',
    progress: 65,
    className: 'w-[65%]',
    description: 'GLUT Simulation of a Roller Coaster',
    logo: CPlusPlusLogo,
  },
  {
    name: 'Visual Basic',
    progress: 50,
    className: 'w-[50%]',
    description: 'First Programming Language, Sorting Algorithm Visualiser',
    logo: VBLogo,
  },
];
