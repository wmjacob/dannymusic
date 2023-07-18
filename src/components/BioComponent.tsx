import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const BioComponent = () => {
    const paragraphs = [
        'todo'
    ];
    return (
        <Card sx={{ "width": "100%", "maxWidth": "600px" }}>
            <CardMedia
                component="img"
                image="bio.jpg"
                alt="2forks"
            />
            <CardContent>
                {paragraphs.map((paragraph, index) => <Typography key={index} align="left" mb={1} mt={1} variant="body1" component="div">{paragraph}</Typography>)}
            </CardContent>
        </Card>
    );
};

export default BioComponent;