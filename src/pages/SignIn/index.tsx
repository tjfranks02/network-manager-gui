import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../api/auth";

/**
 * Component for signing in a user with the users microservice.
 */
const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignInError = (e: any) => {
    let status = e.response.status;

    switch (status) {
      case 401:
      case 409:
        setError("Incorrect email or password");
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
      let signInRes = await signIn(email, password);

      // Handle successful sign in
      navigate("/");
    } catch (e) {
      handleSignInError(e);
    }
  };

  return (
  <div>
    <h1>Sign In</h1>
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
      <button type="submit">Sign In</button>
    </form>
    <h1>{error}</h1>
  </div>
  );
};

export default SignIn;