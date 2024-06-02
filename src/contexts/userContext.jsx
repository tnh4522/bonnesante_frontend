import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { database } from '../services/firebase/config';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState({
    id: 1,
    username: 'Trần Ngọc Huy',
    isAuthenticated: false,
    isStaff: false,
  })

  const saveUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Set user successfully, user: ', user)
  }

  useEffect(() => {
    // const userData = JSON.parse(localStorage.getItem('user'))
    // userData && setUser(userData)
    // set(ref(database, 'users/ ' + user.id), user)
    //   .then(() => {
    //     console.log('Set user successfully, user: ', user)
    //   })
    //   .catch((error) => {
    //     console.error('Error setting user:', error);
    //   });
  }, []);

  return <UserContext.Provider value={{ user, saveUser }}>{children}</UserContext.Provider>
}

export default UserContextProvider
