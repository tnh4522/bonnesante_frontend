import { useContext } from 'react'
import { TitleContext } from '../contexts/titleContext'

const useTitleContext = () => {
  const { title, saveTitle } = useContext(TitleContext)

  return { title, saveTitle }
}

export default useTitleContext;
