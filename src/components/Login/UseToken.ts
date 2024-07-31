import { useEffect, useState } from 'react';

export default function useToken() {
    const [token, setTokenState] = useState<string | null>(null);
  
    useEffect(() => {
      const tokenString = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
      if (tokenString) {
        setTokenState(tokenString);
      }
    }, []);
  
    function setToken(userToken: string) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', userToken);
        setTokenState(userToken);
      }
    }
  
    return { token, setToken };
}