import { NextPage } from 'next';
import Head from 'next/head';
import PostBox from '../components/PostBox';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Leddit</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* PostBox */}
      <PostBox />

      <div>{/* Feed */}</div>
    </div>
  );
};

export default Home;
