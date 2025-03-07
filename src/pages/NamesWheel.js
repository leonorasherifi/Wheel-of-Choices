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

    names.forEach((name, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.fillStyle = `hsl(${(index * 360) / names.length}, 100%, 50%)`;
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.textAlign = "right";
      ctx.fillText(name, radius - 10, 5);
      ctx.restore();
    });
  };

  return (
    <div className="NamesWheel">
      <div className="flex flex-col items-center p-6 relative">
        <h1 className="text-2xl font-bold mb-4">Wheel of Names</h1>

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
            <canvas ref={canvasRef} width={300} height={300} className="bg-white border rounded-full" />
          </motion.div>
        </div>

        {/* <button onClick={spinWheel} className="bg-blue-500 text-white px-4 py-2 rounded">
          Spin
        </button> */}

        
        {/* Input & Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter name"
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
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-xl font-bold">Selected Name: {selected}</h2>
              <div className="flex gap-4 mt-4">
                <button onClick={() => setShowModal(false)} className="bg-green-500 text-white px-4 py-2 rounded">
                  Confirm
                </button>
                <button  onClick={() => removeNameFromList(selected)} className="bg-red-500 text-white px-4 py-2 rounded">
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
