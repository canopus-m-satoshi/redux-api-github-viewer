import styled from 'styled-components'

const StyledTab = styled.li`
  font-size: 1.2rem;
  width: 100%;
  text-align: center;
  list-style-type: none;
  border-radius: 6px 6px 0px 0px;
  border: ${(props) => (props.$selectedTab ? '1px solid #e1e4e8' : 'none')};
  border-bottom: ${(props) => (props.$selectedTab ? 'none' : '1px solid #e1e4e8')};
  // 上記の部分を修正し、選択されたタブにボーダーボトムを追加

  span {
    cursor: pointer;
    color: #586069;
    padding: 16px;
    display: block;
    width: 100%;
  }
`

const Tab = ({ children, selectedTab, onClick, handleTabClick }) => {
  return (
    <StyledTab onClick={onClick} $handleTabClick={handleTabClick} $selectedTab={selectedTab}>
      <span>{children}</span>
    </StyledTab>
  )
}
export default Tab
