/* eslint-disable prettier/prettier */
import React from 'react'
import UserContextProvider from './contexts/userContext'
import ResultsContextProvider from './contexts/resultsContext'
import FooterBar from './components/Footer/FooterBar'
import HeaderBar from './components/HeaderBar/HeaderBar'
import TitleContextProvider from './contexts/titleContext'

const App = ({ children }) => {
  const checkUser = localStorage.getItem('user') === null ? false : true;
  return (
    <TitleContextProvider>
      <UserContextProvider>
        <ResultsContextProvider>
          <HeaderBar />
          {children}
          <FooterBar />
        </ResultsContextProvider>
      </UserContextProvider>
    </TitleContextProvider>
  )
}
export default App