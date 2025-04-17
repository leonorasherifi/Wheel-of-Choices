import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../App.css';

const NamesWheel = () => {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const canvasRef = useRef(null);
  const wheelRef = useRef(null);

  useEffect(() => {
    drawWheel();
  }, [names]);

  const addName = () => {
    if (newName.trim() && !names.includes(newName.trim())) {
      setNames([...names, newName.trim()]);
      setNewName("");
    }
  };

  const removeNameFromList = (nameToRemove) => {
    setNames(names.filter((name) => name !== nameToRemove));
    
    // If the modal is open and the selected name is removed, close the modal
    if (selected === nameToRemove) {
      setShowModal(false);
      setSelected(null);
    }
  };

  const spinWheel = () => {
    if (names.length === 0) return;
    const spins = 5;
    const anglePerSlice = 360 / names.length;
    const randomIndex = Math.floor(Math.random() * names.length);
    const targetAngle = randomIndex * anglePerSlice;
    const newRotation = rotation + spins * 360 - targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setSelected(names[randomIndex]);
      setShowModal(true);
    }, 2000);
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / Math.max(names.length, 1);
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Define a color palette that fits the theme
    const colors = [
      "#E09F3E", "#9E2A2B", "#540B0E", "#D88C3E", "#B85231", "#70161E",
      "#F77F00", "#FFBA08", "#E63946", "#F4A261", "#D62828", "#E85D04"
    ];
    
  
    names.forEach((name, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;
  
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      
      ctx.fillStyle = colors[index % colors.length]; // Rotate through predefined colors
      ctx.fill();
      // ctx.stroke();
  
      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.fillStyle = "#ffffff";
      ctx.font = "14px Poppins, Arial";
      ctx.textAlign = "right";
      ctx.fillText(name, radius - 10, 5);
      ctx.restore();
    });
  };
  

  return (
    <div className="NamesWheel">
      <div className="flex flex-col items-center gap-8 p-10">
        <h1 className="wheel-title text-5xl font-bold text-center">Wheel of Names</h1>

        {/* Wheel and Spin Button */}
        <div className="relative my-4">
          {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-6 bg-red-500 clip-triangle"></div> */}
          <motion.div
          onClick={spinWheel}
            ref={wheelRef}
            className="relative"
            animate={{ rotate: rotation }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <canvas ref={canvasRef} width={300} height={300} className="border rounded-full" />
          </motion.div>
        </div>

        {/* <button onClick={spinWheel} className="bg-blue-500 text-white px-4 py-2 rounded">
          Spin
        </button> */}

        
        {/* Input & Add Button */}
        <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addName()}  // Handles Enter key
          className="wheel-input border p-2 rounded"
          placeholder="Enter name"
          style={{ color: names.includes(newName.trim()) ? "red" : "black" }}
        />
          <button onClick={addName} className="add-button  text-white px-4 py-2 rounded">
            Add
          </button>
        </div>

        {/* List of Added Names with Expand/Collapse Feature */}
        <div className="w-full max-w-sm">
          <AnimatePresence>
            {names.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gray-100 p-2 rounded-lg shadow-md"
              >
                {names.slice(0, expanded ? names.length : 3).map((name, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm my-1"
                  >
                    <span>{name}</span>
                    <button
                      onClick={() => removeNameFromList(name)}
                      className="delete-button text-white px-2 py-1 rounded text-sm"
                    >
                      X
                      {/* 🗑️ */}
                    </button>
                  </motion.div>
                ))}

                {/* Show More / Show Less Button */}
                {names.length > 3 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-blue-500 text-sm mt-2"
                  >
                    {expanded ? "Show Less ▲" : "Show More ▼"}
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal for Selected Name */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
              <h2 className="text-xl font-bold text-[#003049]">Selected Name:</h2>
              <h2 className="winer-name text-xl font-bold text-[#003049]">{selected}</h2>
              <div className="flex gap-4 mt-4 justify-center">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="bg-[#E09F3E] text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                  Confirm
                </button>
                <button  
                  onClick={() => removeNameFromList(selected)} 
                  className="bg-[#9E2A2B] text-white px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out">
                  Remove
                </button>
              </div>
            </div>
          </div>

        )}
        
      </div>
    </div>
  );
};

export default NamesWheel;
