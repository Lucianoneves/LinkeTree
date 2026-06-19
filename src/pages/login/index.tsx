import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword} from "firebase/auth";

import { Input } from "../../components/input";
import { auth } from "../../firebase/firebaseConnection";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.trim() === "" || password === "") {
      alert("Email ou senha inválidos");
      return;
    }

    try {
    
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/admin", { replace: true });
    } catch (err) {
      console.log("Login falhou com o erro:", err);
      alert("Não foi possível fazer login. Verifique email e senha.");
    }
  }


  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to="/">
        <h1 className=" mt-11 text-white mb-7 font-bold text-5xl"> Luciano
          <span className="bg-linear-to-r  from-yellow-500 to-orange-400 bg-clip-text text-transparent">Link</span></h1>

      </Link>

      <form onSubmit={handleSubmit} className=" w-full max-w-xl flex flex-col px-1">
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-yellow-600 text-white px-4 py-2 rounded-md text-lg cursor-pointer">
          Login
        </button>
      </form>
    </div>
  )
}