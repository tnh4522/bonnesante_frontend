import React, { useEffect, useState } from 'react'
import style from './MeetingUser.module.css'
import FindingDoctor from '../../lazy/FindingDoctor'
import { ref, onValue, child } from 'firebase/database'
import { database } from '../../services/firebase/config'
import JoinMeetingUser from '../../components/Meeting/JoinMeetingUser'
import useTitleContext from '../../hooks/useTitleContext'

const MeetingUser = () => {
  const {saveTitle} = useTitleContext();
  useEffect(() => {
    saveTitle({title: 'Meeting', isTurnBack: true});
  }, []);
  const [isAccepted, setIsAccepted] = useState(false);

  const dbRef = ref(database);

  const patientId = JSON.parse(localStorage.getItem('patient')).id;

  onValue((child(dbRef, `videoCall/${patientId}`)), (snapshot) => {
    const requestInfo = snapshot.val();

    if (requestInfo.isAccepted !== isAccepted) {
      setIsAccepted(requestInfo.isAccepted);
    }
  });

  return (
    <div className={style.page}>
      <div className={style.containerMeetingUser}>
        <div className={style.contentMeetingUser}>
          {
            isAccepted ? <JoinMeetingUser /> : <FindingDoctor />
          }
        </div>
      </div>
    </div>
  )
}
export default MeetingUser;
