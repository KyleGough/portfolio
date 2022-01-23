import React, { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import Figure from '../components/Figure';
import Screenshots from '../components/Screenshots';

export default function ToDoList() {

    useEffect(() => {
        document.title = 'To Do List';
    }, []);

    const images = [
        { src:'/img/todo-list1.jpg', caption:'Homepage' },
        { src:'/img/todo-list2.jpg', caption:'Shopping list' },
        { src:'/img/todo-list3.jpg', caption:'New user registration' },
        { src:'/img/todo-list4.jpg', caption:"User's lists" },
        { src:'/img/todo-list5.jpg', caption:'Existing login page' }
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>To Do List</h1>
            <h2 className='project-subtitle'>CS139: Web Development Technologies Lab Work</h2>
            <p className='text-link-hover my-4'>January 2017 - February 2017</p>
            <p className='mb-4'>To Do List Web application where users can signup and create their own lists. Learned and integrated PHP and SQL to store and query user's lists. Protected the application from SQL injection and Cross-Site scripting.</p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='PHP' />
                <Chip name='JavaScript' />
                <Chip name='jQuery' />
                <Chip name='SQL' />
                <Chip name='HTML' />
                <Chip name='CSS' />
            </div>
        </Section>

        <Divider />

        <Figure image={images[0]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Features</h2>
            <ul className='project-list'>
                <li>User registration.</li>
                <li>View selection of lists.</li>
                <li>View items in a list.</li>
                <li>Mark items in a list as complete.</li>
                <li>Create a new list.</li>
                <li>Add new item to a list.</li>
            </ul>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='Delivery Route Planner'
            previousLink='/projects/delivery-route-planner'
            nextTitle='BSplit'
            nextLink='/projects/bsplit'
        />
        </>
    );
}