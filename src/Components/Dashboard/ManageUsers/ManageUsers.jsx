import { Helmet } from 'react-helmet-async';
import UserDataRow from '../UserDataRow/UserDataRow';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import LoadingSpinner from '../../Shared/LoadingSpinner';

const ManageUsers = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
    isError,
    error
  } = useQuery({
    queryKey: ['users', user?.email],
    enabled: !!user?.email, // Ensure email is available before running
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/all-users/${user?.email}`, {
        withCredentials: true,
      });
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>Error loading users: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <Helmet>
        <title>Manage Users | MM Fashion World</title>
      </Helmet>
      <div className="py-8">
        <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-700 uppercase">
                    Email
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-700 uppercase">
                    Role
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm font-semibold text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.length > 0 ? (
                  users.map((userData) => (
                    <UserDataRow
                      key={userData?._id}
                      userData={userData}
                      refetch={refetch}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-6 text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
