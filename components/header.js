import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMyInfo } from '@/lib/hooks';

export default function Header() {
    const router = useRouter();
    const { pathname } = router;
    const { user, isLoading } = useMyInfo();
    const isSettingsPage = pathname === '/settings/[[...provider]]';

    return (
        <div className="flex flex-row justify-center mb-20 mt-8">
            <h2 className="flex-1 text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight">
                <Link href="/">
                    <a className="hover:underline">{"Ryan's Journey"}</a>
                </Link>
            </h2>
            <div className={isLoading ? 'invisible' : ''}>
                {!user ? (
                    <a
                        className={`bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-2 border border-gray-500 hover:border-transparent rounded`}
                        href={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/connect/facebook`}>
                        {'Sign In with Facebook'}
                    </a>
                ) : (
                    <div className="flex flex-row my-auto text-sm text-gray-700 hover:underline">
                        {!isSettingsPage ? (
                            <a href="/settings">
                                {user.postEmailNotificationsEnabled
                                    ? 'Manage Email Notifications'
                                    : 'Sign up for New Post Email Notifications!'}
                            </a>
                        ) : null}
                    </div>
                )}
            </div>
        </div>
    );
}
