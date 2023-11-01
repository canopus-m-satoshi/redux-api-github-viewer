import { styled } from 'styled-components'
import Button from '../atoms/Button'
import HeaderTitle from '../atoms/HeaderTitle'
import Input from '../atoms/Input'
import IssueForm from '../organisms/IssueForm'
import { useDispatch } from 'react-redux'
import { toggle, push } from '../../features/ui/uiSlice'
import { closeIssue, remove } from '../../features/issue/issueSlice'

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

  const onClose = () => {
    dispatch(closeIssue(isChecked))
  }

  return (
    <StyledHeader>
      <HeaderTitle title="Issue" />
      <Input onSearchFeilds={onSearchFeilds} />
      <Button onClick={onAdd}>New</Button>
      <Button onClick={onClose} styleType="delete">
        Close Issue
      </Button>
    </StyledHeader>
  )
}
export default IssueHeader
