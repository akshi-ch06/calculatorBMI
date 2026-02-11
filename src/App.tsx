import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    result: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    // Validation
    if (!weight || !height || weight <= 0 || height <= 0) {
      alert("Please enter valid weight and height");
      return;
    }

    // Convert height from cm to meters
    const heightInMeter = height / 100;

    // BMI formula
    const bmi = weight / (heightInMeter * heightInMeter);

    // Set result (2 decimal places)
    setFormData((prev) => ({
      ...prev,
      result: bmi.toFixed(2),
    }));
  };

  return (
    <div className="flex flex-col gap-3 items-center mt-10">
      <h1 className="text-2xl font-bold">BMI Calculator</h1>

      <form
        className="flex flex-col gap-3 w-64"
        onSubmit={handleSubmit}
      >
        {/* Weight */}
        <div className="flex flex-col gap-1">
          <label htmlFor="weight">Weight (kg):</label>
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="Enter weight"
            required
            value={formData.weight}
            onChange={handleChange}
            className="rounded-md border-2 p-1"
          />
        </div>

        {/* Height */}
        <div className="flex flex-col gap-1">
          <label htmlFor="height">Height (cm):</label>
          <input
            type="number"
            name="height"
            id="height"
            placeholder="Enter height"
            required
            value={formData.height}
            onChange={handleChange}
            className="rounded-md border-2 p-1"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Calculate
        </button>

        {/* Result */}
        <div className="flex flex-col gap-1">
          <label htmlFor="result">Your BMI:</label>
          <input
            type="text"
            name="result"
            id="result"
            value={formData.result}
            readOnly
            className="rounded-md border-2 p-1 bg-gray-100"
          />
        </div>
      </form>
    </div>
  );
}

export default App;
