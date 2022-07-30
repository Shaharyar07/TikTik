import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";

const SuggestedAccounts = () => {
  const { fetchAllUsers, allUsers } = useAuthStore();
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='font-semibold m-3 text-gray-500 mt-4 hidden xl:block'>
        Suggested Accounts
      </p>
      <div>
        {allUsers.map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex gap-3 hover:bg-primary p-2 rounded font-semibold cursor-pointer'>
              <div className='h-9 w-9'>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={user.image}
                  alt='profile'
                  layout='responsive'
                />
              </div>
              <div className='hidden xl:block'>
                <p className='flex items-center gap-1 text-md font-bold text-primary lowercase'>
                  {user.userName}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
