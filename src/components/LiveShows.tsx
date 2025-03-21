import { List, ListItem, Typography, Box, Button, Paper } from '@mui/material';

interface ShowDates {
  date: string;
  venue: string;
  location: string;
  ticketLink: string;
  caption: string;
}

const showDates: ShowDates[] = [
  {
    date: new Date(2025, 3, 11).toDateString(),
    venue: 'B-Side Lounge',
    location: 'Cleveland, OH',
    ticketLink: 'bside-flyer.png',
    caption: '2 FORKS + The Elder Goths - Quanticode Live', 
  },
  {
    date: new Date(2025, 6, 19).toDateString(),
    venue: 'The Fire',
    location: 'Philadelphia, PA',
    ticketLink: 'fire-flyer.png',
    caption: '2 FORKS + Ghost Painted Sky ', // New field value
  },
  // Add more dates here
];

export const LiveShows = () => (
  <Box sx={{
    my: 4,
    display: 'flex',
    justifyContent: 'center',
    minWidth: "50vw",
  }} id="tour-dates">
    <Box sx={{
      width: '100%',
      maxWidth: '900px',
    }}>
      <Typography sx={{ pl: 2 }} variant="h4" gutterBottom>
        Tour Dates
      </Typography>
      <List sx={{
        backgroundColor: '#3F4045',
        p: 0,
      }}>
        {showDates.map((date, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #121212' }}>
            <Box sx={{
              display: 'flex',
            }}>
              <Paper
                sx={{
                  px: 2,
                  py: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#5D737E',
                  color: 'white',
                }}
              >
                <Typography variant="body2" >{date.date.substring(4,8)}</Typography>
                <Typography variant="body2" >{date.date.substring(8,10)}</Typography>
                <Typography variant="body2" >{date.date.substring(11,15 )}</Typography>
              </Paper>
              <Box sx={{
                ml: 2,
              }}>
                <Typography variant="h6">{date.venue}</Typography>
                <Typography variant="body2">{date.caption}</Typography>
                <Typography variant="body2">{date.location}</Typography>
              </Box>
            </Box>
            <Button sx={{
                backgroundColor: '#5D737E',
            }} variant="contained" target="blank" href={date.ticketLink}>Info</Button>
          </ListItem>
        ))}
      </List>
    </Box>
    </Box>
);