import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import ImageFigure from '../components/ImageFigure';
import VideoFigure from '../components/VideoFigure';
import Screenshots from '../components/Screenshots';
import HeapSortVideo from '../videos/heap.mp4';
import QuickSortVideo from '../videos/quick.mp4';

export default function SortingVisualiser() {

    useEffect(() => {
        document.title = 'Sorting Algorithm Visualiser - Visualise 20 Unique Sorting Algorithms';
    }, []);

    const images = [
        { src:'/img/sorting-algorithm-visualiser1.jpg', caption:'Unsorted Random Data' },
        { src:'/img/sorting-algorithm-visualiser2.jpg', caption:'Random and sinusoidal datasets' },
        { src:'/img/sorting-algorithm-visualiser3.jpg', caption:'Bitonic sort and sorted dataset' },
        { src:'/img/sorting-algorithm-visualiser4.jpg', caption:'Dataset visualised as points' },
        { src:'/img/sorting-algorithm-visualiser5.jpg', caption:'Algorithm information table' }
    ];

    const algorithmTable = [
        ['Bitonic', 'Parallel sorting algorithm'],
        ['Bogo', 'Randomly permutates all elements until fully sorted'],
        ['Bubble', 'Common simple algorithm'],
        ['Cocktail', 'Bubble sort in both directions'],
        ['Comb', 'Bubble sort variant with reducing gap'],
        ['Cycle', 'Optimised for minimal array writes'],
        ['Gnome', 'Insertion sort variant which swaps until element in correct position'],
        ['Heap', 'Builds heap and extracts from unsorted region'],
        ['Insertion', 'Builds sorted array one element at a time'],
        ['JSort', 'Builds heap then uses insertion sort'],
        ['Merge', 'Recursively merges half of the array'],
        ['OddEven', 'Compares all odd/even pairs then vice-versa'],
        ['Pancake', 'Flips array between regions'],
        ['Permutation', 'Compares every permutation of the array'],
        ['Radix LSD', 'Bucket sorts digits from least significant to most significant'],
        ['Selection', 'Builds sorted array one element at a time'],
        ['Shell', 'Bubble sort variant with reducing gap'],
        ['Smooth', 'Builds heap then extracts largest element'],
        ['Stooge', 'Recursively sorts first 2/3 then last 2/3'],
        ['Quick', 'Divide and conquer algorithm that uses a pivot']
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>Sorting Algorithm Visualiser</h1>
            <p className='text-link-hover my-4'>September 2015 - November 2015</p>
            <p className='mb-4'>Tool for visualising the sorting process on a generated dataset. Highlights swapping and sorted elements in real-time. Supports 20 different sorting algorithms including: Bubble, Mergesort and Quicksort. The visualiser is fully customisable with options to change the dataset size, range of values in the dataset and delay between each operation. The tool also has the ability to compare and visualise two sorting algorithms concurrently. The initial dataset can be one of 18 configurations such as: random, normally distributed or sawtooth.</p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='C#' />
            </div>
        </Section>

        <Divider />

        <VideoFigure src={HeapSortVideo} caption='Heap Sort' />

        <Divider />

        <Section>
            <h2 className='project-header'>Overview</h2>
            <p className='my-4'>Prior to this project, I had developed a simple CLI sorting algorithm visualiser in VB.net featuring a limited selection of algorithms and options. Once I had familiarised myself with C#, I decided to upgrade and rewrite the visualiser with a GUI, additional algorithms and enhanced customisation. The project served as a great tool for improving my C# and GUI design skills as well as futhering my understanding of how sorting algorithms operate, scale and perform.</p>
        </Section>

        <Divider />

        <Section>    
            <h2 className='project-header'>Features</h2>
            <ul className='project-list'>
                <li>Real-time visualiser which can be paused and stopped.</li>
                <li>20 unique sorting algorithms.</li>
                <li>18 starting datasets to analyse the performance of each algorithm.</li>
                <li>Ability to compare two algorithms simultaneously.</li>
                <li>Customisable dataset size, range and delay.</li>
                <li>Statistics provided for each algorithm (incl. Big-O Complexities, Stability, In-place).</li>
                <li>Analysis results after sorting data (incl. Comparisons, Swaps, Duration).</li>
                <li>Custom colours and data display styles.</li>
            </ul>
        </Section>

        <Divider />

        <Section>
            <h2 className='project-header'>Algorithms</h2>

            <table className="min-w-full">
                <tbody>
                    {algorithmTable.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-divider text-sm leading-5">{row[0]}</td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b border-divider text-sm leading-5">{row[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            nextTitle='Delivery Route Planner'
            nextLink='/projects/delivery-route-planner'
        />
        </>
    );
}