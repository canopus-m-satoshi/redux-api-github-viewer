import styled from 'styled-components'

const StyledTabList = styled.ul`
  display: flex;
  padding-left: 0;
`

const TabList = ({ children }) => {
  return <StyledTabList>{children}</StyledTabList>
}
export default TabList
