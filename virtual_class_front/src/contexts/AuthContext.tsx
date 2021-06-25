import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/api';

type Classroom = {
  url: string;
  disciplina: string;
}

type User = {
  username: string;
  salas: Classroom[];
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

export function signOut() {
  destroyCookie(undefined, 'nextauth.token');
  destroyCookie(undefined, 'nextauth.refreshToken');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

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

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      api
        .get('/users')
        .then(response => {
          const { username, salas } = response.data;
          setUser({ username, salas });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post('api/token/', {
        username,
        password,
      });

      const { access, refresh } = response.data;

      setCookie(undefined, 'nextauth.token', access, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      setCookie(undefined, 'nextauth.refreshToken', refresh, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });

      
      api.defaults.headers['Authorization'] = `Bearer ${access}`;

      Router.push('/classrooms');

      authChannel.postMessage('signIn');
    } catch (err) {
      throw err;
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
