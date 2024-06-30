import React, { useEffect } from 'react'
import style from './ListResult.module.css'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import DataResult from './DataResult'
import useResultsContext from '../../hooks/useResultsContext'
import useTitleContext from '../../hooks/useTitleContext'

const History = () => {
  const { saveTitle } = useTitleContext();
  useEffect(() => {
    saveTitle({ title: 'Measurement History', isTurnBack: true });
  }, []);
  let navigate = useNavigate();

  const { result } = useResultsContext();

  function renderDataResult() {
    if (Object.keys(result).length === 0) {
      return <h1>Finding data ...</h1>
    } else {
      return Object.keys(result).map((key, index) => {
        console.log(result[key]);
        return (
          <SwiperSlide key={index}>
            <DataResult data={{ result: result[key] }} />
          </SwiperSlide>
        )
      })
    }
  }

  return (
    <div className={style.page}>
      <div className={style.container}>
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className={style.content}
        >
          {renderDataResult()}
        </Swiper>
        <button className={style.button} onClick={() => navigate('/')}>
          Continue Measurement
        </button>
      </div>
    </div>
  )
}
export default History