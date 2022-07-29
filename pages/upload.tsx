import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import useAuthStore from "../store/authStore";
import { client } from "../utils/client";
import { SanityAssetDocument } from "@sanity/client";
import { topics } from "../utils/constants";

const Upload = () => {
  const { userProfile }: { userProfile: any } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<SanityAssetDocument | undefined>();
  const [wrongFile, setWrongFile] = useState(false);
  const [caption, setCaption] = useState("");
  const [topic, setTopic] = useState(topics[0].name);
  const [savingPost, setSavingPost] = useState(false);

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      client.assets
        .upload("file", selectedFile, {
          filename: selectedFile.name,
          contentType: selectedFile.type,
        })
        .then((res) => {
          setFile(res);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setWrongFile(true);
    }
  };
  const handlePost = async () => {
    if (caption && file?._id && topic) {
      setSavingPost(true);
      const document = {
        _type: "post",
        caption,
        video: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: file?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: "postedBy",
          _ref: userProfile?._id,
        },
        topic: topic,
      };
      await axios.post("http://localhost:3000/api/post", document);
      router.push("/");
    }
  };
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center '>
      <div className='bg-white rounded-lg h-[80vh] w-[60%] flex flex-wrap gap-6 justify-evenly items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl font-bold'>Upload</p>
            <p className='text-md text-gray-400 mt-1'>
              Post a video to your account
            </p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-200 hover:bg-gray-100 '>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                {file ? (
                  <div>
                    <video
                      src={file.url}
                      loop
                      controls
                      className='rounded-xl h-[300px] mt-16'
                    ></video>
                  </div>
                ) : (
                  <div>
                    <label className='cursor-pointer'>
                      <div className='flex flex-col items-center justify-center h-full'>
                        <div className='flex flex-col items-center justify-center h-full'>
                          <p className='font-bold text-xl'>
                            <FaCloudUploadAlt className='text-6xl text-gray-300' />
                          </p>
                          <p className='text-xl font-semibold text-center'>
                            Select video to upload
                          </p>
                        </div>
                        <p className='mt-3 text-center text-small ms-1 text-gray-400 leading-10'>
                          MP4 or WEBM files only <br />
                          Max file size: 1GB <br />
                          Up to 10 minutes
                        </p>
                        <p className='bg-[#F51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                          {" "}
                          Select File
                        </p>
                      </div>
                      <input
                        type='file'
                        name='upload-video'
                        className='w-0 h-0'
                        onChange={uploadVideo}
                      />
                    </label>
                  </div>
                )}
                {wrongFile && (
                  <p className='text-center text-red-500 text-sm'>
                    Please Upload a video in Supported Format
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-md font-medium'>Caption</label>
          <input
            type='text'
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className='rounded outline-none text-md border-2 p-2 border-gray-200'
            value={caption}
          />
          <label className='text-md font-medium'>Select a Category</label>
          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none text-md border-2 border-gray-200 capitalize rounded cursor-pointer lg:p-4 p-2 '
          >
            {topics.map((topic) => (
              <option
                value={topic.name}
                key={topic.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
              >
                {topic.name}
              </option>
            ))}
          </select>
          <div className='flex gap-6 mt-10 '>
            <button
              onClick={() => {}}
              type='button'
              className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Discard
            </button>
            <button
              onClick={handlePost}
              type='button'
              className='bg-[#F51997] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
