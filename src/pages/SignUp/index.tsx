import { useState, FormEvent } from "react";
import { signUp } from "../../api/auth";

const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<string>("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter an email and password");
      return;
    }

    let signUpRes = signUp(email, password);
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