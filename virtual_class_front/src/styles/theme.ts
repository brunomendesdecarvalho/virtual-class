import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    yellow: {
      '500': '#FFC43B',
    },
    green: {
      '500': '#6ec17d',
    },
    blue: {
      '500': '#3A5AFF',
    },
    red: {
      '500': '#FF3B53',
    },
    gray: {
      '800': "#333333",
      '600': '#47585B',
      '500': '#999',
      '100': '#DADADA',
      '50': '#F5F8FA',
    },
    black: "#2F281E"
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'black',
      },
    },
  },
});
