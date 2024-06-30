import React, { useEffect } from 'react'
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import scheduleIcon2 from '../../assets/images/schedule-icon-8.png';
import chatIcon from '../../assets/images/images-removebg-preview.png';
import style from './Doctor.module.css'
import { Link } from 'react-router-dom';
import useTitleContext from '../../hooks/useTitleContext';

export default function DoctorPage() {
    const { saveTitle } = useTitleContext();
    useEffect(() => {
        saveTitle({ title: 'Doctor', isTurnBack: false });
    }, []);
    return (
        <div className={style.container}>
            <div className={style.card_options}>
                <Link className={style.card} to="/doctor/register">
                    <img src={scheduleIcon2} alt="schedule icon" />
                    <p className={style.card_text}>Register</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link>

                <Link className={style.card} to="/doctor/list">
                    <img src={doctorIcon} alt="schedule icon" />
                    <p className={style.card_text}>My Doctor</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link>

                <Link className={style.card} to="/doctor/chat">
                    <img src={chatIcon} alt="schedule icon" />
                    <p className={style.card_text}>Chat</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link>
            </div>
        </div>
    )
}
