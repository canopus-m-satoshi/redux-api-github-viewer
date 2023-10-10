import { styled } from 'styled-components'
import GnavItem from '../atoms/GnavItem'

const StyledList = styled.nav`
  flex-grow: 1;
  display: flex;
  gap: 1rem;

  @media (max-width: 767px) {
    display: none;
  }
`

const Gnav = () => {
  return (
    <StyledList>
      <GnavItem name="Issue" path="/issue" />
      <GnavItem name="Pull Request" path="/pull-request" />
    </StyledList>
  )
}
export default Gnav
