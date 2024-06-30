import React from 'react'
import { createContext, useState } from 'react'

export const TitleContext = createContext();

const TitleContextProvider = ({ children }) => {
  const [title, setTitle] = useState({ title: 'Bonne Santé', isTurnBack: false });

  const saveTitle = (title) => {
    setTitle(title)
  }

  return <TitleContext.Provider value={{ title, saveTitle }}>{children}</TitleContext.Provider>
}

export default TitleContextProvider;
