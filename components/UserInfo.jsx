"use client";

import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {Switch} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";



export default function UserInfo() {
  const [phonesData, setPhonesData] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Grade"]));
  const [selectedPhone, setSelectedPhone] = useState(null); 

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/phones.json');
      const data = await response.json();
      setPhonesData(data);
    };
    fetchData();
  }, []);

  console.log(phonesData)

  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = phonesData.filter(phone => (
      phone.make.toLowerCase().includes(lowerCaseSearch) || 
      phone.model.toLowerCase().includes(lowerCaseSearch)
    ));
    setFilteredPhones(filtered);
  }, [searchTerm, phonesData]);


  return (

      <div className="place-items-start bg-[#646e78]/80  h-screen ml-2 rounded-tl-xl">
           <form className="relative ">
    <input className="h-[35px] w-[225px] mt-5 ml-2 text-center bg-transparent border-r-0 border-t-0 border-l-0 border-b-2 text-white" placeholder="Search for devices" value={searchTerm}   
        onChange={(e) => setSearchTerm(e.target.value)}/>
            <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
          className="capitalize ml-5 text-white"
          color="Default"
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
    
      >
        <DropdownItem key="Grade A">Grade A</DropdownItem>
        <DropdownItem key="Grade B">Grade B</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  <SearchOutlinedIcon className="flex -mt-[1.8rem] ml-52 text-white hover:text-purple-400"/> 
  </form> 
        <div className=" relative shadozw-lg bg-zince-300/10 flex flex-col gap-2 mt-5 ml-5 place-items-start w-80">
        {filteredPhones.map((phone, index) => (
      <div key={index}>
        <div className="text-white" onClick={() => setSelectedPhone(phone)}>{phone.make} {phone.model} {phone.condition.includes("Refurbished")} £ <span className="text-purple-400">  {phone.prices.Refurbished?.[selectedKeys.values().next().value]} 
 </span></div>
      </div>
    ))}
      </div>
      {selectedPhone && (
    <div className="  relative shadow-lg bg-zince-300/10 flex flex-col gap-2 mt-5 ml-5 place-items-start w-80"> 
        {/* Access and display properties from 'selectedPhone' object  */}
        <h2>{selectedPhone.make} {selectedPhone.model}</h2>
        <p>Condition: {selectedPhone.condition.join(', ')}</p>
        <p>Storage Options: {selectedPhone.storage.join(', ')} GB</p>
        {/* Add prices, etc. */}
    </div> 
)}
    </div>

  );
}


// value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}  onFocus={() => setIsSearching(true)}