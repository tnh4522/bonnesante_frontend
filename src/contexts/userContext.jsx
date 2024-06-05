import React from 'react'
import { createContext, useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { database } from '../services/firebase/config';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

  const [user, setUser] = useState({})

  const saveUser = (user) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user));
    console.log('Set user successfully, user: ', user)
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    userData && setUser(userData)
  }, []);

  return <UserContext.Provider value={{ user, saveUser }}>{children}</UserContext.Provider>
}

export default UserContextProvider
