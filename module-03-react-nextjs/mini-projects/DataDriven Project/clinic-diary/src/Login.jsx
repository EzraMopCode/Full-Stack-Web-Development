import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth.js";
import { Button } from "./ui/Button.jsx";

export default function Login() {
  const [name, setName] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/diary";

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    signIn(name.trim());
    navigate(from, { replace: true });
  }

  return (
    <section>
      <h1>Staff sign in</h1>
      <p>Demo only — any name signs you in.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <Button type="submit">Sign in</Button>
      </form>
    </section>
  );
}
