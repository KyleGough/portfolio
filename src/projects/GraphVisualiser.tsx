import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import ImageFigure from '../components/ImageFigure';
import Screenshots from '../components/Screenshots';

export default function GraphVisualiser() {

    useEffect(() => {
        document.title = 'Graph Algorithm Visualiser - Web App to Visualise Various Graph Algorithms';
    }, []);

    const images = [
        { src:'/img/graph-algorithm-visualiser1.jpg', caption:'Nearest Neighbour with 2-Opt' },
        { src:'/img/graph-algorithm-visualiser2.jpg', caption:'Randomly generated nodes' },
        { src:'/img/graph-algorithm-visualiser3.jpg', caption:'Algorithm information' },
        { src:'/img/graph-algorithm-visualiser4.jpg', caption:'Graham Scan' },
        { src:'/img/graph-algorithm-visualiser5.jpg', caption:'Random route' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>Graph Algorithm Visualiser</h1>
            <p className='text-link-hover my-4'><time dateTime='2017-04'>April 2017</time></p>
            <p className='mb-4 max-w-reading'>Web application which visualises the process of various graph algorithms on randomised nodes. The application can simulate Prim's and Kruskal's algorithm for constructing minimum spanning trees, Graham scan to construct convex hulls, Greedy algorithm to construct minimal matchings, and Nearest neighbour with 2-Opt to create Hamiltonian cycles.</p>
            <p className='mb-4'>
                <span>Explore this project on </span>
                <a className='text-link hover:text-link-hover focus:text-link-hover' href='https://github.com/KyleGough/graph-algorithm-visualiser' target='_blank' rel='noopener noreferrer'>GitHub</a>
            </p>

            <div className='flex flex-row flex-wrap items-center mt-8 gap-4'>
                <Chip name='JavaScript' />
                <Chip name='Materialize' />
            </div>
        </Section>

        <Divider />

        <ImageFigure image={images[0]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Features</h2>
            <ul className='project-list'>
                <li>Visualisation of the graph, unvisited nodes, visited nodes and edges connecting them.</li>
                <li>Choice of low number to high number of nodes in the graph.</li>
                <li>Algorithm statistics such as: Tour length, Minimum Spanning Tree length, Convex Hull nodes.</li>
                <li><strong>Minimum Spanning Tree Algorithms</strong> - Prim's, Kruskal's</li>
                <li><strong>Hamiltonian Path</strong> - Nearest Neighbour, Nearest Neighbour with 2-Opt, Random Tour</li>
                <li><strong>Convex Hull Algorithms</strong> - Graham Scan</li>
                <li><strong>Minimum Matching</strong> - Greedy (variant of Kruskal's algorithm)</li>
            </ul>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='Cavern Minesweeper'
            previousLink='/projects/cavern-minesweeper'
            nextTitle='URL Shortener'
            nextLink='/projects/url-shortener'
        />
        </>
    );
}