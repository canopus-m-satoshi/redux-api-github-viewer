import { styled } from 'styled-components'

const StyledTitle = styled.h2`
  font-size: 1.5em;
`

const HeaderTitle = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>
}
export default HeaderTitle
