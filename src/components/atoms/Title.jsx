import { styled } from 'styled-components'

const StyledTitle = styled.h1`
  font-size: 21px;
  place-items: center;
  place-content: center;

  display: ${(props) => (props.$centering ? 'grid' : 'block')};
  margin-top: ${(props) => props.$centering && '5rem'};
  text-align: ${(props) => props.$centering && 'center'};
`

const Title = ({ title, centering }) => {
  return <StyledTitle $centering={centering}>{title}</StyledTitle>
}
export default Title
