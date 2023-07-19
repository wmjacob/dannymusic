import { useQuery } from 'react-query';

interface BioLinkResponse {
    link?: string
}

interface ContactEmailResponse {
    email?: string
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

export const getContactEmail = () =>
    fetch('/api/contact-email', {
        method: 'POST',
    })
        .then((response) => response.json())
        .then((data) => data as ContactEmailResponse)
        .catch(() => {
            console.log("Issue getting contact email")
        })


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
