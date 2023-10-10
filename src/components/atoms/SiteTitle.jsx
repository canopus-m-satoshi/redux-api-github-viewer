import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-block: 0;
  cursor: pointer;
`

const StyledLink = styled(Link)`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`

const SiteTitle = ({ title }) => {
  return (
    <StyledTitle>
      <StyledLink to="/">{title}</StyledLink>
    </StyledTitle>
  )
}
export default SiteTitle
