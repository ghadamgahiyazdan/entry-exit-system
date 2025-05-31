import React from 'react';
import { Button } from './ui/button';

const NavBar = () => {
    return (
        <nav className='h-15 bg-gray-50 border-b-1 border-black flex gap-1 items-center justify-center'>
            <Button>اضافه کردن شیفت</Button>
            <Button>اضافه کردن کارمند</Button>
            <Button>ویرایش</Button>
            <Button>خانه</Button>
        </nav>
    );
};

export default NavBar;