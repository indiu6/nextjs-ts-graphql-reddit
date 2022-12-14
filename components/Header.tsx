import Image from 'next/image';
import {
  ChevronDownIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import {
  BellIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  GlobeAltIcon,
  PlusIcon,
  SparklesIcon,
  MegaphoneIcon,
  VideoCameraIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { signIn, signOut, useSession } from 'next-auth/react';

function Header() {
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 flex bg-white px-4 py-2 shadow-sm">
      <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
        <Image
          src="https://cdn.worldvectorlogo.com/logos/reddit-1.svg"
          layout="fill"
          alt="reddit logo"
          objectFit="contain"
        />
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="flex-1 ml-2 hidden lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* search box */}
      <form className="flex flex-1 items-center space-x-2 border border-gray-200 rounded-sm bg-gray-100 px-3 py-1">
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Search Reddit"
        />
        <button type="submit" hidden />
      </form>

      <div className="mx-5 hidden items-center space-x-2 text-gray-500 lg:inline-flex">
        <SparklesIcon className="icon" />
        <GlobeAltIcon className="icon" />
        <VideoCameraIcon className="icon" />
        <hr className="h-10 border border-gray-100" />
        <ChatBubbleOvalLeftEllipsisIcon className="icon" />
        <BellIcon className="icon" />
        <PlusIcon className="icon" />
        <MegaphoneIcon className="icon" />
      </div>
      <div className="ml-5 flex items-start lg:hidden">
        <Bars3Icon className="icon" />
      </div>

      {/* Sign in / out btn */}
      {session ? (
        <div
          onClick={() => signOut()}
          className="hidden items-center lg:flex cursor-pointer space-x-2 border border-gray-100 p-2 "
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg"
              alt="reddit icon"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex-1 text-xs">
            <p className="truncate">{session?.user?.name}</p>
            <p className="text-gray-400">1 Karma</p>
          </div>

          <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
        </div>
      ) : (
        <div
          onClick={() => signIn()}
          className="hidden items-center lg:flex cursor-pointer space-x-2 border border-gray-100 p-2 "
        >
          <div className="relative h-5 w-5 flex-shrink-0">
            <Image
              src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg"
              alt="reddit icon"
              layout="fill"
              objectFit="contain"
            />
          </div>

          <p className="text-gray-400">Sign In</p>
        </div>
      )}
    </div>
  );
}

export default Header;
