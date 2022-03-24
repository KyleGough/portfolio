import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import ImageFigure from '../components/ImageFigure';
import Screenshots from '../components/Screenshots';

export default function Minesweeper() {

    useEffect(() => {
        document.title = 'React Minesweeper - Classic Minesweeper Clone Using React';
    }, []);

    const images = [
        { src:'/img/react-minesweeper1.jpg', caption:'Complete game' },
        { src:'/img/react-minesweeper2.jpg', caption:'Partially complete game' },
        { src:'/img/react-minesweeper3.jpg', caption:'Lost game' },
        { src:'/img/react-minesweeper4.jpg', caption:'Initial board' },
        { src:'/img/react-minesweeper5.jpg', caption:'App introduction' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>React Minesweeper</h1>
            <p className='text-link-hover my-4'>October 2019</p>
            <p className='mb-4'>Clone of classic Minesweeper with an 18x18 board. Ability to reveal tiles and flag tiles for potential mines. Flood fill algorithms will reveal all adjacent tiles when a 0 is uncovered, mimicing the behaviour of the original game.</p>
            <p className='mb-4'>Explore this project on 
                <a className='text-link hover:text-link-hover' href='https://github.com/KyleGough/react-minesweeper' target='_blank' rel='noopener noreferrer'> GitHub</a>
            </p>
            <p className='mb-4'>Play the live game at
                <a className='text-link hover:text-link-hover' href='https://kylegough-minesweeper.herokuapp.com/' target='_blank' rel='noopener noreferrer'> https://kylegough-minesweeper.herokuapp.com/</a>
            </p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='React' />
                <Chip name='JavaScript' />
                <Chip name='CSS' />
                <Chip name='Materialize' />
            </div>
        </Section>

        <Divider />

        <ImageFigure image={images[0]} />

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='QuRVe'
            previousLink='/projects/qurve'
            nextTitle='Logical Sudoku Solver'
            nextLink='/projects/sudoku'
        />
        </>
    );
}