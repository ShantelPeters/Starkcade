"use client"

import React, { useState } from "react"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculateAge, setStoredAge } from "~~/utils/ageVerification";

export const VerifyAge = () => {
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    if (!birthDate) {
      setError("Please enter your birth date");
      return;
    }

    const age = calculateAge(birthDate);
    console.log(age);
    setStoredAge(age);

    if (age < 18) {
      setError("You must be 18 or older to access this content");
      setTimeout(() => router.push('/'), 3000);
      return;
    }

    setError("");
    router.push('/coinflip');
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen h-full bg-[#1F3149]">
      <div className="relative text-center flex flex-col items-center gap-8">
        <div className="relative w-32 h-32">
            <Image
              src="/coin-removebg.png"
              alt="Web3 Arcade Coin"
              className="object-contain"
              fill
            />
          </div>
        <div className="w-[592px] bg-[#f8f9fa] rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-[#212529] text-2xl font-medium">
              Confirm your birthday
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="black"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
          </div>
          <hr className="-m-6 mb-3" />
          <div className="space-y-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-[#6c757d] font-medium">Date</span>
              </div>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                onChange={(event) => setBirthDate(event.target.value)}
                value={birthDate}
                className="w-full h-12 text-[#212529] text-base bg-white rounded-lg border border-[#000000] px-4 placeholder-[#6c757d] focus:outline-none focus:border-[#000000] focus:ring-1 focus:ring-[#000000]"
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            <button
              className={`w-full py-3 ${!birthDate ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F2C71C] hover:bg-[#ffc107]'} text-black font-semibold rounded-full transition-colors`}
              onClick={handleConfirm}
              disabled={!birthDate}
            >
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
