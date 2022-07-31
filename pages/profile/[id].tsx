import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";
import NoResults from "../../components/NoResults";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [videoList, setVideoList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;
  const [showUserVideos, setShowUserVideos] = useState(true);
  const videos = showUserVideos ? "border-b-2 border-black" : "text-gray-400";
  const liked = !showUserVideos ? "border-b-2 border-black" : "text-gray-400";

  useEffect(() => {
    if (showUserVideos) {
      setVideoList(userVideos);
    } else {
      setVideoList(userLikedVideos);
    }
  }, [showUserVideos, userLikedVideos, userVideos]);
  return (
    <div className='w-full'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
        <div className='h-18 w-18 md:h-32 md:w-32'>
          <Image
            width={120}
            height={120}
            className='rounded-full'
            src={user.image}
            alt='profile'
            layout='responsive'
          />
        </div>
        <div>
          <p className='md:text-2xl tracking-wider  flex items-center gap-1 justify-center text-md font-bold text-primary lowercase'>
            {user.userName}
            <GoVerified className='text-blue-400' />
          </p>
          <p className='capitalize md:text-xl font-medium text-xs text-gray-500'>
            {user.userName}
          </p>
        </div>
      </div>
      <div>
        <div className='flex gap-3 mb-10 mt-10 border-b-2  border-gray-200 bg-white w-full'>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${videos} `}
            onClick={() => {
              setShowUserVideos(true);
            }}
          >
            Videos
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${liked} `}
            onClick={() => {
              setShowUserVideos(false);
            }}
          >
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start'>
          {videoList?.length > 0 ? (
            videoList.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet!`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);

  return {
    props: {
      data: res.data,
    },
  };
};

export default Profile;
