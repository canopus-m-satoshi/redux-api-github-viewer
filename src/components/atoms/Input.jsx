import { styled } from 'styled-components'

const StyledInputContainer = styled.div`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #e1e4e8;

  @media (max-width: 767px) {
    flex: 1 0 70%;
  }
`

const StyledInput = styled.input`
  padding: 8px;
  border: none;
  outline: none;
  background: none;
  font-size: 1rem;
  width: 100%;
`

const Input = ({ onSearchFeilds }) => {
  return (
    <StyledInputContainer>
      <StyledInput type="input" placeholder="issue名で検索" onChange={(e) => onSearchFeilds(e)} />
    </StyledInputContainer>
  )
}
export default Input
