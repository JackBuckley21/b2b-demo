import React from 'react'
import Link from 'next/link'

import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function MenuBarMobile({setter}) {
    return (
        <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-white flex [&>*]:my-auto px-2 items-center justify-center shadow-md">
            <button
                className="text-4xl flex text-white"
                onClick={() => {
                    setter(oldVal => !oldVal);
                }}
            >
                <MenuOutlinedIcon style={{fontSize: "35px"}} />
            </button>
            <Link href="/" className="mx-auto">
             
            </Link>
            <Link
                className="text-3xl flex text-black"
                href="/login"
            >
                <AccountCircleOutlinedIcon style={{fontSize: "35px"}} />
            </Link>
        </nav>
    )
}