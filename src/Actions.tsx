import { useQuery } from 'react-query';

interface BioLinkResponse {
    link?: string
}

type ContactEmailResponse = {
    success?: boolean;
}

export function getBioLink() {
    return useQuery('bioLink', () => (
        fetch('/api/bio-link', {
            method: 'POST',
        })
            .then((response) => response.json())
            // and return the result data.
            .then((data) => data as BioLinkResponse)
            .catch(() => {
                console.log("Issue getting bio link")
            })
    ));
}

type ContactBodyType = {
    email: string;
    firstName: string;
    lastName: string;
    message: string;
    phone?: string;
};

export const sendContactEmail = (body: ContactBodyType) =>
    fetch('/api/contact-email', {
        body: JSON.stringify(body),
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => data as ContactEmailResponse)
        .catch(() => {
            console.log("Issue sending contact email")
        });


export const getDownloadLink = (password: string) =>
    fetch('/api/download-link', {
        method: 'POST',
        body: JSON.stringify({
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => data as BioLinkResponse)
        .catch(() => {
            console.log("Wrong password supplied")
        });
