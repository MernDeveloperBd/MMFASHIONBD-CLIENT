import { Helmet } from 'react-helmet-async';
import SellerOrderDataRow from '../SellerOrderDataRow/SellerOrderDataRow';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const ORDERS_PER_PAGE = 10;

const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/orders`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Pagination Logic
  const flattenedOrders = orders.flatMap(order =>
    order.items?.length > 0
      ? order.items.map((item) => ({
          _id: order._id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          customer: order.customer,
          status: order.status,
          orderDate: order.orderDate,
        }))
      : [
          {
            _id: order._id,
            title: order.title,
            price: order.price,
            quantity: order.quantity,
            customer: order.customer,
            status: order.status,
            orderDate: order.orderDate,
          },
        ]
  );

  const totalOrders = flattenedOrders.length;
  const totalPages = Math.ceil(totalOrders / ORDERS_PER_PAGE);
  const paginatedOrders = flattenedOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  return (
    <>
      <Helmet>
        <title>Manage Orders | MM Fashion World</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Name
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Customer
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Price
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Quantity
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Address
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Status
                    </th>
                    <th className="px-5 py-3 bg-white border-b text-left text-sm font-normal text-gray-800 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order, idx) => (
                    <SellerOrderDataRow
                      key={`${order._id}-${idx}`}
                      orderData={order}
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

export default ManageOrders;
