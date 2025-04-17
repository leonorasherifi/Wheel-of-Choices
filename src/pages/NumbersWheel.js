import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import '../App.css';

const NumbersWheel = () => {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [numbers, setNumbers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [error, setError] = useState("");
  const canvasRef = useRef(null);

  useEffect(() => {
    drawWheel();
  }, [numbers]);

  const generateNumbers = () => {
    const minNum = parseInt(min, 10);
    const maxNum = parseInt(max, 10);
    if (minNum >= 0 && maxNum >= minNum) {
      const range = [];
      for (let i = minNum; i <= maxNum; i++) {
        range.push(i);
      }
      setNumbers(range);
      setError("");
    } else {
      setError("Invalid range. Make sure Min ≤ Max and both are non-negative.");
    }
  };

  const spinWheel = () => {
    if (numbers.length === 0) return;
    const spins = 5;
    const anglePerSlice = 360 / numbers.length;
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const targetAngle = randomIndex * anglePerSlice;
    const newRotation = rotation + spins * 360 - targetAngle;
    setRotation(newRotation);

    setTimeout(() => {
      setSelected(numbers[randomIndex]);
      setShowModal(true);
    }, 2000);
  };

  const drawWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const radius = canvas.width / 2;
    const sliceAngle = (2 * Math.PI) / Math.max(numbers.length, 1);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = [
      "#E09F3E", "#9E2A2B", "#540B0E", "#D88C3E", "#B85231", "#70161E",
      "#F77F00", "#FFBA08", "#E63946", "#F4A261", "#D62828", "#E85D04"
    ];

    numbers.forEach((number, index) => {
      const startAngle = index * sliceAngle;
      const endAngle = (index + 1) * sliceAngle;

      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(radius, radius, radius, startAngle, endAngle);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      ctx.save();
      ctx.translate(radius, radius);
      ctx.rotate(startAngle + sliceAngle / 2);
      ctx.fillStyle = "#fff";
      ctx.font = "14px Poppins, Arial";
      ctx.textAlign = "right";
      ctx.fillText(number.toString(), radius - 10, 5);
      ctx.restore();
    });
  };

  return (
    <div className="NumbersWheel">
      <div className="flex flex-col items-center gap-8 p-10">
        <h1 className="wheel-title text-5xl font-bold text-center">Lucky Numebr</h1>

        {/* Wheel */}
        <div className="relative my-4">
          <motion.div
            onClick={spinWheel}
            animate={{ rotate: rotation }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="cursor-pointer"
          >
            <canvas ref={canvasRef} width={300} height={300} className="border rounded-full" />
          </motion.div>
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 items-center">
            <input
              type="number"
              min="0"
              max="100"
              value={min}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (e.target.value === "" || (value >= 0 && value <= 100)) {
                  setMin(e.target.value);

                  const numMax = parseInt(max, 10);
                  if (max !== "" && value > numMax) {
                    setError("Min cannot be greater than Max.");
                  } else if (max !== "" && value === numMax) {
                    setError("Min and Max cannot be the same.");
                  } else {
                    setError("");
                  }
                }
              }}
              placeholder="Min"
              className="border p-2 rounded w-20"
            />

            <span className="numbers-arrow text-xl">→</span>

            <input
              type="number"
              min="0"
              max="100"
              value={max}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (e.target.value === "" || (value >= 0 && value <= 100)) {
                  setMax(e.target.value);

                  const numMin = parseInt(min, 10);
                  if (min !== "" && value < numMin) {
                    setError("Max cannot be smaller than Min.");
                  } else if (min !== "" && value === numMin) {
                    setError("Min and Max cannot be the same.");
                  } else {
                    setError("");
                  }
                }
              }}
              placeholder="Max"
              className="border p-2 rounded w-20"
            />

            <button
              onClick={generateNumbers}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={!!error || min === "" || max === ""}
            >
              Generate
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm w-full">
              <h2 className="text-xl font-bold text-[#003049]">Your LUCKY Number is :</h2>
              <h2 className="winer-number text-xl font-bold text-[#003049]">{selected}</h2>
              <button 
                onClick={() => setShowModal(false)} 
                className="bg-[#E09F3E] text-white px-6 py-3 mt-4 rounded-lg shadow-md transition duration-300 ease-in-out">
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default NumbersWheel;
