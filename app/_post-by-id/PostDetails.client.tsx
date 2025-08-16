'use client';

// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

// import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect } from 'react';
// import { User } from '@/types/user';

export default function PostDetailsClient() {
  // const handleClickBack = () => {};

  useEffect(() => {
    const fn = async () => {};
    fn();
  }, []);

  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn}>← Back</button>

          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>Post title</h2>
              </div>

              <p className={css.content}>Post body</p>
            </div>
            <p className={css.user}>Author: User name</p>
          </div>
        </div>
      </div>
    </>
  );
}
