import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NamesWheel from "./pages/NamesWheel";
import NumbersWheel from "./pages/NumbersWheel";
import ColorsWheel from "./pages/ColorsWheel";

const SpinningWheel = ({ title }) => {
  return (
    <div className="wheel-card flex flex-col items-center p-4 border rounded-lg shadow-lg w-80">
      <img 
        src={`/images/spinning-wheel-1.png`}
        alt={`${title} Wheel`} 
        className="w-52 h-52 object-cover mb-3"
      />
      {/* <h2 className="text-xl font-bold mb-2">{title}</h2> */}
      <Link to={`/${title.toLowerCase()}`}>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
         {title} 
        </button>
      </Link>
    </div>

  );
};

const Home = () => (
  <div className="flex flex-col items-center gap-8 p-10">
  <h1 className="wheel-title text-5xl font-bold text-center">Wheel Of Choices</h1>
  <div className="cards-section flex flex-wrap justify-center gap-6 w-full">
    <SpinningWheel title="Names" />
    <SpinningWheel title="Numbers" />
    <SpinningWheel title="Colors" />
  </div>
</div>

);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/names" element={<NamesWheel />} />
        <Route path="/numbers" element={<NumbersWheel />} />
        <Route path="/colors" element={<ColorsWheel />} />
      </Routes>
    </Router>
  );
};

export default App;
