import React from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";

const Comments = () => {
  const { userProfile } = useAuthStore();
  const postingComment = false;
  const comments = [];
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[375px]'>
        {comments.length ? (
          <div>Videos</div>
        ) : (
          <NoResults text='No Comments yet! Be the first one to add a comment.' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={() => {}} className='flex   gap-6'>
            <input
              type='text'
              value=''
              onChange={() => {}}
              placeholder='Add Comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250ox] md:w-[750px] lg:w-[350px] border-gray-100 focus: outline-none focus:border-2 focus:border-gray-300 flex rounded-lg '
            />
            <button className='text-md text-gray-400' onClick={() => {}}>
              {postingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
