import CPlusPlusLogo from '@image/skill/cplusplus.svg';
import CSharpLogo from '@image/skill/csharp.svg';
import JavaLogo from '@image/skill/java.svg';
import PythonLogo from '@image/skill/python.svg';
import VBLogo from '@image/skill/vb.svg';
import { Skill } from '@utilities/types';

export const skillsProgramming: Skill[] = [
  {
    name: 'Python',
    description: 'Bank of America, Logical Sudoku Solver, ML, Image Analysis',
    logo: PythonLogo,
  },
  {
    name: 'Java',
    description: 'Robot Maze, Steganography',
    logo: JavaLogo,
  },
  {
    name: 'C#',
    description: 'Sorting Algorithm Visualiser, Delivery Route Planner',
    logo: CSharpLogo,
  },
  {
    name: 'C++',
    description: 'GLUT Simulation of a Roller Coaster',
    logo: CPlusPlusLogo,
  },
  {
    name: 'Visual Basic',
    description: 'First Programming Language, Sorting Algorithm Visualiser',
    logo: VBLogo,
  },
];
