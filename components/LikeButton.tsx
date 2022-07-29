import axios from "axios";
import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from "../store/authStore";
import { BASE_URL } from "../utils";
interface IProps {
  handleLike: () => void;
  handleDislike: () => void;
  likes: any[];
}
const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  const filterLikes = likes?.filter((item) => item._ref == userProfile?._id);
  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);
  console.log("Already liked", alreadyLiked, filterLikes.length);

  return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div
            className='bg-primary rounded-full p-2 md:p-4 text-[#F15997] '
            onClick={handleDislike}
          >
            <MdFavorite className='text-lg md:text-xl' />
          </div>
        ) : (
          <div>
            <div
              className='bg-primary rounded-full p-2 md:p-4  '
              onClick={handleLike}
            >
              <MdFavorite className='text-lg md:text-xl' />
            </div>
          </div>
        )}
        <p className='text-md font-semibold'>{likes?.length | 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
