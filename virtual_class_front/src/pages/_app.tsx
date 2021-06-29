import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import React from 'react';
import { Header } from '../components/Header';
import { AuthProvider } from '../contexts/AuthContext';
import { ClassroomsProvider } from '../hooks/useClassrooms';
import { NewClassroomModal } from '../components/Modals/NewClassroomModal';
import { AssignmentsProvider } from '../hooks/useAssignments';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ClassroomsProvider>
        <AssignmentsProvider>
          <ChakraProvider theme={theme}>
            <Header />
            <Component {...pageProps} />
          </ChakraProvider>
        </AssignmentsProvider>
      </ClassroomsProvider>
    </AuthProvider>
  );
}

export default MyApp;
