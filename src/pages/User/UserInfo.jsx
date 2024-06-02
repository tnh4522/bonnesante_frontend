import React, { useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './User.module.css'

export default function UserInfo() {
    const [unit, setUnit] = useState('metric');
    const [gender, setGender] = useState('other');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');

    const { user, saveUser } = useUserContext();

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar />
            </div>
            <form className={styles.formProfile}>
                <div className={styles.inputGroup}>
                    <button className={unit === 'metric' ? `${styles.toggleButton} ${styles.active}` : styles.toggleButton} onClick={() => setUnit('metric')}>kg, cm</button>
                    <button className={unit === 'imperial' ? `${styles.toggleButton} ${styles.active}` : styles.toggleButton} onClick={() => setUnit('imperial')}>lb, ft</button>
                </div>
                <div className={styles.inputGroup}>
                    <label>Gender</label>
                    <div className={styles.genderButtons}>
                        <button className={gender === 'male' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('male')}>Male</button>
                        <button className={gender === 'female' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('female')}>Female</button>
                        <button className={gender === 'other' ? `${styles.genderButton} ${styles.active}` : styles.genderButton} onClick={() => setGender('other')}>Other</button>
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label>Age</label>
                    <input type="number" name="age" value={age} onChange={e => setAge(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Weight</label>
                    <input type="number" name="weight" value={weight} onChange={e => setWeight(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <label>Height</label>
                    <input type="number" name="height" value={height} onChange={e => setHeight(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <button type="submit" className={styles.saveButton}>SAVE</button>
                </div>
            </form>
        </div>
    )
}
