import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth";

/**
 * Component for creating a user in the users microservice.
 */
const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignUpError = (e: any) => {
    let status = e.response.status;

    switch (status) {
      case 409:
        setError("Email already in use");
        break;
      
      case 422:
        setError("Both email and password are required");
        break;
      
      default:
        setError("An unknown error occurred");
        break;
    }
  };  

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter an email and password");
      return;
    }

    try {
      await signUp(email, password);

      // Navigate on successful signup
      navigate("/");
    } catch (e) {
      handleSignUpError(e);
    }
  };

  return (
  <div>
    <h1>Sign Up</h1>
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
    <h1>{error}</h1>
  </div>
  );
};

export default SignUp;