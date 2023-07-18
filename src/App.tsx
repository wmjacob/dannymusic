import { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query'

// import { atom, useAtom } from 'jotai'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import './App.css'

const queryClient = new QueryClient()

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiStack: {
      defaultProps: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});


interface TopLinkProps {
  label: string;
  media: ReactNode;
  link: string;
}

function App() {

  const topLinks: TopLinkProps[] = [
    { media: <TwitterIcon />, label: 'Twitter', link: '#' },
    { media: <FacebookIcon />, label: 'Facebook', link: '#' },
    { media: <InstagramIcon />, label: 'Instagram', link: '#' },
  ];

  return (
    <Box id="mainContent">

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Container
            disableGutters
            id="mainContent"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
            >
              <Stack spacing={3} sx={{ minWidth: 0 }}>
                <Stack
                  width="100%"
                >
                <a href="/">
                  <Avatar
                    alt="2 Forks"
                    src="/two-forks.png"
                    variant="square"
                    sx={{ width: '173.68px', height: '128px' }}
                  />
                </a>
                <Stack direction="row">
                  {topLinks.map((item, index) => (
                    <a key={index} href={item.link} rel="noopener">
                      <IconButton aria-label={item.label}>
                        {item.media}
                      </IconButton>
                    </a>
                  ))}
                </Stack>
                </Stack>
                <Router>
                  <Routes />
                </Router>
              </Stack>
            </Box>
          </Container>
        </ThemeProvider>
      </QueryClientProvider>
    </Box>
  );

}

export default App;