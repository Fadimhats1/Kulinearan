import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Plus_Jakarta_Sans } from "next/font/google";
import { UserProvider } from "@/contexts/userContext";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
const queryClient = new QueryClient();

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["cyrillic-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const getServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authConfig);

  return {
    props: {
      session,
    },
  };
};

export default function App({ Component, pageProps, session }) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider defaultValue={session?.user}>
        <div className={jakartaSans.className}>
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </QueryClientProvider>
  );
}
