import { useState, useEffect } from "react";
import "./App.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Login from "./Login";
import Signup from "./Signup";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState("");
  const [category, setCategory] = useState("OPEN");
  const [gender, setGender] = useState("Gender-Neutral");
  const [branch, setBranch] = useState("");
  const [results, setResults] = useState([]);
  const [exam, setExam] = useState("JEE MAIN");
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [page, setPage] = useState("home");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (page === "home") {
  return (
    <Home
      onLogin={() => setPage("login")}
      onSignup={() => setPage("signup")}
      onStart={() => setPage("signup")}
    />
  );
}
  if (!user && page !== "home") {
  return (
    <div className="auth-page">
      {page === "login" ? (
        <Login
          switchToSignup={() => setPage("signup")}
          goHome={() => setPage("home")}
        />
      ) : (
        <Signup
          switchToLogin={() => setPage("login")}
          goHome={() => setPage("home")}
        />
      )}
    </div>
  );
}
    const logout = async () => {
      await signOut(auth);
      setPage("home");
    };
  function downloadExcel() {
  if (results.length === 0) {
    alert("No results to download");
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(results);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Colleges"
  );
  const excelBuffer = XLSX.write(
    workbook,
    {
      bookType: "xlsx",
      type: "array"
    }
  );
  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }
  );
  saveAs(
    fileData,
    "college_predictions.xlsx"
  );
}
async function predictCollege() {
  setLoading(true);
  setSearched(true);
  try {
    console.log("Predicting colleges");

    const response = await fetch("https://your-backend-url.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rank,
          category,
          gender,
          branch,
          exam
        }),
      }
    );

    const data = await response.json();
    console.log("Total returned:", Array.isArray(data) ? data.length : 0);
    if (Array.isArray(data)) {
  setResults(data);
} else {
  setResults([]);
}
  } catch (err) {
    console.error("FETCH ERROR:", err);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="app">
    <div className="container">

  <button
    className="back-btn"
    onClick={() => setPage("home")}
  >
    <FaArrowLeft />
  </button>

  <div className="card">
      <h1>College Predictor</h1>
      <div className="logout-icon" onClick={logout}>
        <FaSignOutAlt />
      </div>
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
      {searched && (
  <>
    {results.length > 0 ? (
      <h3 className="result-count">
        🎓 Found {results.length} colleges
      </h3>
    ) : (
      !loading && (
        <div className="no-results">
          <h3>🔍 No Colleges Found</h3>
          <p>
            Try changing your rank, category,
            gender, or branch selection.
          </p>
        </div>
      )
    )}
  </>
)}
      {
        results.map((college, index) => (
          <div key={index} className="college-card">
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
    {searched && (
      <>
        {results.length > 0 && (
    <button
      className="download-fab"
      onClick={downloadExcel}
    >
      <FaDownload />
    </button>
  )}
      </>
    )}
    </div>
  </div>
  );
}

export default App;