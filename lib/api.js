async function fetchAPI(query, { variables } = {}) {
    let token = null;
    // If making the request client side, then use the jwt
    if (typeof window !== 'undefined') {
        token = window.localStorage.getItem('token');
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
            query,
            variables
        })
    });

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error('Failed to fetch API');
    }

    return json.data;
}

export async function getPreviewPostBySlug(slug) {
    const data = await fetchAPI(
        `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
        {
            variables: {
                where: {
                    slug
                }
            }
        }
    );
    return data?.posts[0];
}

export async function getAllPostsWithSlug() {
    const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
    return data?.allPosts;
}

export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(
        `
    query Posts($where: JSON){
      posts(sort: "date:desc", limit: 10, where: $where) {
        title
        slug
        excerpt
        date
        coverImage {
          url
        }
        author {
          name
          picture {
            url
          }
        }
      }
    }
  `,
        {
            variables: {
                where: {
                    ...(preview ? {} : { published_at_null: false })
                }
            }
        }
    );
    return data?.posts;
}

export async function getPostAndMorePosts(slug, preview) {
    const data = await fetchAPI(
        `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
        {
            preview,
            variables: {
                where: {
                    slug,
                    ...(preview ? {} : { published_at_null: false })
                },
                where_ne: {
                    ...(preview ? {} : { published_at_null: false }),
                    slug_ne: slug
                }
            }
        }
    );
    return data;
}

export async function getMyBasicUserInfo() {
    const data = await fetchAPI(
        `
    query GetMyBasicUserInfo {
      me {
        id
        username
        email
        postEmailNotificationsEnabled
      }
    }
  `,
        {}
    );
    return data.me;
}

export async function subscribeEmailToNewPostEmails({ email, name }) {
    const data = await fetchAPI(
        `
    mutation SubscribeEmailToNewPostEmails($email: ID!, $name: String!) {
      subscribeEmailToNewPostEmails(email: $email, name: $name)
    }
    `,
        {
            variables: { email, name }
        }
    );
    return data;
}
