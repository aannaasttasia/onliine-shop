import { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface JWTPayload{
    userId: number;
    admin: boolean;
    exp: number; 
    iat: number;
};

export function decodeToken(token: string): JWTPayload | null{
    try {
        const decoded = jwtDecode<JWTPayload>(token);
        console.log('Decoded JWT:', decoded);
        return decoded;
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null
    }
}

export default function useToken() {
    const [token, setTokenState] = useState<string|null>(null);
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const tokenString = sessionStorage.getItem('token');
            if (tokenString) {
                setTokenState(tokenString);
            }
        }
        console.log('useToken')
    }, []);
  
    function setToken(userToken: string) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('token', userToken);
        setTokenState(userToken);
      }
    }
  
    return { token, setToken };
}
