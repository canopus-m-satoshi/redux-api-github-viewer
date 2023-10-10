import { styled } from 'styled-components'
import NavItem from '../atoms/NavItem'

const StyledNav = styled.nav`
  text-align: left;
  background-color: #fff;
  width: 200px;
  border-radius: 2px;
  padding: 0.5rem 0.6rem;
  position: absolute;
  right: 0;
  top: 150%;
  box-shadow: rgba(51, 51, 51, 0.15) 1px 1px 4px 1px;
  display: ${(props) => (props.$isMenuShow ? 'block' : 'none')};
`

const Nav = ({ isMenuShow, handlePageLink }) => {
  return (
    <StyledNav $isMenuShow={isMenuShow}>
      <NavItem handlePageLink={handlePageLink} name="Top" path="/" />
      <NavItem handlePageLink={handlePageLink} name="Profile" path="/profile" />
      <NavItem handlePageLink={handlePageLink} name="Issue" path="/issue" />
      <NavItem handlePageLink={handlePageLink} name="Pull Request" path="/pull-request" />
    </StyledNav>
  )
}
export default Nav
