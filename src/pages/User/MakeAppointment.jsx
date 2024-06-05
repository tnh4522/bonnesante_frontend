import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './User.module.css'
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Select } from 'antd';
import { Collapse, Divider } from 'antd';

export default function MakeAppointment() {
    const [appointment, setAppointment] = useState([]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [healthID, setHealthID] = useState('');

    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');

    const [items, setItems] = useState([]);

    const { user, saveUser } = useUserContext();

    const navigater = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Action in progress..',
                duration: 2.5,
            })
            .then(() => message.success('Profile updated successfully', 1.5))
    };

    const [options, setOptions] = useState([]);

    const handleChange = (value) => {
        setDoctorId(value);
    };

    const getDoctorNameByID = (doctors, id) => {
        for (let i = 0; i < doctors.length; i++) {
            if (doctors[i].id === id) {
                return doctors[i].name;
            }
        }
    }

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:8080/api/patient/' + user.id)
                .then(res => {
                    const patient = res.data;

                    setPatientId(patient.id);
                    setName(patient.name);
                    setEmail(patient.email);
                    setPhone(patient.phone);
                    setAddress(patient.address);
                    setHealthID(patient.healthId);

                    axios.get('http://localhost:8080/api/patient/appointment/' + patient.id)
                        .then(res => {
                            const appointment = res.data;
                            console.log(appointment);
                            setAppointment(appointment);

                            axios.get('http://localhost:8080/api/doctor/list')
                                .then(res => {
                                    const doctors = res.data;
                                    const options = doctors.map(doctor => {
                                        return {
                                            value: doctor.id,
                                            label: doctor.name
                                        }
                                    });

                                    appointment.map(appointment => {
                                        const item = {
                                            key: appointment.id,
                                            label: 'Appointment with ' + getDoctorNameByID(doctors, appointment.doctor_id),
                                            children: <div>
                                                <p>Doctor: {getDoctorNameByID(doctors, appointment.doctor_id)}</p>
                                                <p>Date: {appointment.date}</p>
                                                <p>Time: {appointment.start_time}</p>
                                                <p>Status: {appointment.status}</p>
                                            </div>
                                        }
                                        setItems(items => [...items, item]);
                                    });

                                    setOptions(options);
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        }

    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !address || !healthID || !doctorId || !date || !startTime) {
            message.error('Please fill in all fields');
            return;
        } else {
            const appointment = {
                patient_id: patientId,
                doctor_id: doctorId,
                date: date,
                start_time: startTime
            }

            axios.post('http://localhost:8080/api/patient/appointment', appointment)
                .then(res => {
                    console.log(res.data);
                    success();
                    navigater('/home');
                })
                .catch(err => console.log(err));
        }
    }

    if (!appointment.length > 0) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <HeaderBar />
                </div>
                {contextHolder}
                <h1>Make Appointment</h1>
                <form className={styles.formProfile}>
                    <div className={styles.inputGroup}>
                        <label>Name</label>
                        <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Phone</label>
                        <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Address</label>
                        <input type="text" name="address" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Health ID</label>
                        <input type="text" name="healthID" value={healthID} onChange={e => setHealthID(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Doctor</label>
                        <Select
                            showSearch
                            style={{
                                width: '100%',
                                height: '40px',
                                borderRadius: '15px',
                            }}
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            placeholder="Select Doctor"
                            onChange={handleChange}
                            options={options}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Date</label>
                        <input type="date" name="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Time</label>
                        <input type="time" name="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                    </div>
                    <div className={styles.inputGroup}>
                        <button type="button" className={styles.saveButton} onClick={handleSubmit}>Make Appointment</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar />
            </div>
            {contextHolder}
            <h1>Appointment</h1>
            <div className={styles.appointment}>
                <Collapse items={items} defaultActiveKey={appointment.map(appointment => appointment.id)} style={{'width': '100%'}}/>
            </div>
        </div>
    );
}
