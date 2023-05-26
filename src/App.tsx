import { ReactNode } from 'react';
import { atom, useAtom } from 'jotai'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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

const modalAtom = atom({
  modalShowing: false,
});

interface ActionAreaCardProps {
  title: string;
  media: string;
  locked: boolean;
}

interface TopLinkProps {
  label: string;
  media: ReactNode;
}

const iconSize = '40px';

function ActionAreaCard({ title, media, locked }: ActionAreaCardProps) {
  return (
    <Card sx={{ "width": "100%" }}>
      <CardActionArea>
        <Box
          display="flex"
          alignItems="center"
          padding={1}
        >
          <CardMedia
            component="img"
            height="100"
            image={media}
            alt="green iguana"
            sx={{ width: iconSize, height: iconSize }}
          />
          <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexGrow={1}
              paddingRight={iconSize}
          >
            <CardContent>
              <Typography variant="body1" component="div">
                {locked && '🔒 '}{title}
              </Typography>
            </CardContent>
            {/* padding adjustment div */}
            <div />
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );

}

function App() {
  const [modalState, setModalState] = useAtom(modalAtom);
  const links: ActionAreaCardProps[] = [
    { title: 'YouTube', media: "youtube.png", locked: false },
    { title: 'bandcamp', media: "bandcamp.png", locked: false },
    { title: 'Spotify', media: "spotify.png", locked: false },
    { title: 'iTunes', media: "apple.svg", locked: false },
    { title: 'POST-PUNK.com', media: "post-punk.png", locked: false },
    { title: 'Quanticode Album Download', media: "quanticode.jpg", locked: true },
  ]
  const topLinks: TopLinkProps[] = [
    { media: <TwitterIcon />, label: 'Twitter' },
    { media: <FacebookIcon />, label: 'Facebook' },
    { media: <InstagramIcon />, label: 'Instagram' },
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container
        disableGutters
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Stack spacing={3} sx={{ minWidth: 0 }}>
            <Avatar
              alt="2 Forks"
              src="/two-forks.png"
              variant="square"
              sx={{ width: "auto", height: 128 }}
            />
            <Stack spacing="1" direction="row">
              {topLinks.map(item => (
                <IconButton aria-label={item.label}>
                  {item.media}
                </IconButton>
              ))}
            </Stack>
            <Stack spacing={2} minWidth="50vw">
              {links.map(link => <ActionAreaCard {...link} />)}
            </Stack>
          </Stack>

        </Box>
      </Container>
    </ThemeProvider>
  );

}

export default App;