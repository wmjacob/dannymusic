import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { sendContactEmail } from '../Actions';

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const ContactForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisableSubmit(true);
    setSuccessAlert(false);
    setErrorAlert(false);
    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }
    setEmailError("");
    window.scrollTo(0, 0);
    const response = await sendContactEmail({
      firstName,
      lastName,
      phone,
      email,
      message,
    });
    if (response && response.success) {
      setSuccessAlert(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } else {
      setErrorAlert(true);
    }
    setDisableSubmit(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {successAlert && <Alert severity="success">Success! Your message has been sent.</Alert>}
      {errorAlert && <Alert severity="error">We apologize, something went wrong. Please try again later</Alert>}
      <TextField
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setFirstName(event.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setLastName(event.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setEmail(event.target.value)}
        required
        fullWidth
        margin="normal"
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phone}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setPhone(event.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setMessage(event.target.value)}
        multiline
        rows={4}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={disableSubmit} color="primary">Submit</Button>
    </form>
  );
};

export default ContactForm;