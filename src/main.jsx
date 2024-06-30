import App from './App.jsx'
import './Index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import LoadResult from './pages/LoadResult/LoadResult.jsx'
import Home from './pages/Home/Home.jsx'
import ResultPage from './pages/Result/ResultPage.jsx'
import ProtectedRoutes from './utils/ProtectedRoutes.jsx'
import CheckScheduled from './pages/Doctors/CheckScheduled/CheckScheduled.jsx'
import MeetingDoctor from './pages/Doctors/Meeting/MeetingDoctor.jsx'
import MeetingUser from './pages/Patient/MeetingUser.jsx'
import History from './pages/Result/History.jsx'
import PatientPage from './pages/Patient/Patient.jsx'
import PatientProfile from './pages/User/PatientProfile.jsx'
import UserInfo from './pages/User/UserInfo.jsx'
import Medical from './pages/Medical/Medical.jsx'
import MakeAppointment from './pages/User/MakeAppointment.jsx'
import Appointment from './pages/User/Appointment.jsx'
import HistoryPage from './pages/History/HistoryPage.jsx'
import AppointmentDetail from './pages/Appoitment/AppoitmentDetail.jsx'
import DoctorList from './pages/Doctors/ListDoctor.jsx'
import DoctorPage from './pages/Doctors/DoctorPage.jsx'
import DoctorRegister from './pages/Doctors/DoctorRegister.jsx'
import SettingsScreen from './pages/Setting/Setting.jsx'
import ListDoctorPage from './pages/Appoitment/ListDoctorPage.jsx'
import DoctorChatPage from './pages/Chat/DoctorChatPage.jsx'

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Router>
      <App>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/setting' element={<SettingsScreen />} />
          <Route path='/measure' element={<LoadResult />} />
          <Route path='/medical' element={<Medical />} />

          <Route path='/user' element={<ProtectedRoutes>
            <UserInfo />
          </ProtectedRoutes>} />

          // start doctor route
          <Route path='/doctor' element={
            <ProtectedRoutes>
              <DoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='/doctor/register' element={
            <ProtectedRoutes>
              <DoctorRegister />
            </ProtectedRoutes>
          } />
          <Route path='/doctor/list' element={
            <ProtectedRoutes>
              <DoctorList />
            </ProtectedRoutes>
          } />
          <Route path='/doctor/chat' element={
            <ProtectedRoutes>
              <ListDoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='/doctor/chat/:id' element={
            <ProtectedRoutes>
              <DoctorChatPage />
            </ProtectedRoutes>
          } />
          // end doctor route

          // start appointment route
          <Route path='/appointment' element={
            <ProtectedRoutes>
              <ListDoctorPage />
            </ProtectedRoutes>
          } />
          <Route path='appointment/make-appointment/:id' element={
            <ProtectedRoutes>
              <MakeAppointment />
            </ProtectedRoutes>
          } />
          <Route path='/appointment/detail/:id' element={
            <ProtectedRoutes>
              <AppointmentDetail />
            </ProtectedRoutes>
          } />
          // end appointment route

          // start history route
          <Route path='/history' element={
            <ProtectedRoutes>
              <HistoryPage />
            </ProtectedRoutes>
          } />
          <Route path='/history/appointment' element={
            <ProtectedRoutes>
              <Appointment />
            </ProtectedRoutes>
          } />
          <Route path='/history/result' element={
            <ProtectedRoutes>
              <History />
            </ProtectedRoutes>
          } />
          // end history route

          <Route path='/profile' element={<ProtectedRoutes>
            <PatientProfile />
          </ProtectedRoutes>} />

          <Route path='/result/:id' element={<ResultPage />} />

          <Route path='patient/meeting' element={
            <ProtectedRoutes>
              <MeetingUser />
            </ProtectedRoutes>} />

          <Route path='/doctor/meeting' element={
            <ProtectedRoutes>
              <MeetingDoctor />
            </ProtectedRoutes>} />

          <Route path='/checkScheduled' element={
            <ProtectedRoutes>
              <CheckScheduled />
            </ProtectedRoutes>
          } />

          <Route path='/patient-page' element={
            <ProtectedRoutes>
              <PatientPage />
            </ProtectedRoutes>} />

          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </App>
    </Router>
  )
}
