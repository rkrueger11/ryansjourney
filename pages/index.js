import Container from '@/components/container';
import MoreStories from '@/components/more-stories';
import HeroPost from '@/components/hero-post';
import Layout from '@/components/layout';
import { getAllPostsForHome } from '@/lib/api';
import Head from 'next/head';
import Header from '@/components/header';

export default function Index({ allPosts, preview }) {
    const heroPost = allPosts[0];
    const morePosts = allPosts.slice(1);
    return (
        <>
            <Layout preview={preview}>
                <Head>
                    <title>Ryan's Journey</title>
                </Head>
                <Container>
                    <Header />
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.coverImage}
                            date={heroPost.date}
                            author={heroPost.author}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </Container>
            </Layout>
        </>
    );
}

export async function getStaticProps({ preview = null }) {
    const allPosts = (await getAllPostsForHome(preview)) || [];
    return {
        props: { allPosts, preview }
    };
}
