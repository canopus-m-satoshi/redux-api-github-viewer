import styled from 'styled-components'

const StyledTabPanel = styled.div`
  display: ${(props) => (props.$selectedTab ? 'block' : 'none')};
`

const TabPanel = ({ children, selectedTab }) => {
  return <StyledTabPanel $selectedTab={selectedTab}>{children}</StyledTabPanel>
}
export default TabPanel
