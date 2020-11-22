import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '@/components/container';
import Header from '@/components/header';
import Layout from '@/components/layout';
import Head from 'next/head';
import EmailAlerts from '@/components/email-alerts';

export default function Settings({ preview }) {
    const router = useRouter();
    const { provider, access_token: accessToken } = router.query;

    const [error, setError] = useState(false);
    const [user, setUser] = useState(false);

    // If attempting to connect a new provider
    useEffect(() => {
        if (!provider) return;
        if (!accessToken) {
            setError(true);
            return;
        }
        fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/${provider}/callback?access_token=${accessToken}`
        )
            .then((res) => (res.status === 200 ? res.json() : new Error('Bad Status Code')))
            .then((data) => {
                const { jwt, user } = data;
                console.log({ jwt, user });
                window.localStorage.setItem('token', jwt);
                setUser(user);
            })
            .catch((error) => {
                console.warn(error);
                setError(true);
            });
    }, [provider, accessToken]);

    return (
        <Layout preview={preview}>
            <Container>
                <Header />
                <Head>
                    <title>{"Account Settings | Ryan's Journey"}</title>
                </Head>
                {error
                    ? `Oops. It looks like there was an error. Send Ryan an email at rkrueger11@gmail.com if you wouldn't mind.`
                    : null}
                <EmailAlerts />
            </Container>
        </Layout>
    );
}
