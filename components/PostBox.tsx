import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST, ADD_SUBREDDIT } from '../graphql/mutaions';
import client from '../apollo-client';
import { GET_SUBREDDIT_BY_TOPIC } from '../graphql/queries';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

const PostBox = () => {
  const { data: session } = useSession();
  const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
  const [addPost] = useMutation(ADD_POST);
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);

    try {
      // Query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: formData.subreddit,
        },
      });

      const subredditExists = getSubredditListByTopic.length > 0;

      if (!subredditExists) {
        // create subreddit
      } else {
        // use existing subreddit
      }
    } catch (error) {}
  });

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar />

        <input
          {...register('postTitle', { required: true })}
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign in to post'
          }
        />

        <PhotoIcon
          onClick={() => setImageBoxOpen(!imageBoxOpen)}
          className={`h-6 text-gray-300 ${imageBoxOpen && 'text-blue-300'}`}
        />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>

      {!!watch('postTitle') && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...register('postBody')}
              type="text"
              placeholder="Text (optional)"
            />
          </div>

          {/* Subreddit */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Subreddit:</p>
            <input
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              {...(register('subreddit'), { required: true })}
              type="text"
              placeholder="i.e. reactjs"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                {...register('postImage')}
                type="text"
                placeholder="Optional"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === 'required' && (
                <p>- A Post Title is required</p>
              )}

              {errors.subreddit?.type === 'required' && (
                <p>- A Subreddit is required</p>
              )}
            </div>
          )}

          {!!watch('postTitle') && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400 p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
};

export default PostBox;
