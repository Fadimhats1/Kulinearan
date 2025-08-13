import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardCollection } from "@/components/CardCollection";
import { CardRecommendation } from "@/components/CardRecommendation";
import { TabChip } from "@/components/TabChip";
import { collectionData } from "@/utils/dataDummy";
import Head from "next/head";
import HeroSection from "@/components/HeroSection";
import { BASE_URL } from "@/lib/constant";
export async function getServerSideProps(ctx) {
  const res = await fetch(`${BASE_URL}/restaurant`).then((result) =>
    result.json()
  );

  return {
    props: {
      data: res.data,
    },
  };
}

export default function Home({ data }) {
  const [tabValue, setTabValue] = useState("Semua");
  const [offset, setOffset] = useState(0);
  const [originalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const { isLoading } = useQuery({
    queryKey: ["mainData"],
    queryFn: async () =>
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      }),
  });

  useEffect(() => {
    setFilteredData(
      originalData.filter((item) => {
        if (tabValue === "Semua") {
          return true;
        }

        return item.categories.some((category) => category === tabValue);
      })
    );
  }, [tabValue]);
  console.log(filteredData)

  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="w-4 h-4 bg-red-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative lg:overflow-hidden grid place-items-center">
      <Head>
        <title>Kulinearan</title>
      </Head>

      <div className="w-full lg:max-w-[1080px] xl:max-w-[80%] flex flex-col items-center">
        <HeroSection />

        {/* body */}
        <main className="mt-16 pb-24 lg:max-w-5xl px-8 w-full lg:px-0 flex flex-col items-center gap-12">
          {/* Koleksi Restoran */}
          <section className="flex flex-col gap-2 w-full overflow-x-hidden">
            <h2 className="font-bold text-3xl">Koleksi Restoran Di Jakarta</h2>
            <p className="">
              Jelajahi daftar terpilih untuk restoran, kafe dan bar terbaik
              Jakarta <br />
              berdasarkan tren
            </p>
            <div className="lg:flex grid grid-cols-2 mt-2 gap-4 w-full overflow-x-auto">
              {collectionData.map((item, index) => {
                return (
                  <CardCollection
                    key={`card collection - ${item.name}`}
                    name={item.name}
                    index={index + 1}
                  />
                );
              })}
            </div>
          </section>

          <section className="flex mt-8 flex-col gap-6 w-full ">
            <h2 className="font-bold text-3xl h">Rekomendasi Restoran</h2>
            <div className="flex gap-5 w-full flex-col lg:flex-row lg:justify-between items-center">
              {/* Tab Chip */}
              <div className="flex gap-4">
                {["Semua", "Pizza", "Sushi", "Burger", "Fine Dining"].map(
                  (name) => (
                    <TabChip
                      key={`${name} chip`}
                      onClickHandler={(name) => {
                        setTabValue(name);
                        setOffset(0);
                      }}
                      name={name}
                      tabValue={tabValue}
                    />
                  )
                )}
              </div>
              <div className="hidden lg:flex gap-2 h-fit">
                <button
                  disabled={offset === 0}
                  onClick={() => setOffset((prev) => prev - 6)}
                  className="group bg-red-500 disabled:bg-gray-100 rounded-full h-12 w-12 flex justify-center items-center"
                >
                  <ChevronLeft
                    size={32}
                    className="mr-1  duration-300 text-white group-disabled:text-gray-500 "
                  />
                </button>
                <button
                  disabled={filteredData.length - 6 <= offset}
                  onClick={() => setOffset((prev) => prev + 6)}
                  className="bg-red-500 group disabled:bg-gray-100 rounded-full h-12 w-12 flex justify-center items-center"
                >
                  <ChevronRight
                    size={32}
                    className="ml-1 duration-300 text-white group-disabled:text-gray-500"
                  />
                </button>
              </div>
            </div>
            <div className="grid gap-4 gap-y-5 grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => {
                if (filteredData.length <= index + offset) {
                  return null;
                }

                const item = filteredData[index + offset];

                return (
                  <CardRecommendation
                    key={`${item.name} recommendation key 1`}
                    {...item}
                    index={index + 1}
                    tabValue={tabValue}
                  />
                );
              })}
            </div>
            <div className="lg:hidden flex w-full justify-center gap-2 h-fit">
              <button
                disabled={offset === 0}
                onClick={() => setOffset((prev) => prev - 6)}
                className="group bg-red-500 disabled:bg-gray-100 rounded-full h-12 w-12 flex justify-center items-center"
              >
                <ChevronLeft
                  size={32}
                  className="mr-1  duration-300 text-white group-disabled:text-gray-500 "
                />
              </button>
              <button
                disabled={filteredData.length - 6 <= offset}
                onClick={() => setOffset((prev) => prev + 6)}
                className="bg-red-500 group disabled:bg-gray-100 rounded-full h-12 w-12 flex justify-center items-center"
              >
                <ChevronRight
                  size={32}
                  className="ml-1  duration-300 text-white group-disabled:text-gray-500"
                />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
