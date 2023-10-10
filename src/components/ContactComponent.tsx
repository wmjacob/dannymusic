import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ContactForm from './ContactForm';

const ContactComponent = () => {
  return (
    <Card sx={{ "width": "100%", "maxWidth": "600px" }}>
      <CardContent>
        <ContactForm />
      </CardContent>
    </Card>
  );
};

export default ContactComponent;