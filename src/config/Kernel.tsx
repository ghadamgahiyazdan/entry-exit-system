"use client"
import { useRefreshStore } from '@/store/RefreshStore';
import React from 'react';

const Kernel = () => {
    const { refresh } = useRefreshStore()
    React.useEffect(() => {

    }, [refresh])
    return (
        <>

        </>
    );
};

export default Kernel;