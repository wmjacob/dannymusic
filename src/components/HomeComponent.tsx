import { atom, useAtom } from 'jotai';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { getBioLink, getDownloadLink, getContactEmail } from '../Actions';

interface ActionAreaCardProps {
  title: string;
  media: string;
  link?: string;
  locked: boolean;
  onClick?: Function;
}

const modalAtom = atom({
  modalShowing: false,
});

const passwordAtom = atom({
  password: '',
});


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 9,
  p: 4,
};


const iconSize = '40px';

function ActionAreaCard({ title, media, locked, link, onClick }: ActionAreaCardProps) {
  const [modalState, setModalState] = useAtom(modalAtom);
  const [passwordState, setPasswordState] = useAtom(passwordAtom);

  const handleClick = () => {
    if (locked) {
      setModalState({ modalShowing: true });
    }
    if (onClick) {
      onClick();
    }
  };

  const checkPassword = async (event: React.FormEvent<EventTarget>) => {
    if (event) {
      event.preventDefault();
    }
    const data = await getDownloadLink(passwordState.password);
    if (data?.link) {
      window.open(data.link, '_self');
    }
    setModalState({ modalShowing: false });
  };

  return (
    <Card sx={{ "width": "100%" }}>
      <a onClick={handleClick} href={link || '#'} rel="noopener">
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
              alt={title}
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
      </a>
      <Modal
        slotProps={{ backdrop: { style: { backgroundColor: 'rgba(1, 1, 1, .15)' }}}}
        open={modalState.modalShowing}
        onClose={() => setModalState({ modalShowing: false })}
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography variant="body1" component="div">
              Enter password to gain access
            </Typography>
            <Stack direction="row" spacing={1}>
              <form onSubmit={checkPassword} noValidate>
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  type="password"
                  autoComplete="access password"
                  onChange={(e) => setPasswordState({ password: e.target.value })}
                  InputProps={{endAdornment: <Button type="submit" variant="outlined">Submit</Button>}}
                />
              </form>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );

}

const HomeComponent = () => {
  const { data: bioData } = getBioLink();

  const openContactUs = async () => {
    const data = await getContactEmail();
    console.log("HERE");
    console.log(data)
    if (data?.email) {
      window.open(`mailto:${data.email}`);
    }
  };

  const links: ActionAreaCardProps[] = [
    { title: 'Bio', media: "bio.webp", locked: false, link: bioData?.link },
    { title: 'YouTube', media: "youtube.webp", locked: false, link: 'https://www.youtube.com/@2forksmusic' },
    { title: 'bandcamp', media: "bandcamp.webp", locked: false, link: 'https://2forksmusic.bandcamp.com' },
    // { title: 'Spotify', media: "spotify.png", locked: false },
    // { title: 'iTunes', media: "apple.svg", locked: false },
    { title: 'Quanticode Album Download', media: "quanticode.webp", locked: true },
    { title: 'Contact Us', media: "two-forks.webp", onClick: openContactUs, locked: false },
  ];
  return (
    <Stack spacing={2} minWidth="50vw">
      {links.map(link => <ActionAreaCard key={link.title} {...link} />)}
    </Stack>
  );
};

export default HomeComponent;