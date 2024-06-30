import React, { useEffect } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import scheduleIcon from '../../assets/images/schedule-icon.png';
import patientIcon from '../../assets/images/patient-profile.png';
import scheduleIcon2 from '../../assets/images/schedule-icon-8.png';
import chatIcon from '../../assets/images/images-removebg-preview.png';
import style from './Home.module.css';
import { Link } from 'react-router-dom';
import { ref, set, child } from "firebase/database";
import { database } from '../../services/firebase/config';
import { useNavigate } from 'react-router-dom';
import useUserContext from '../../hooks/useUserContext';
import useTitleContext from '../../hooks/useTitleContext';

export default function Home() {
  const navigate = useNavigate();
  const { user, saveUser } = useUserContext();
  const { title, saveTitle } = useTitleContext();

  useEffect(() => {
      saveTitle({ title: 'Bonne Santé', isTurnBack: false });
  }, []);
  
  const dbRef = ref(database);

  const RequestVideoCall = () => {
    set(child(dbRef, `videoCall/` + user.id), {
      username: user.username,
      userID: user.id,
      isAccepted: false,
      isActive: true,
      doctorID: null,
      timeRequest: new Date().getTime(),
      timeAccepted: null,
      isMeeting: true
    })
      .then(() => {
        navigate('/patient/meeting')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={style.container}>

      <Link className={style.start_measure} to="/measure">
        <div className={style.text_overlay}>
          Start <br /> Measuring
        </div>
      </Link>

      <p>Start my first measurement!</p>
      <button type='button' className={style.measurement_instruction}>How to measure</button>
      {/* <div className={style.card_options}>
        <Link className={style.card} to="/doctor">
          <img src={doctorIcon} alt="schedule icon" />
          <p className={style.card_text}>Doctor</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>

        <Link className={style.card} to="/appointment/doctor/list">
          <img src={scheduleIcon} alt="schedule icon" />
          <p className={style.card_text}>Appointment</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>

        <Link className={style.card} to="/history">
          <img src={scheduleIcon2} alt="schedule icon" />
          <p className={style.card_text}>History</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>

        <Link className={style.card} to="/profile">
          <img src={patientIcon} alt="schedule icon" />
          <p className={style.card_text}>Profile</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>

        <Link className={style.card} to="/chat">
          <img src={chatIcon} alt="schedule icon" />
          <p className={style.card_text}>Chat</p>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </Link>
      </div> */}
    </div>
  )
}
