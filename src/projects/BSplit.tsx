import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import ImageFigure from '../components/ImageFigure';
import Screenshots from '../components/Screenshots';

export default function BSplit() {

    useEffect(() => {
        document.title = 'BSplit: Bill Splitter Web Application';
    }, []);

    const images = [
        { src:'/img/bsplit1.jpg', caption:'Bill list' },
        { src:'/img/bsplit2.jpg', caption:'Homepage' },
        { src:'/img/bsplit3.jpg', caption:'New bill form' },
        { src:'/img/bsplit4.jpg', caption:"Group list" },
        { src:'/img/bsplit5.jpg', caption:'New group form' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>BSplit</h1>
            <h2 className='project-subtitle'>Web Development Technologies Coursework</h2>
            <p className='text-link-hover my-4'><time dateTime='2017-02'>February 2017</time> - <time dateTime='2017-03'>March 2017</time></p>
            <p className='mb-4'>BSplit is a web application that allows registered users to create and settle payments between friends and housemates for things such as restaurant bills, utility bills and food shopping. The app's dashboard utilises AJAX requests to prevent web page reloading to enchance user experience. Dashboard and Email notifications are sent when a new bill or group is created.</p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='PHP' />
                <Chip name='JavaScript' />
                <Chip name='jQuery' />
                <Chip name='SQL' />
                <Chip name='HTML' />
                <Chip name='CSS' />
                <Chip name='Bootstrap' />
            </div>
        </Section>

        <Divider />

        <ImageFigure image={images[0]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Features</h2>
            <ul className='project-list'>
                <li>User registration.</li>
                <li>User authentication.</li>
                <li>Create a group of existing users by email address.</li>
                <li>Create a bill for a group.</li>
                <li>Create a bill for any set of users.</li>
                <li>Mostly AJAX content to enchance user experience.</li>
                <li>Ability to settle a payment in one or multiple payments.</li>
                <li>Displays the status of bills.</li>
                <li>Notification system for new unseen bills.</li>
                <li>Email notifications for new groups and bills.</li>
                <li>Search functionality for bills and groups.</li>
            </ul>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='To Do List'
            previousLink='/projects/todo-list'
            nextTitle='Cavern Minesweeper'
            nextLink='/projects/cavern-minesweeper'
        />
        </>
    );
}