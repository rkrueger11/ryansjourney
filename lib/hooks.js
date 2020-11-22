import useSWR from 'swr';

import { getMyBasicUserInfo } from './api';

function getToken() {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('token');
    }
    return null;
}

export function useMyInfo() {
    const token = getToken();
    const { data, error } = useSWR(token, getMyBasicUserInfo);
    if (!token) {
        return {
            user: null,
            isLoading: false,
            isError: 'User is logged out'
        };
    }
    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    };
}
