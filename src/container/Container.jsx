import { styled } from 'styled-components'
const StyledContainer = styled.main`
  max-width: 896px;
  margin: 0px auto;
  padding: 32px 16px;
`

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}
export default Container
