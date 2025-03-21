import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Alert, Button, Typography } from '@mui/material';


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
    { media: <FacebookIcon fontSize='large' />, label: 'Facebook', link: 'https://www.facebook.com/2forksmusic' },
    { media: <YouTubeIcon fontSize='large' />, label: 'Youtube', link: 'https://www.youtube.com/@2forksmusic' },
    { media: <InstagramIcon fontSize='large' />, label: 'Youtube', link: 'https://www.instagram.com/2forksmusic' },
  ];

  return (
    <Box id="mainContent">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {window.location.pathname === '/' && (
            <Alert icon={false} severity="info">
              <Stack width="80vw" direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                <Typography variant="h5">Upcoming live shows!</Typography>
                <Button href="/live-shows" variant="outlined">View dates</Button>
              </Stack>
            </Alert>
          )}
          <Container
            disableGutters
          >
            <Box
              marginTop={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              minHeight="80vh"
              sx={{ backgroundColor: "rgba(0,0,0,.2)" }}
            >
              <Stack spacing={3} sx={{ minWidth: 0 }}>
                <Stack
                  width="100%"
                >
                <a href="/">
                  <Avatar
                    alt="2 Forks"
                    src="/two-forks.webp"
                    variant="square"
                    sx={{ width: '175px', height: 'auto' }}
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