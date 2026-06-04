import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Helper function for the main API call
  const fetchUserDetails = async (token) => {
    return await fetch("http://localhost:5000/api/auth/getUserDetails", {
      credentials: 'include',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem("accessToken");

        if (!storedToken) {
          navigate("/login");
          return;
        }

        // 1. Initial Fetch
        const response = await fetchUserDetails(storedToken);
        console.log(response);

        // 2. If Token is valid (Status 200)
        if (response.ok) {
          const result = await response.json();
          // Adjust 'result.data' based on your backend response structure
          setUser(result.data || result); 
        } 
        
        // 3. Handle Token Expiration (Status 401 or 403)
        else if (response.status === 401 || response.status === 403) {
          console.log("Access Token Expired, attempting refresh...");
          
          try {
            const refreshRes = await fetch("http://localhost:5000/api/auth/refresh", {
              credentials: 'include',
            });

            if (refreshRes.ok) {
              const refreshData = await refreshRes.json();
              // Note: Ensure your backend returns the token as { accessToken: "..." }
              const newAccessToken = refreshData.accessToken;

              if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken);
                
                // Retry the original request with the new token
                const retryResponse = await fetchUserDetails(newAccessToken);
                const retryData = await retryResponse.json();
                setUser(retryData.data || retryData);
              }
            } else {
              throw new Error("Refresh token failed or expired");
            }
          } catch (refreshError) {
            console.error("Session expired:", refreshError);
            localStorage.clear();
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        localStorage.clear(); // Clear local storage on logout
        setUser(null); // Explicitly set user to null
        navigate('/login');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please check your connection.");
    }
  };

  return (
    <div className="flex justify-center items-center max-w-full bg-blue-500 min-h-screen">
      <div className="flex flex-col bg-white p-8 w-[400px] shadow-lg rounded-xl">
        <p className="text-center font-extrabold text-2xl mb-4">User Details</p>
        
        {user ? (
          <div className="mb-6">
            <p className="my-2 p-4 bg-gray-50 rounded shadow-sm">
              <span className="font-bold text-gray-700">Name:</span> {user.name}
            </p>
            <p className="my-2 p-4 bg-gray-50 rounded shadow-sm">
              <span className="font-bold text-gray-700">Email:</span> {user.email}
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6 italic">Loading user information...</p>
        )}

        <button 
          onClick={logOut} 
          className="bg-red-500 hover:bg-red-600 text-white w-full px-4 py-2 rounded-lg transition duration-200 font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;