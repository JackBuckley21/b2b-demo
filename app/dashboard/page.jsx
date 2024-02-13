'use client'

import React, { useState } from 'react';
import Toggle from "@/components/Toggle";
import UserInfo from '@/components/UserInfo';
import Sidebar from '@/components/Sidebar';
import MenuBarMobile from '@/components/MenuBar';
import TopBar from '@/components/TopBar';

export default function Dashboard() {
  const [showTwoColumns, setShowTwoColumns] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='bg-black fixed'>
      <div className='float-left place-content-center justify-center'>
      <TopBar />
      </div>
        <MenuBarMobile setter={setShowSidebar} />
      <Sidebar show={showSidebar} setter={setShowSidebar} />
    <div className="grid grid-cols-1 place-items-center bg-[#646e78]/60  w-screen h-full ml-44 mt-28 rounded-tl-xl">   
    <div className=""> {/* Or any suitable wrapper with Tailwind */}
      <Toggle 
        initialState={showTwoColumns}
        onChange={(newState) => setShowTwoColumns(newState)}
  
      />

      <div className={`grid ${showTwoColumns ? 'grid-cols-2 w-auto' : 'grid-cols-1 w-auto'} w-screen`}>
        <div className="place-items-start"><UserInfo/></div> 
        {showTwoColumns && (
          <div className="place-items-start overscroll-y-contain border-l-2 border-white">Column 2</div> 
        )}
      </div>
    </div>
    </div>
    </div>
  );
}
