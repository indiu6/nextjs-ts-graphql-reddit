import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Avatar from './Avatar';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

const PostBox = () => {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <Avatar />

        <input
          disabled={!session}
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          type="text"
          placeholder={
            session ? 'Create a post by entering a title!' : 'Sign in to post'
          }
        />

        <PhotoIcon className={`h-6 text-gray-300`} />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>
    </form>
  );
};

export default PostBox;
