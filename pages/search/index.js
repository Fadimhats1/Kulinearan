import { restaurantData } from '@/utils/dataDummy';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { CardRecommendation } from '@/components/CardRecommendation';
import Head from 'next/head';
import axios from 'axios';
import { BASE_URL } from '@/lib/constant';

const SearchPages = ({ searchData, searchParams }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(searchData)

  if (isLoading) {
    return (
      <div className="grid place-items-center min-h-screen">
        <div className="w-4 h-4 bg-red-500 animate-spin"></div>
      </div>
    );
  }

  if (searchData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 grid place-items-center">
        <Navbar />
        <div className="bg-white p-6 px-8 rounded-3xl">
          <h2 className="font-medium text-md lg:text-2xl">
            Result for{' '}
            {searchParams.name === '' ? 'All' : searchParams.name}{' '}
            on {searchParams.location} not found :{`(`}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen ">
      <Navbar />
      <Head>
        <title>Kulinearan</title>
      </Head>
      <main className="w-full mt-32 mb-16 min-h-screen flex flex-col items-center lg:max-w-[1080px] xl:max-w-[80%] ">
        <h2 className="font-bold my-4 mb-6 text-xl sm:text-3xl lg:text-4xl">
          Result for{' '}
          {searchParams.name === '' ? 'All' : searchParams.name}{' '}
          in {searchParams.location}{' '}
        </h2>
        <div className="px-12 grid grid-cols-1 w-full sm:grid-cols-2 lg:grid-cols-3 gap-9">
          {searchData.length === 0 ? (
            <h1>Restaurant not found :{`(`}</h1>
          ) : (
            searchData.map((item, index) => (
              <CardRecommendation
                key={`${item.name} recommendation key 1`}
                {...item}
                index={index + 1}
                tabValue={'asdasd'}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { name = '', location = '' } = context.query;
  
  try {
    const result = await axios.get(
      `${BASE_URL}/restaurant?name=${name}&location=${location}`
    );
    return {
      props: {
        searchData: result.data.data || [],
        searchParams: {
          name: name || '',
          location: location || ''
        }
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        searchData: [],
        searchParams: {
          name: name || '',
          location: location || ''
        }
      }
    };
  }
}

export default SearchPages;