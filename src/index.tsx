import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ScrollTop } from './components/ScrollTop';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import './index.css';
import './tailwind.output.css';
import reportWebVitals from './reportWebVitals';

// Main pages.
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/404';

// Project pages.
import SortingVisualiser from './pages/projects/SortingVisualiser';
import DeliveryPlanner from './pages/projects/DeliveryPlanner';
import ToDoList from './pages/projects/ToDoList';
import BSplit from './pages/projects/BSplit';
import CavernMinesweeper from './pages/projects/CavernMinesweeper';
import GraphVisualiser from './pages/projects/GraphVisualiser';
import URLShortener from './pages/projects/URLShortener';
import RSCBot from './pages/projects/RSCBot';
import RollerCoaster from './pages/projects/RollerCoaster';
import CaveExploration from './pages/projects/CaveExploration';
import Minesweeper from './pages/projects/Minesweeper';
import Sudoku from './pages/projects/Sudoku';
import LucidLab from './pages/projects/LucidLab';
import Portfolio from './pages/projects/Portfolio';

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollTop />
    <div className="App">
      <Nav />
      <main className="bg-background bg-noise bg-repeat leading-[1.6rem]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/projects/sorting-algorithm-visualiser"
            element={<SortingVisualiser />}
          />
          <Route
            path="/projects/delivery-route-planner"
            element={<DeliveryPlanner />}
          />
          <Route path="/projects/todo-list" element={<ToDoList />} />
          <Route path="/projects/bsplit" element={<BSplit />} />
          <Route
            path="/projects/cavern-minesweeper"
            element={<CavernMinesweeper />}
          />
          <Route
            path="/projects/graph-algorithm-visualiser"
            element={<GraphVisualiser />}
          />
          <Route path="/projects/url-shortener" element={<URLShortener />} />
          <Route path="/projects/rscbot" element={<RSCBot />} />
          <Route path="/projects/roller-coaster" element={<RollerCoaster />} />
          <Route
            path="/projects/cave-exploration"
            element={<CaveExploration />}
          />
          <Route path="/projects/react-minesweeper" element={<Minesweeper />} />
          <Route path="/projects/sudoku" element={<Sudoku />} />
          <Route path="/projects/lucidlab" element={<LucidLab />} />
          <Route path="/projects/portfolio" element={<Portfolio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </BrowserRouter>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
