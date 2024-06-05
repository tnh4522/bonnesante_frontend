import React from 'react'
import style from './ListResult.module.css'
import Icon from '@mdi/react'
import { mdiHeartPulse, mdiWater, mdiLungs } from '@mdi/js'
import Chart from './Chart'
import { PieChart } from './PieChart'

const DataResult = ({ data }) => {
  const { result } = data;
  const dateNow = new Date().toLocaleDateString();
  return (
    <div className={style.data_container}>
      <h2 className={style.title}>{result ? result.result.date : dateNow}</h2>
      <div className={style.chart}>
        <Chart result={result} />
      </div>
      <div className={style.data_section}>
        <div className={style.data_item}>
          <Icon path={mdiLungs} size={1} />
          <p>Respiration</p>
          <div className={`${style.data_circle_overlay} ${style.yellow_overlay}`}>
            <div className={`${style.data_circle}  ${style.yellow}`}>
              <strong>{result ? result.result.resp : 0}</strong>BPM
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiHeartPulse} size={1} />
          <p>Heart Rate</p>
          <div
            className={`${style.data_circle_overlay} ${style.center_overlay} ${style.red_overlay}`}
          >
            <div className={`${style.data_circle} ${style.red} ${style.center}`}>
              <strong>{result ? Math.round(result.result.heartrate) : 0}</strong>BPM
            </div>
          </div>
        </div>
        <div className={style.data_item}>
          <Icon path={mdiWater} size={1} />
          <p>SpO2</p>
          <div className={`${style.data_circle_overlay} ${style.green_overlay}`}>
            <div className={`${style.data_circle} ${style.green}`}>
              <strong>Soon</strong>
            </div>
          </div>
        </div>
      </div>
      <div className={style.data_status_container}>
        <PieChart result={result} />
      </div>
    </div>
  )
}
export default DataResult
