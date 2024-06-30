import React, { useEffect } from 'react'
import scheduleIcon from '../../assets/images/schedule-icon.png';
import patientIcon from '../../assets/images/HearthRateIcon.png';
import style from './History.module.css'
import { Link } from 'react-router-dom';
import useTitleContext from '../../hooks/useTitleContext';

export default function HistoryPage() {
    const { saveTitle } = useTitleContext();
    useEffect(() => {
        saveTitle({ title: 'History', isTurnBack: false });
    }, []);
    return (
        <div className={style.container}>
            <div className={style.card_options}>
                <Link className={style.card} to="/history/appointment">
                    <img src={scheduleIcon} alt="schedule icon" />
                    <p className={style.card_text}>Appointment</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link>

                <Link className={style.card} to="/history/result">
                    <img src={patientIcon} alt="schedule icon" />
                    <p className={style.card_text}>Measurement</p>
                    <ion-icon name="chevron-forward-outline"></ion-icon>
                </Link>
            </div>
        </div>
    )
}
