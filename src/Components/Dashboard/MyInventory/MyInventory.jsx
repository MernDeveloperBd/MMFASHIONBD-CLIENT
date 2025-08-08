import { Helmet } from 'react-helmet-async';
import ProductDataRow from '../PlantDataRow/PlantDataRow';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import { useState } from 'react';

const ITEMS_PER_PAGE = 10;

const MyInventory = () => {
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products = [], isLoading, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axiosSecure(`/products/admin`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Pagination Logic
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Helmet>
        <title>My Inventory | MM Fashion World</title>
      </Helmet>
      <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Image
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Name
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Category
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Price
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Quantity
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Delete
                    </th>
                    <th className='px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase'>
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((productData) => (
                    <ProductDataRow
                      key={productData?._id}
                      productData={productData}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
              <div className="flex justify-center items-center py-4 bg-white border-t">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 mx-1 border rounded ${
                      currentPage === idx + 1 ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 mx-1 border rounded ${
                    currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInventory;
