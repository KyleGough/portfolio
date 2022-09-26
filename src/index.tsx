import './index.css';
import './tailwind.output.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { ScrollTop } from './components/ScrollTop';
import { NotFound } from './pages/404';
import { About } from './pages/About';
// Main pages.
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import { Projects } from './pages/Projects';
import { BSplit } from './pages/projects/BSplit';
import { CaveExploration } from './pages/projects/CaveExploration';
import { CavernMinesweeper } from './pages/projects/CavernMinesweeper';
import { DeliveryPlanner } from './pages/projects/DeliveryPlanner/DeliveryPlanner';
import { GraphVisualiser } from './pages/projects/GraphVisualiser';
import { LucidLab } from './pages/projects/LucidLab';
import { Minesweeper } from './pages/projects/Minesweeper';
import { Portfolio } from './pages/projects/Portfolio';
import { RollerCoaster } from './pages/projects/RollerCoaster';
import { RSCBot } from './pages/projects/RSCBot';
// Project pages.
import { SortingVisualiser } from './pages/projects/SortingVisualiser';
import { Sudoku } from './pages/projects/Sudoku/Sudoku';
import { ToDoList } from './pages/projects/ToDoList/ToDoList';
import { URLShortener } from './pages/projects/URLShortener/URLShortener';
import reportWebVitals from './reportWebVitals';

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
