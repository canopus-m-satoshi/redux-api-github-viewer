import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { toggle as handleModal } from '../../features/ui/uiSlice'
import styled from 'styled-components'

Modal.setAppElement('#root')

const StyledModal = styled(Modal)`
  position: absolute;
  inset: 40px;
  border: 1px solid #cccccc;
  background: #fff;
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;

  margin: auto;
  width: 60%;

  @media (max-width: 767px) {
    inset: 20px;
    width: 90%;
  }
`

const ModalWrapper = () => {
  const { toggle, stack } = useSelector((state) => state.ui.modal)
  const dispatch = useDispatch()

  const handleCloseModal = () => {
    dispatch(handleModal())
  }

  return (
    <StyledModal isOpen={toggle} onRequestClose={handleCloseModal} contentLabel="Add Issue Modal" key="global-modal">
      {stack[stack.length - 1]}
    </StyledModal>
  )
}
export default ModalWrapper
