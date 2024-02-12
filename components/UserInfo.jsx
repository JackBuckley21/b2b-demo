"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';



export default function UserInfo() {
  const { data: session } = useSession();


  return (

      <div className="place-items-start bg-[#646e78]/80  h-screen ml-5 rounded-tl-xl">
           <form className="relative ">
    <input className="h-[35px] w-[225px] mt-5 ml-2 text-center bg-transparent border-r-0 border-t-0 border-l-0 border-b-2 text-white" placeholder="Search for devices"/>
  <SearchOutlinedIcon className="flex -mt-[1.8rem] ml-52 text-white hover:text-purple-400"/>
  </form>  
        <div className=" relative shadow-lg bg-zince-300/10 flex flex-col gap-2 mt-5 ml-5 place-items-start">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>

  );
}


// value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  onFocus={() => setIsSearching(true)}