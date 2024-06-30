import React from 'react';
import style from './FooterBar.module.css';
import { NavLink } from 'react-router-dom';
import doctorIcon from '../../assets/images/doctor-icon-avatar-white_136162-58.png';
import scheduleIcon from '../../assets/images/schedule-icon.png';
import patientIcon from '../../assets/images/patient-profile.png';
import scheduleIcon2 from '../../assets/images/schedule-icon-8.png';
import measureIcon from '../../assets/images/1599782.png';

const FooterBar = () => {
    return (
        <nav className={style.footer}>
            <NavLink
                className={style.card}
                to="/"
            >
                <img src={measureIcon} alt="measure icon" />
                <p>Measure</p>
            </NavLink>

            <NavLink
                className={style.card}
                to="/doctor"
            >
                <img src={doctorIcon} alt="doctor icon" />
                <p>Doctor</p>
            </NavLink>

            <NavLink
                className={style.card}
                to="/appointment"
            >
                <img src={scheduleIcon} alt="appointment icon" />
                <p>Appointment</p>
            </NavLink>

            <NavLink
                className={style.card}
                to="/history"
            >
                <img src={scheduleIcon2} alt="history icon" />
                <p>History</p>
            </NavLink>

            <NavLink
                className={style.card}
                to="/profile"
            >
                <img src={patientIcon} alt="profile icon" />
                <p>Profile</p>
            </NavLink>
        </nav>
    );
}

export default FooterBar;
