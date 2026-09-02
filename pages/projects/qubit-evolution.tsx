import { Divider } from '@components/Divider';
import { ImageFigure } from '@components/ImageFigure';
import { Layout } from '@components/Layout';
import { Pagination } from '@components/Pagination';
import { ProjectHeader } from '@components/ProjectHeader';
import { Screenshots } from '@components/Screenshots';
import { Section } from '@components/Section';
import imageVisualiser from '@image/qubit-evolution.jpg';
import imageEigenstate from '@image/qubit-evolution2.jpg';
import { fetchGitHubStargazerCount } from '@utilities/fetchGitHubStargazerCount';
import { getProjectData } from '@utilities/Project';
import { ProjectPageProps } from '@utilities/types';
import { GetStaticProps } from 'next';
import React from 'react';

const QubitEvolution: React.FC<ProjectPageProps> = ({
  images,
  project,
  githubStargazerCount,
}) => (
  <Layout title="Qubit Evolution - Interactive Single-Qubit Visualiser">
    <ProjectHeader
      project={project}
      githubStargazerCount={githubStargazerCount}
    />

    <Divider />

    <ImageFigure image={images[0]} />

    <Divider />

    <Section>
      <h2 className="project-header">Overview</h2>
      <p className="max-w-reading mb-4">
        Qubit Evolution is an interactive visualiser for single-qubit
        Schrödinger evolution. Users tune the Hamiltonian parameters ω, Ω
        <sub>x</sub>, and Ω<sub>y</sub>, pick an initial state, and watch the
        Bloch vector precess while the same state is shown as a Diract ket, Pauli
        expectations, and computational-basis probabilities.
      </p>
      <p className="max-w-reading">
        The Hamiltonian is the energy operator: a 2x2 Hermitian matrix formed
        as a real linear combination of Pauli matrices. Users can choose from presets for Larmor precession, resonant Rabi driving, and detuned Rabi.
        Hovering over the current state or an energy eigenstate opens a popover with the corresponding ket and eigenvalue.
      </p>
    </Section>

    <Divider />

    <Section>
      <h2 className="project-header">Key Features</h2>
      <ul className="project-list max-w-reading">
        <li className="mb-4">
          <strong>Tunable Hamiltonian</strong>
          <br />
          Sliders for tuning the Hamiltonian parameters ω, Ω<sub>x</sub>, and Ω<sub>y</sub>, plus presets for
          Larmor precession, resonant Rabi driving, and detuned Rabi.
        </li>
        <li className="mb-4">
          <strong>Initial state</strong>
          <br />
          Computational basis |0⟩ and |1⟩, superpositions |+⟩ and |−⟩, and
          circular states |+i⟩ and |-i⟩.
        </li>
        <li className="mb-4">
          <strong>Live Dirac panel</strong>
          <br />
          Current ket, evolution formula, Bloch vector ⟨σ⟩, Born-rule bars for
          P(|0⟩) and P(|1⟩), and a plot of those probabilities versus t.
        </li>
        <li className="mb-4">
          <strong>Playback</strong>
          <br />
          Play, pause, and reset, with keyboard shortcuts, so users
          can step through the evolution at their own pace.
        </li>
      </ul>
    </Section>

    <Divider />

    <Screenshots images={images} />

    <Divider />

    <Pagination
      previousTitle="Solar System"
      previousLink="/projects/solar-system"
    />
  </Layout>
);

export const getStaticProps: GetStaticProps<ProjectPageProps> = async () => {
  const images = [
    {
      imageData: imageVisualiser,
      alt: 'Qubit Evolution: Bloch sphere, Hamiltonian controls, and Dirac notation',
    },
    {
      imageData: imageEigenstate,
      alt: 'Qubit Evolution: energy eigenstate popover on the Bloch sphere',
    },
  ];

  const githubStargazerCount = await fetchGitHubStargazerCount(
    'qubit-evolution',
  );

  return {
    props: {
      images: images,
      project: getProjectData('qubit-evolution'),
      ...(githubStargazerCount !== undefined && { githubStargazerCount }),
    },
    revalidate: 3600,
  };
};

export default QubitEvolution;
