"use client"

import React, {useState, useEffect} from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";


import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { IconButton } from "@mui/material";

//TODO SORT OUT THE MENU ITEMS MOVING DOWN WHEN SELECTING A DIFFERENT PAGE 


export default function Sidebar({ show, setter }) {
    const router = useRouter();



    // Define our base class
    const className = "fixed w-auto transition-[margin-left] ease-in-out duration-500 md:static top-0 bottom-0 left-0 z-40 text-white bg-black";
    // Append class based on state of sidebar visiblity
    const appendClass = show ? " ml-0" : " ml-[-250px] md:ml-0";

    // Clickable menu items
    const MenuItem = ({ icon, name, route }) => {
        // Highlight menu item based on currently displayed route
       const colorClass =  usePathname() === route ? "text-purple-400" : "text-grey hover:text-purple-400 pt-7";



        return (
            <Link
                href={route}
                onClick={() => {
                    setter((oldVal: any) => !oldVal);
                }}
                className={`flex text-md pl-6 py-3 border-b-[4px] border-b-white/10 ${colorClass}`}
            >
                <div className="text-xl flex [&>*]:mx-auto w-[30px]">
                    {icon}
                </div>
                <div>{name}</div>
            </Link>
        )
    }
    

    // Overlay to prevent clicks in background, also serves as our close button
    const ModalOverlay = () => (
        <div
            className={`flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/30 z-30`}
            onClick={() => {
                setter((oldVal: any) => !oldVal);
            }}
        />
    )

    return (
        <>
            <div className={`${className}${appendClass}`}>
                <div className="flex pt-0">
                    <Link href="/">
                        {/*eslint-disable-next-line*/}
                    
                    </Link>
                </div>
                <div className="fixed flex-col mt-32 items-left justify-center" >
                <MenuItem
                 name="New Quote"
                 route="/dashboard"
                 icon={<RequestQuoteOutlinedIcon />}
             />
             <MenuItem
                 name="Quotes"
                 route=""
                 icon={<Inventory2OutlinedIcon />}
             />      
                </div>
                <div className="fixed bottom-0 mb-10 ml-5">
                    
                    <IconButton
                    onClick={() => signOut({redirect: true, callbackUrl: "https://localhost:3002"})}
                    >
                    <PowerSettingsNewOutlinedIcon style={{color:'#FD1054'}} />
                </IconButton>
                Log Out
                </div>
            </div>
            {show ? <ModalOverlay /> : <></>}
        </>
    )
}