import { useEffect } from 'react';
import Section from '../components/Section';
import Divider from '../components/Divider';
import Chip from '../components/Chip';
import Pagination from '../components/Pagination';
import Figure from '../components/Figure';
import Screenshots from '../components/Screenshots';

export default function LucidLab() {

    useEffect(() => {
        document.title = 'LucidLab - An Adaptable, Heterogeneous Internet-of-things Testbed';
    }, []);

    const images = [
        { src:'/img/lucidlab1.jpg', caption:'Upload test configuration page' },
        { src:'/img/lucidlab3.jpg', caption:'Upload IoT controller page' },
        { src:'/img/lucidlab4.jpg', caption:'Upload image page' },
        { src:'/img/lucidlab2.jpg', caption:'Metrics page' },
    ];

    return (
        <>
        <Section>
            <h1 className='project-title'>LucidLab</h1>
            <h2 className='project-subtitle'>CS407: Group Project</h2>
            <p className='text-link-hover my-4'>October 2019 - May 2020</p>
            <p className='mb-4'>An adaptable, heterogeneous IoT testbed for which I developed the front-end user interface. The UI allows registered users to upload and configure tests and images to be deployed on the testbed. Additionally, test results and custom metrics including mote availability graphs and mote CCA charts can be viewed.</p>

            <div className='flex flex-row flex-wrap items-center mt-8'>
                <Chip name='React' />
                <Chip name='JavaScript' />
                <Chip name='Materialize' />
                <Chip name='HTML' />
                <Chip name='CSS' />
                <Chip disabled name='Python' />
                <Chip disabled name='Shell' />
                <Chip disabled name='C' />
                <Chip disabled name='SQL' />
            </div>
        </Section>

        <Divider />

        <Figure image={images[0]} />

        <Divider />

        <Section>
            <h2 className='project-header'>Abstract</h2>
            <p className='mb-4'>With the advent of smarter, low-power wireless sensor hardware (or “motes”) along with the influx of Internet of Things (IoT) devices, researchers are leveraging these technologies to form the networks underpinning “smart” homes and cities. Of vital importance in this process are wireless sensor network (WSN) testbeds, which allow researchers to debug the firmware that runs on motes. A particularly challenging exercise is presented when combining heterogeneous wireless sensor hardware and proprietary IoT devices on a single network, enabling development of applications that interact with both motes and IoT devices. Whilst existing WSN testbeds permit the use of a variety of sensor hardware, they do not allow interaction with off-the-shelf IoT devices, which already have a strong presence in many households. This report presents LucidLab, a WSN testbed designed to directly integrate IoT devices, facilitating the debugging of richer applications. In addition to the standard features of a WSN testbed, such as logging of output through a serial connection, LucidLab provides an adaptable architecture through simple and scalable addition of hardware. IoT integration is enabled using openHAB as an IoT substrate. Userscan control IoT devices on the network through scripts uploaded alongside firmware that interpret mote output to manage IoT devices accordingly. By virtue of LucidLab’s prompt logging process, mote output is quickly passed to the user-specified script, allowing responsive actuation of IoT devices. The proposed implementation provides a practical system combining IoT and WSN devices whilst offering a simple and intuitive deployment process, thereby enabling rapid testing of the applications forming the backbone of “smart”homes and cities</p>
        </Section>

        <Divider />

        <Screenshots images={images} />

        <Divider />
        
        <Pagination
            previousTitle='Logical Sudoku Solver'
            previousLink='/projects/sudoku'
            nextTitle='Portfolio'
            nextLink='/projects/portfolio'
        />
        </>
    );
}