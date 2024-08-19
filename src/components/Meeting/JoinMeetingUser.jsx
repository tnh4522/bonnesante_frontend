import React from 'react';
import { MeasureModal } from './MeasureModal';
import MeetingRoomUser from './MeetingRoomUser';
import style from "./Meeting.module.css"

function JoinMeetingUser() {

  const [stateMeasure, setStateMeasure] = React.useState(false);
  const patientId = JSON.parse(localStorage.getItem('patient')).id;

  const getMeasure = () => {
    setStateMeasure(true);
  }

  return (
    <div>
      <MeetingRoomUser role={0} userID={patientId} />
      {stateMeasure ? (
        <MeasureModal />
      ) : (
        <div>
          <button className={style.mini_heart} onClick={getMeasure}>Measure</button>
        </div>
      )}
    </div>
  );
}
export default JoinMeetingUser;