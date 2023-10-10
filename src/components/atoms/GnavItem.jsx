import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

const StyledLink = styled(Link)`
  font-size: 1.1rem;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
`

const GnavItem = ({ name, path }) => {
  return (
    <div>
      <StyledLink to={path}>{name}</StyledLink>
    </div>
  )
}
export default GnavItem
