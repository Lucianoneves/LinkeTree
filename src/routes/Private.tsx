 

import { type ReactNode, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConnection";
import { onAuthStateChanged } from 'firebase/auth'
import { Navigate } from "react-router-dom";

interface PrivateProps {
    children: ReactNode
}


export function Private({ children }: PrivateProps): ReactNode | null {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    id: user?.uid,
                    email: user?.email
                }

                sessionStorage.setItem("userData", JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            } else {
                sessionStorage.removeItem("userData");
                localStorage.removeItem("userData");
                setLoading(false);
                setSigned(false);

            }
        }); 

        return () =>{
            unsubscribe();
        }
    }, []);

    if (loading) {
        return <div></div>;
    }

    if (!signed) {
        return <Navigate to="/login" />
    }

    return children;


}
