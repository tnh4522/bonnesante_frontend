import React, { useEffect, useState } from 'react';
import styles from './User.module.css';
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Collapse, Divider, Button } from 'antd';
import { API_URL } from '../../constants/values';
import useTitleContext from '../../hooks/useTitleContext';

export default function Appointment() {
    const { saveTitle } = useTitleContext();
    const [appointments, setAppointments] = useState([]);
    const [options, setOptions] = useState([]);
    const [visibleCount, setVisibleCount] = useState(3);  // Initially show 3 appointments
    const { user } = useUserContext();
    const navigate = useNavigate();
    const patient = JSON.parse(localStorage.getItem('patient'));

    // Helper function to parse date and time strings
    const parseDateTime = dateTimeString => {
        const [date, time] = dateTimeString.split(' ');
        const [day, month, year] = date.split('/');
        const [hours, minutes] = time.split(':');
        return new Date(year, month - 1, day, hours, minutes);
    };

    useEffect(() => {
        saveTitle({ title: 'Appointments', isTurnBack: true });
        axios.get(`${API_URL}patient/appointment/${patient.id}`)
            .then(res => {
                const sortedAppointments = res.data.sort((a, b) => parseDateTime(`${b.date} ${b.startTime}`) - parseDateTime(`${a.date} ${a.startTime}`));
                setAppointments(sortedAppointments);
                axios.get(`${API_URL}doctor/list`)
                    .then(res => {
                        const doctors = res.data.map(doctor => ({
                            value: doctor.id,
                            label: doctor.name
                        }));
                        setOptions(doctors);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }, [user, patient.id]);

    const getDoctorNameByID = id => options.find(option => option.value === id)?.label || 'Unknown';

    const setStatusColor = status => {
        switch (status) {
            case 'pending': return '#ffc107';
            case 'waiting': return '#0dcaf0';
            case 'finished': return '#28a745';
            default: return '#ff4d4f';
        }
    };

    const renderButton = (status, id) => {
        switch (status) {
            case 'pending':
            case 'finished':
            case 'cancelled':
                return (<Button style={{ marginRight: '5px' }} disabled>Cancel</Button>);
            case 'waiting':
                return (<Button style={{ marginRight: '5px' }} danger>Cancel</Button>);
            default:
                return (<Button style={{ marginRight: '5px' }} type="primary" onClick={() => navigate(`/appointment/detail/${id}`)}>Details</Button>);
        }
    };

    const loadMoreAppointments = () => {
        setVisibleCount(prev => Math.min(prev + 10, appointments.length));
    };

    const renderAppointments = () => appointments.slice(0, visibleCount).map((appointment, index) => (
        <div key={index} style={{ width: '90%' }}>
            <Divider orientation="left">{appointment.date}</Divider>
            <Collapse defaultActiveKey={appointment.id} style={{ width: '100%', backgroundColor: setStatusColor(appointment.status) }}>
                <Collapse.Panel header={`Appointment with doctor ${getDoctorNameByID(appointment.doctorId)}`} key={appointment.id}>
                    <div>
                        <p>Date: {appointment.date}</p>
                        <p>Time: {appointment.startTime}</p>
                        <p>Status: {appointment.status}</p>
                        {renderButton(appointment.status, appointment.id)}
                    </div>
                </Collapse.Panel>
            </Collapse>
        </div>
    ));

    return (
        <div className={styles.container}>
            <div className={styles.appointment}>
                {renderAppointments()}
                {visibleCount < appointments.length && (
                    <Button onClick={loadMoreAppointments} style={{ marginTop: '20px', display: 'block', width: '300px', alignSelf: 'center' }}>
                        Load more ({appointments.length - visibleCount} left)
                    </Button>
                )}
            </div>
        </div>
    );
}
