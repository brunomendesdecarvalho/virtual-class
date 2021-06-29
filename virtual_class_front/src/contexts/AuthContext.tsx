import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/apiClient';

type Classroom = {
  url: string;
  disciplina: string;
}

type User = {
  username: string;
  salas: Classroom[];
  is_admin: boolean;
  is_aluno: boolean;
  is_teacher: boolean;
};

type SignInCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const { 'nextauth.authenticatedUser': userCookie } = parseCookies();
    if (!!userCookie) {
      setUser(JSON.parse(userCookie));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          Router.push('/login');
          break;
        case 'signIn':
          Router.push('/classrooms');
          break;
        default:
          break;
      }
    };
  }, []);


  function getUserId(username: string): number {
    switch (username) {
      case "admin":
        return 1
      case "professor":
        return 2
      case "aluno":
        return 3
      default:
        return -1
    }
  }
  
  async function signIn({ username, password }: SignInCredentials) {
    const userId = getUserId(username);

    const response = await api.get("/users/" + userId);
    const userResponse = response.data;

    if (password === userResponse.password) {
      setCookie(undefined, 'nextauth.authenticatedUser', JSON.stringify(userResponse), {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      Router.push('/classrooms');
      return
    }

    throw new Error("Login failed");
  }

  function signOut() {
    destroyCookie(undefined, 'nextauth.authenticatedUser');

    authChannel.postMessage('signOut');

    setUser(undefined);
    setIsAuthenticated(false);

    Router.push('/');
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
