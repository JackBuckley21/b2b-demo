"use client";

import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Input } from "@nextui-org/react";

export default function UserInfo() {
  const [phonesData, setPhonesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPhones, setFilteredPhones] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(new Set(["Grade"]));
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(new Set([]));
  const [inputValue, setInputValue] = useState(""); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/phones.json");
      const data = await response.json();
      setPhonesData(data);
    };
    fetchData();
  }, []);


  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = phonesData.filter(
      (phone) =>
        phone.make.toLowerCase().includes(lowerCaseSearch) ||
        phone.model.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredPhones(filtered);
  }, [searchTerm, phonesData]);

  return (
    <div className="place-items-start bg-[#646e78]/80  h-screen ml-2 rounded-tl-xl overflow-y-auto overflow-scroll">
      <form className="relative ">
        <div className="relative">
          <input
            className="h-[35px] w-[225px] mt-5 ml-2 text-center bg-transparent border-r-0 border-t-0 border-l-0 border-b-2 text-white"
            placeholder="Search for devices"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchOutlinedIcon className=" text-white hover:text-purple-400" />
        </div>
      </form>
      <div className=" relative shadozw-lg bg-zince-300/10 flex flex-col gap-2 mt-5 ml-5 place-items-start w-fit bg-white/10">
        {searchTerm.length > 0 &&
          filteredPhones.length > 0 && ( // Add this condition
            <>
              {" "}
              {/* Use a fragment to enclose elements if needed */}
              {filteredPhones.map((phone, index) => (
                <div key={index}>
                  <div
                    className="text-white text-xl"
                    onClick={() => setSelectedPhone(phone)}
                  >
                    {phone.make} {phone.model}{" "}
                  </div>
                </div>
              ))}
            </>
          )}
      </div>
      {selectedPhone && (
        <div className="shadow-lg bg-zince-300/10 flex flex-col gap-2 mt-5 ml-5 place-items-start w-80 text-white bg-purple-400 rounded-2xl">
          {/* Access and display properties from 'selectedPhone' object  */}
          <div>
            <img
              src={selectedPhone.img}
              alt={`${selectedPhone.make} ${selectedPhone.model}`}
              className=""
            />

            <h2 className="pl-5 text-2xl">
              {selectedPhone.make} {selectedPhone.model}
            </h2>
          </div>
          <div className="flex gap-2 pl-5 pt-2 ">
            {selectedPhone.condition.map((condition) => (
              <button
                key={condition}
                className={`px-3 py-1 rounded-md border hover:bg-purple-600 hover:border-transparent inline-block ${
                  condition === selectedGrade.values().next().value
                    ? "bg-purple-600 border-none"
                    : "bg-purple-400"
                }`} // Styling and active state
                onClick={() => setSelectedGrade(new Set([condition]))}
              >
                {condition}
              </button>
            ))}
          </div>
          <div className="flex gap-2 pl-5 pt-2">
            {selectedPhone.storage.map((storage) => (
              <button
                key={storage}
                className={`px-3 py-1 rounded-md border hover:bg-purple-600 hover:border-transparent inline-block ${
                  storage === selectedStorage.values().next().value
                    ? "bg-purple-600 border-none"
                    : "bg-purple-400"
                }`} // Styling and active state
                onClick={() => setSelectedStorage(new Set([storage]))}
              >
                {storage} GB
              </button>
            ))}
          </div>
          <div className="pl-5 text-xl pb-3 pt-3">
            Price: £
            <span className=" pl-1 text-2xl">
              {
                selectedPhone.prices[selectedGrade.values().next().value]?.[
                  selectedStorage.values().next().value
                ]
              }
            </span>
            <Input
              variant={"underlined"}
               className="inline-block w-20 flex-wrap md:flex-nowrap ml-6 mb-6 md:mb-0 gap-4"
              label="Qty"
              color="secondary"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
