import { ISkill } from '../../components/SkillList';
import CPlusPlusLogo from '../../img/cplusplus.svg';
import CSharpLogo from '../../img/csharp.svg';
import JavaLogo from '../../img/java.svg';
import PythonLogo from '../../img/python.svg';
import VBLogo from '../../img/vb.svg';

export const skillsProgramming: ISkill[] = [
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
  }
];
