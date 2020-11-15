import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Container from '@/components/container';
import Header from '@/components/header';
import Layout from '@/components/layout';
import Head from 'next/head';

export default function Settings({ preview }) {
    const router = useRouter();
    const { provider, access_token: accessToken } = router.query;

    const [error, setError] = useState(false);
    const [user, setUser] = useState(false);

    // If attempting to connect a new provider
    if (provider) {
        fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth/${provider}/callback?access_token=${accessToken}`
        )
            .then((res) => res.json())
            .then((data) => {
                const { jwt, user } = data;
                console.log({ jwt, user });
            })
            .catch((error) => {
                console.warn(error);
                setError(true);
            });
    }

    return (
        <Layout preview={preview}>
            <Container>
                <Header />
                <Head>
                    <title>{"Account Settings | Ryan's Journey"}</title>
                </Head>
                {error
                    ? 'Oops. It looks like there was an error. Email Ryan at rkrueger11@gmail.com'
                    : null}
            </Container>
        </Layout>
    );
}
