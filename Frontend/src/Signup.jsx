// Signup.jsx
import { useState, useContext, useEffect } from "react";
import { MyContext } from "./MyContent";
import "./Signup.css";

function Signup() {
  const { theme } = useContext(MyContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example placeholder for backend request
    console.log("User details:", formData);

    // Here you would send data to backend using fetch/axios:
    // await fetch("http://localhost:8080/api/signup", { method: "POST", ... })

    alert("Account created successfully!");
  };

  // Apply theme automatically
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className={`signup-container ${theme}`}>
      <div className="signup-box">
        <h2>Welcome to HelpGPT</h2>
        <p>Create your account to continue</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        <p className="login-note">
          Already have an account? <span className="link">Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
