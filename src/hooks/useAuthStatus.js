import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

function useAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const isMounted = useRef(true);


  useEffect(() => {
    if(isMounted){
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setLoggedIn(true);
          }
          setCheckingStatus(false);
        });   
    }

    return () => {
        isMounted.current = false
    }
  }, [isMounted]);

  return { loggedIn, checkingStatus };
}

// Protected Routes Version 6
// https://stackoverflow.com/questions/65505665/protected-route-with-firebase

//Fix Memory LeaK Warning
// https://stackoverflow.com/questions/59780268/cleanup-memory-leaks-on-an-unmounted-component-in-react-hooks

export default useAuthStatus;
