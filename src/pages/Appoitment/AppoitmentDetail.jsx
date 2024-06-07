import React, { useEffect, useState } from 'react';
import HeaderBar from '../../components/HeaderBar/HeaderBar'
import styles from './Appointment.module.css'
import useUserContext from '../../hooks/useUserContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Collapse, Badge, Divider, Button, Descriptions } from 'antd';
import { child } from 'firebase/database';

export default function AppointmentDetail() {
    const [appointment, setAppointment] = useState([]);
    const [options, setOptions] = useState([]);
    const [itemDoctor, setItemDoctor] = useState([]);
    const [itemPatient, setItemPatient] = useState([]);
    const { user, saveUser } = useUserContext();

    const navigater = useNavigate();

    let appointmentIDParam = useParams().id;

    useEffect(() => {
        if (user) {
            axios.get('http://localhost:8080/api/patient/appointment/detail/' + appointmentIDParam)
                .then(res => {
                    const appointment = res.data;
                    const doctor = appointment.doctorEntity;
                    const patient = appointment.patientEntity;

                    const itemDoctor = [
                        {
                            key: '1',
                            label: 'Doctor Name',
                            children: doctor.name,
                        },
                        {
                            key: '2',
                            label: 'Specialty',
                            children: doctor.specialization,
                        },
                        {
                            key: '3',
                            label: 'Hospital',
                            children: doctor.hospital,
                        },
                        {
                            key: '4',
                            label: 'Address',
                            children: doctor.address,
                        },
                        {
                            key: '5',
                            label: 'Email',
                            children: doctor.email,
                        },
                        {
                            key: '6',
                            label: 'Phone',
                            children: doctor.phone,
                        },
                        {
                            key: '7',
                            label: 'Time Available',
                            children: doctor.timeSlot,
                        }
                    ];

                    const itemPatient = [
                        {
                            key: '1',
                            label: 'Patient Name',
                            children: patient.name,
                        },
                        {
                            key: '2',
                            label: 'Email',
                            children: patient.email,
                        },
                        {
                            key: '3',
                            label: 'Phone',
                            children: patient.phone,
                        },
                        {
                            key: '4',
                            label: 'Address',
                            children: patient.address,
                        },
                        {
                            key: '5',
                            label: 'Age',
                            children: patient.age,
                        },
                        {
                            key: '6',
                            label: 'Gender',
                            children: patient.gender === 0 ? 'Male' : 'Female',
                        },
                        {
                            key: '7',
                            label: 'Health ID',
                            children: patient.healthId,
                        },
                        {
                            key: '8',
                            label: 'Blood Group',
                            children: patient.bloodGroup,
                        },
                        {
                            key: '9',
                            label: 'Weight',
                            children: patient.weight,
                        },
                        {
                            key: '10',
                            label: 'Height',
                            children: patient.height,
                        }
                    ];

                    setAppointment(appointment);
                    setItemDoctor(itemDoctor);
                    setItemPatient(itemPatient);

                })
                .catch(err => console.log(err));
        }

    }, [user]);

    const setStatusColor = (status) => {
        if (status === 'Scheduled') {
            return '#ffc107';
        } else if (status === 'Approved') {
            return '#28a745';
        } else if (status === 'Done') {
            return '#0dcaf0';
        }
    }

    const items = [
        {
            key: '1',
            label: 'Date',
            children: appointment.date,
        },
        {
            key: '2',
            label: 'Start Time',
            children: appointment.startTime,
        },
        {
            key: '3',
            label: 'End Time',
            children: appointment.endTime
        },
        {
            key: '4',
            label: 'Status',
            span: 3,
            children: <Badge status="processing" text={appointment.status} color={setStatusColor(appointment.status)} />,
        },
        {
            key: '5',
            label: 'Description',
            children: (
                <>
                {appointment.description}
                </>
            ),
        },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <HeaderBar title="Appointment Detail" />
            </div>
            <div className={styles.appointment}>
                <Descriptions title="Doctor Information" items={itemDoctor} />
                <Divider />
                <Descriptions title="Patient Information" items={itemPatient} />
                <Divider />
                <Descriptions title="Appointment Information" bordered items={items} />
            </div>
        </div>
    );
}
