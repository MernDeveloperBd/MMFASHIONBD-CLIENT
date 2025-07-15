import { useContext } from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import { AuthContext } from "../Components/AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";


const useRole = () => {
    const axiosSecure = UseAxiosSecure()
    const {user, loading} = useContext(AuthContext)
    const {data: role, isLoading} = useQuery({
        queryKey:['role', user?.email],
        enabled: !loading && !!user?.email ,
        queryFn: async() =>{
            const {data} = await axiosSecure(`/users/role/${user?.email}`)
            return data.role;
        }
    })
    
    return [role, loading || isLoading];
};

export default useRole;