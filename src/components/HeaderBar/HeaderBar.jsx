import React from 'react'
import style from './HeaderBar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import useTitleContext from '../../hooks/useTitleContext'

const HeaderBar = (props) => {
    const navigate = useNavigate();

    const { title } = useTitleContext();

    function turnBack() {
        const history = window.history;
        if (history.length > 2) {
            history.back();
        } else {
            navigate('/');
        }
    }

    return (
        <div className={style.header}>
            {title.isTurnBack ?
                <Link onClick={turnBack} to='#'>
                    <ion-icon name="arrow-back-outline"></ion-icon>
                </Link> :
                <Link to="/">
                    <ion-icon name="home-outline"></ion-icon>
                </Link>
            }

            <h3>{title.title}</h3>

            <Link to='/setting' className={style.right}>
                <ion-icon name="settings-outline"></ion-icon>
            </Link>
        </div>
    )
}
export default HeaderBar
