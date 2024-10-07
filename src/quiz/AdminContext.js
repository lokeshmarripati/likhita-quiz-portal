// // src/UserContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// // Create the UserContext
// const AdminContext = createContext();

// // Custom hook to use the UserContext
// export const useAdmin = () => useContext(AdminContext);

// // UserProvider component to wrap around the app
// export const AdminProvider = ({ children }) => {
//     const [admin, setAdmin] = useState(null); // Store logged-in user data here

//     // Function to log in the user by fetching data from the fake server
//     const loginAdmin = async (adminId) => {
//         try {
//             const response = await axios.get(`http://localhost:3000/admin/${adminId}`);
//             setUser(response.data); // Set the user data in context
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     return (
//         <AdminContext.Provider value={{ admin, setAdmin, loginAdmin }}>
//             {children}
//         </AdminContext.Provider>
//     );
// };
