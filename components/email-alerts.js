import React, { useState, useEffect } from 'react';
import { subscribeEmailToNewPostEmails } from '@/lib/api';
import { useMyInfo } from '@/lib/hooks';

export default function EmailAlerts() {
    const { user, isLoading, isError } = useMyInfo();
    const [emailAlertsActive, setEmailAlertsActive] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        if (!user) return;
        setEmailAlertsActive(user.postEmailNotificationsEnabled);
        setEmail(user.email);
        setName(user.username);
    }, [user]);

    const handleSubmit = async () => {
        const success = subscribeEmailToNewPostEmails({ email, name });
        setEmailAlertsActive(success);
    };

    const handleTurnEmailAlertsOff = () => {
        window.alert(
            "Sorry, I haven't had time to build this yet. Please email me at rkrueger11@gmail.com and I'll unsubscribe you or check back later."
        );
    };

    return (
        <section className="flex lg:w-2/3 flex-col mx-auto">
            <h2 className="text-lg font-semibold pb-1">Email Alerts for New Posts</h2>
            <div className="p-2 border border-gray-200">
                {emailAlertsActive ? (
                    <div className="flex flex-col mx-auto px-8 sm:px-0">
                        <p className="text-sm">Email alerts for new blog posts are on.</p>
                        <div className="my-2">
                            <button
                                onClick={handleTurnEmailAlertsOff}
                                className="text-xs bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                Turn Email Alerts Off
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-sm pb-1">
                            Fill out the below to get email notifications for each new post.
                        </p>
                        <div className="flex w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end">
                            <div className="relative sm:mr-4 mb-4 sm:mb-0 flex-grow w-full">
                                <label
                                    htmlFor="full-name"
                                    className="leading-7 text-sm text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="full-name"
                                    name="full-name"
                                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="relative sm:mr-4 mb-4 sm:mb-0 flex-grow w-full">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full bg-gray-100 rounded border border-gray-300 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                className="text-white bg-blue-600 border-0 py-2 px-8 focus:outline-none hover:bg-blue-900 rounded text-sm"
                                onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
