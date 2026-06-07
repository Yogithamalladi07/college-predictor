import { useState } from "react";
import "./App.css";

function App() {

  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("Gender-Neutral");
  const [branch, setBranch] = useState("");
  const [results, setResults] = useState([]);
  const [exam, setExam] = useState("JEE MAIN");
  const [loading, setLoading] = useState(false);
  
  async function predictCollege() {
    setLoading(true);
    const response = await fetch(
      "http://127.0.0.1:5000/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rank,
          category,
          gender,
          branch,
          exam
        })
      }
    );

    const data = await response.json();
    setLoading(false);
    if (Array.isArray(data)) {
      setResults(data);
    } else {
      setResults([]);
      alert(data.message || data.error);
    }
  }

  return (
    <div className="container">
      <div className = "card">
      <h1>College Predictor</h1>
      <p>
        Find colleges based on rank, category, branch and exam.
      </p>

      <label>Exam</label>
      <select 
      value = {exam}
      onChange = {(e) => setExam(e.target.value)}
      >
        <option value="JEE MAIN">JEE Main</option>
        <option value="JEE ADV">JEE Advanced</option>
      </select>

      <br></br>
      <br></br>

      <label>Rank</label>
      <input
        type="number"
        placeholder="Enter Rank"
        value={rank}
        onChange={(e) => setRank(e.target.value)}
      />

      <br /><br />

      <label>Category</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="OPEN">OPEN</option>
        <option value="EWS">EWS</option>
        <option value="OBC-NCL">OBC-NCL</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
      </select>

      <br /><br />
      <label>Gender</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="Gender-Neutral">
          Gender-Neutral
        </option>

        <option value="Female-only (including Supernumerary)">
          Female-only
        </option>
      </select>

      <br /><br />

      <label>Branch</label>
      <select
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      >
        <option value="">Any Branch</option>

        <option value="Computer Science">
          Computer Science Engineering
        </option>

        <option value="Information Technology">
          Information Technology
        </option>

        <option value="Artificial Intelligence">
          Artificial Intelligence
        </option>

        <option value="Artificial Intelligence and Machine Learning">
          AI & Machine Learning
        </option>

        <option value="Data Science">
          Data Science
        </option>

        <option value="Electronics and Communication">
          Electronics & Communication Engineering
        </option>

        <option value="Electrical Engineering">
          Electrical Engineering
        </option>

        <option value="Mechanical Engineering">
          Mechanical Engineering
        </option>

        <option value="Civil Engineering">
          Civil Engineering
        </option>

        <option value="Chemical Engineering">
          Chemical Engineering
        </option>

        <option value="Biotechnology">
          Biotechnology
        </option>

        <option value="Aerospace Engineering">
          Aerospace Engineering
        </option>

        <option value="Mining Engineering">
          Mining Engineering
        </option>

        <option value="Metallurgical">
          Metallurgical Engineering
        </option>

        <option value="Mathematics and Computing">
          Mathematics & Computing
        </option>

        <option value="Engineering Physics">
          Engineering Physics
        </option>

        <option value="Robotics">
          Robotics
        </option>

        <option value="VLSI">
          VLSI
        </option>
      </select>

      <br /><br />

      <button onClick={predictCollege} disabled={loading}>
        {loading ? "Predicting..." : "Predict Colleges"}
      </button>
      {loading && <p>🔍 Searching colleges...</p>}
      <hr />
      <h3 className="result-count">
        {results.length === 0
          ? "No colleges found"
          : `Found ${results.length} colleges`}
      </h3>
      {
        results.map((college, index) => (
          <div className="college-card">
            <h3>{college.Institute}</h3>

            <p>
              {college["Academic Program Name"]}
            </p>

            <p>
              Opening Rank:
              {" "}
              {college["Opening Rank"]}
            </p>

            <p>
              Closing Rank:
              {" "}
              {college["Closing Rank"]}
            </p>

          </div>
        ))
      }
    </div>
    </div>
  );
}

export default App;