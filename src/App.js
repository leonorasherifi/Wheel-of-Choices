import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import NamesWheel from "./pages/NamesWheel";
import NumbersWheel from "./pages/NumbersWheel";
import ColorsWheel from "./pages/ColorsWheel";

const SpinningWheel = ({ title }) => {
  return (
   <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg w-80">
  <img 
    src={`/images/spinning-wheel.jpg`}
    alt={`${title} Wheel`} 
    className="w-24 h-24 object-cover mb-3"
  />
  {/* <h2 className="text-xl font-bold mb-2">{title}</h2> */}
  <Link to={`/${title.toLowerCase()}`}>
    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
    Wheel of {title} 
    </button>
  </Link>
</div>

  );
};

const Home = () => (
  <div className="flex flex-col items-center gap-8 p-10">
  <h1 className="text-3xl font-bold text-center">Spinning Wheel App</h1>
  <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
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
