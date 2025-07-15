import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Components/AuthProvider/AuthProvider'

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

const UseAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useContext(AuthContext)
 useEffect(() => {
  const interceptor = axiosSecure.interceptors.response.use(
    res => res,
    async error => {
      console.log('Error caught from axios interceptor-->', error.response)
      if (error.response.status === 401 || error.response.status === 403) {
        await logOut()
        navigate('/login')
      }
      return Promise.reject(error)
    }
  )

  return () => {
    axiosSecure.interceptors.response.eject(interceptor)
  }
}, [logOut, navigate])
  return axiosSecure
}

export default UseAxiosSecure;