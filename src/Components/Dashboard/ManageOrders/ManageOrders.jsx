import { Helmet } from 'react-helmet-async';
import SellerOrderDataRow from '../SellerOrderDataRow/SellerOrderDataRow';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ['orders', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/orders`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Helmet>
        <title>Manage Orders</title>
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
                  {orders.map((order) =>
                    order.items?.length > 0 ? (
                      order.items.map((item, idx) => (
                        <SellerOrderDataRow
                          key={`${order._id}-${idx}`}
                          orderData={{
                            _id: order._id,
                            title: item.title,
                            price: item.price,
                            quantity: item.quantity,
                            customer: order.customer,
                            status: order.status,
                            orderDate: order.orderDate,
                          }}
                          refetch={refetch}
                        />
                      ))
                    ) : (
                      <SellerOrderDataRow
                        key={order._id}
                        orderData={order}
                        refetch={refetch}
                      />
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageOrders;
