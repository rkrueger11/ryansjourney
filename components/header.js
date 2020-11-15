import Link from 'next/link';

export default function Header() {
    return (
        <div className="flex flex-row justify-center mb-20 mt-8">
            <h2 className="flex-1 text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
                <Link href="/">
                    <a className="hover:underline">{"Ryan's Journey"}</a>
                </Link>
            </h2>
            <div>
                <a
                    className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded"
                    href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/connect/facebook`}>
                    Sign In with Facebook
                </a>
            </div>
        </div>
    );
}
