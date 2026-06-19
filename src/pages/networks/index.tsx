
import { useState, type FormEvent, useEffect } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { Header } from "../../components/Header";
import { Input } from "../../components/input";
import { auth, db } from "../../firebase/firebaseConnection";

export default function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youTubeInput, setYouTubeInput] = useState("");


  useEffect(() => {
   function loadLinks(){
    const deocRef = doc(db, "social", "Link");
    getDoc(deocRef)
    .then ((snapshot) => { 
      if (snapshot.data() !== undefined) {
        setFacebook(snapshot.data()?.facebook || "");
        setInstagram(snapshot.data()?.instagram || "");
        setYouTubeInput(snapshot.data()?.youTube || "");
       
      }
    })
   }
   loadLinks();
  }, []);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Você precisa estar logado para salvar.");
      return;
    }

    try {
      await setDoc(
        doc(db, "social", "Link"),
        {
          userId: user.uid,
          facebook: facebook,
          instagram: instagram,
          youTube: youTubeInput,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
      alert("Cadastro realizado com sucesso");
    } catch (error) {
      console.log(error);
      alert("Sem permissão para salvar. Verifique as regras do Firestore.");
    }
  } 

  return (
    <div className=" flex items-center flex-col justify-center h-screen">

      <Header />

      <h1 className=" text-white  text-2xl font-medium mt-8 mb-4"> Minhas Redes Sociais </h1>

      <form className=" flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
        <label className=" text-white font-medium mt-2 mb-2"> Link do Facebook</label>
        <Input
        type="url"
          placeholder="Digite a url do  Facebook"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />

        <label className=" text-white font-medium mt-2 mb-2"> Link do Instagram</label>
        <Input
        type="url"
          placeholder="Digite a url do  Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className=" text-white font-medium mt-2 mb-2"> Link do YouTube</label>
        <Input
          type="url"
          placeholder="Digite a url do  YouTube"
          value={youTubeInput}
          onChange={(e) => setYouTubeInput(e.target.value)}
        />

        <button type="submit"
         className="mb-7 bg-blue-600 h-9 rounded-md text-white font-medium gap-4 justify-center items-center w-full  max-w-xl  cursor-pointer"  >
          Salvar Links
        </button>
      </form>
     
    </div>
  )
}