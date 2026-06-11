import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

function Signup({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    } catch (error) {
  if (error.code === "auth/email-already-in-use") {
    setErrorMsg("Email already exists");
  } else if (error.code === "auth/weak-password") {
    setErrorMsg("Password must be at least 6 characters");
  } else {
    setErrorMsg("Signup failed");
  }
}
  };

  return (
    <div>
      <h2>Signup</h2>
        {errorMsg && (
        <p style={{
            color: "#ef4444",
            textAlign: "center",
            marginTop: "10px"
        }}>
            {errorMsg}
        </p>
        )}
      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br /><br />

      <button onClick={handleSignup}>
        Sign Up
        </button>

<p
  onClick={() => switchToLogin()}
  style={{
    textAlign: "center",
    marginTop: "15px",
    cursor: "pointer",
    color: "#6c63ff"
  }}
>
  Already have an account? Login
</p>
    </div>
  );
}

export default Signup;