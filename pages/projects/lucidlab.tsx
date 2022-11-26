import React from 'react';

import { Divider } from '../../components/Divider';
import { ImageFigure } from '../../components/ImageFigure';
import { Layout } from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { ProjectHeader } from '../../components/ProjectHeader';
import { Screenshots } from '../../components/Screenshots';
import { Section } from '../../components/Section';
import { getProjectData } from '../../data';

const images = [
  { src: '/img/lucidlab1.jpg', caption: 'Upload test configuration page' },
  { src: '/img/lucidlab4.jpg', caption: 'Upload IoT controller page' },
  { src: '/img/lucidlab5.jpg', caption: 'Upload image page' },
  { src: '/img/lucidlab2.jpg', caption: 'Mote RSSI Map' },
  { src: '/img/lucidlab3.jpg', caption: 'Mote CCA Charts' },
];

const project = getProjectData('lucidlab');

const LucidLab: React.FC = () => (
  <Layout title="LucidLab - An Adaptable, Heterogeneous Internet-of-things Testbed">
    <ProjectHeader project={project} />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Abstract</h2>
      <p className="mb-4 max-w-reading">
        With the advent of smarter, low-power wireless sensor hardware (or
        “motes”) along with the influx of Internet of Things (IoT) devices,
        researchers are leveraging these technologies to form the networks
        underpinning “smart” homes and cities. Of vital importance in this
        process are wireless sensor network (WSN) testbeds, which allow
        researchers to debug the firmware that runs on motes. A particularly
        challenging exercise is presented when combining heterogeneous wireless
        sensor hardware and proprietary IoT devices on a single network,
        enabling development of applications that interact with both motes and
        IoT devices. Whilst existing WSN testbeds permit the use of a variety of
        sensor hardware, they do not allow interaction with off-the-shelf IoT
        devices, which already have a strong presence in many households.
      </p>
      <p className="mb-4 max-w-reading">
        This report presents LucidLab, a WSN testbed designed to directly
        integrate IoT devices, facilitating the debugging of richer
        applications. In addition to the standard features of a WSN testbed,
        such as logging of output through a serial connection, LucidLab provides
        an adaptable architecture through simple and scalable addition of
        hardware. IoT integration is enabled using openHAB as an IoT substrate.
      </p>
      <p className="mb-4 max-w-reading">
        Users can control IoT devices on the network through scripts uploaded
        alongside firmware that interpret mote output to manage IoT devices
        accordingly. By virtue of LucidLab’s prompt logging process, mote output
        is quickly passed to the user-specified script, allowing responsive
        actuation of IoT devices. The proposed implementation provides a
        practical system combining IoT and WSN devices whilst offering a simple
        and intuitive deployment process, thereby enabling rapid testing of the
        applications forming the backbone of “smart”homes and cities
      </p>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Logical Sudoku Solver"
      previousLink="/projects/sudoku"
      nextTitle="Portfolio"
      nextLink="/projects/portfolio"
    />
  </Layout>
);

export default LucidLab;