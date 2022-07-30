import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import useAuthStore from "../store/authStore";
import NoResults from "./NoResults";
import { IUser } from "../types";
interface IProps {
  isPostingComment: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: {
    _ref: string;
    _id: string;
  };
}

const Comments = ({
  comment,
  addComment,
  setComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers } = useAuthStore();
  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[375px]'>
        {comments?.length ? (
          comments.map((comment, idx) => (
            <>
              {allUsers.map(
                (user: IUser) =>
                  user._id ===
                    (comment.postedBy._id ||
                      user._id === comment.postedBy._ref) && (
                    <div className='p-2 items-center' key={idx}>
                      <Link href={`/profile/${user._id}`}>
                        <div className='flex gap-3 items-start'>
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
                      <p className="m-4">{comment.comment}</p>
                    </div>
                  )
              )}
            </>
          ))
        ) : (
          <NoResults text='No Comments yet! Be the first one to add a comment.' />
        )}
      </div>
      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex   gap-6'>
            <input
              type='text'
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder='Add Comment...'
              className='bg-primary px-6 py-4 text-md font-medium border-2 w-[250ox] md:w-[750px] lg:w-[350px] border-gray-100 focus: outline-none focus:border-2 focus:border-gray-300 flex rounded-lg '
            />
            <button className='text-md text-gray-400' onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Comments;
