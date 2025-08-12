import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';
import { useUserContext } from '@/hooks/useUserContext';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export const getServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authConfig);
  return {
    props: {
      session: session,
    },
  };
};

const login = ({ session }) => {
  const { user, setUser } = useUserContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // setUser(session.user);
  }, []);

  // const handleClick = () => {
  //   signIn('google');
  // };

  const onLoginHandler = async (data) => {
    const signInResponse = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push('/');
    } else {
      toast.error('Login failed', { duration: 3000 });
    }
  };


  return (
    <>
      <Toaster />
      <div className="grid place-items-center min-h-screen bg-gray-100">
        <div className="flex bg-white p-8 gap-4 w-[90%] max-w-[360px] sm:max-w-[400px] lg:max-w-[500px] rounded-xl flex-col items-center">
          <h1 className="text-red-500 font-semibold tracking-wide text-2xl ">
            Kulinearan
          </h1>
          <form
            onSubmit={handleSubmit(onLoginHandler)}
            className="flex flex-col gap-2 w-full"
          >
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-500">Username</label>
              <input
                {...register('username', {
                  pattern: {
                    value: /^[^\s]+$/,
                    message: 'Username tidak boleh mengandung spasi',
                  },
                  required: { value: true, message: 'Harap isi username' },
                })}
                className="rounded-lg border p-2 w-full focus:outline-red-500 duration-300"
              />
              <AnimatePresence>
                {errors.username && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{delay: 0.1}}
                    className={`text-red-500  text-sm ${errors.username?.type}`}
                  >
                    {errors.username?.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-zinc-500">Password</label>
              <input
                {...register('password', { required: true })}
                className="rounded-lg border p-2 w-full focus:outline-red-500 duration-300"
              />
              <AnimatePresence>
                {errors.password?.type === 'required' && (
                  <motion.p
                    key={'password required'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-red-500 text-sm"
                  >
                    Harap isi password
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <button className="font-semibold bg-red-500 border border-red-500 text-white py-2 mt-4 duration-300 hover:bg-white hover:text-red-500 rounded-lg">
              Masuk
            </button>
          </form>
          {/* <div className="flex gap-4 items-center w-full">
          <div className="h-[2px] bg-slate-100 w-full"></div>
          <p>atau</p>
          <div className="h-[2px] bg-slate-100 w-full"></div>
        </div>
        <motion.button
          onClick={handleClick}
          whileTap={{ scale: 0.95 }}
          className="border-2 hover:border-gray-500 duration-300 flex items-center gap-2 rounded-xl bg-white px-2 w-full justify-center py-3 font-bold"
        >
          <img src="/google-logo.svg" className="w-6" />
          Masuk dengan Google
        </motion.button> */}
        </div>
      </div>
    </>
  );
};

export default login;
