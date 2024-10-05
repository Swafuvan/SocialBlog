import { UserChecking } from '@/lib/routes/userRoutes';
import { children, UserContextType, UserDetails } from '@/types/type';
import axios from 'axios';
import { createContext, useLayoutEffect, useState } from 'react'


export const userContext = createContext<UserContextType | undefined>(undefined);

const UserProvider = ({ children }: children) => {

  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    // Function to check and fetch user details from the server
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('userToken'); // Retrieve token from localStorage
      if (token) {
        try {
          const response = await UserChecking(token);
          setUser(response.User); // Set the user data
        } catch (error) {
          console.error('Error fetching user details:', error);
          setUser(null); // If error, clear user
        }
      }
      setLoading(false); // End loading state
    };
    // Call the function when the component mounts
    fetchUserDetails();

    axios.interceptors.response.use((config) => {
      setLoading(false);
      return config;
    });

  }, []);

  const UserData = (userData: any) => {
    setUser(userData.User)
    localStorage.setItem('userToken', userData?.JWTToken)
  }

  const logOut = () => {
    setUser(null);
    localStorage.removeItem('userToken')
  }
  let value = { user, setUser, UserData, logOut, loading }

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  )
}

export default UserProvider
