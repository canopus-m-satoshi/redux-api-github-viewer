import { styled } from 'styled-components'
import Button from '../atoms/Button'
import HeaderTitle from '../atoms/HeaderTitle'
import Input from '../atoms/Input'
import IssueForm from '../organisms/IssueForm'
import { useDispatch } from 'react-redux'
import { toggle, push } from '../../features/ui/uiSlice'
import { closeIssue } from '../../features/issue/issueSlice'
import { toast } from 'react-toastify'
import { toastConfig } from '../../toastConfig'

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  column-gap: 8px;

  @media (max-width: 767px) {
    margin-bottom: 14px;
    flex-wrap: wrap;
    justify-content: space-between;

    > h2 {
    }

    > button {
      flex: 0 0 45.5%;
    }
  }
`

const IssueHeader = ({ onSearchFeilds, isChecked }) => {
  const dispatch = useDispatch()

  const onAdd = () => {
    dispatch(push(<IssueForm />))
    dispatch(toggle())
  }

  const onClose = async () => {
    if (isChecked.length === 0) {
      toast.warn('Please Check an issue at least', toastConfig)
      return
    }

    try {
      const response = await dispatch(closeIssue(isChecked))
      Object.keys(response.messages).forEach(key => {
        const { type, message } = response.messages[key]
        if (toast[type]) {
          toast[type](message, toastConfig)
        }
      })
    } catch {
      toast.error("Faield to close issue", toastConfig)
    }
  }

  return (
    <StyledHeader>
      <HeaderTitle title="Issue" />
      <Input onSearchFeilds={onSearchFeilds} />
      <Button onClick={onAdd}>New</Button>
      <Button onClick={onClose} styleType="delete" disabled={isChecked.length === 0 ? true : false}>
        Close Issue
      </Button>
    </StyledHeader>
  )
}
export default IssueHeader
