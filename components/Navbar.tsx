import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../utils/tiktik-logo.png";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
const Navbar = () => {
  const router = useRouter();
  const { userProfile, addUser, removeUser }: any = useAuthStore();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
      <Link href='/'>
        <div className='w-[100px] md:w-[130px]'>
          <Image
            src={Logo}
            alt='TikTik'
            layout='responsive'
            className='pointer-cursor '
          />
        </div>
      </Link>
      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSubmit}
          className='absolute md:static top-10 -left-20 bg:white'
        >
          <input
            type='text'
            value={searchValue}
            placeholder='Search Accounts and Videos...'
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0 focus:outline-none'
          />
          <button className='absolute md:right-5 right-6 top-3 border-l-2 border-gray-300 pl-4 text-3xl text-gray-400'>
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />
                {` `}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href='/'>
                <>
                  <Image
                    width={40}
                    height={40}
                    className='rounded-full'
                    src={userProfile.image}
                    alt='profile'
                  />
                </>
              </Link>
            )}
            <button
              type='button'
              className='px-2'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color='red' fontSize={25} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(res) => {
              createOrGetUser(res, addUser);
            }}
            onError={() => {
              console.error("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
