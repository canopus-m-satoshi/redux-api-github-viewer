import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { styled } from 'styled-components'
import Nav from '../molecules/Nav'
import { useEffect, useRef, useState } from 'react'

const StyledMenu = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  color: #fff;
  font-weight: bold;
  position: relative;
`

const HamburgerMenu = () => {
  const [isMenuShow, setIsMenuShow] = useState(false)
  const menuRef = useRef(null)

  const handlePageLink = () => {
    setIsMenuShow(false)
  }

  const handleMenu = () => {
    setIsMenuShow(!isMenuShow)
  }

  /**
   * ハンバーガーメニュー以外の要素をクリックでハンバーガーメニューを閉じます
   * el : HamburgerMenu (button)
   * e.target : クリックされた要素
   * contains() : Nodeインターフェイスのメソッド。あるノードが指定されたノードの子孫であるか、このノード自体であるか、
   * 直接の子ノード (childNodes) の何れかであるか、直接の子ノードの子ノードの何れかであるかを示す論理値を返す。
   *
   * 参考サイト：https://hirakublog.com/react-click-outside/
   * contains() : について→https://developer.mozilla.org/ja/docs/Web/API/Node/contains
   */
  useEffect(() => {
    const el = menuRef.current

    const handleOutsideMenu = (e) => {
      // elにクリックされた要素(e.target)が含まれていなかったらハンバーガーメニューを閉じる
      el.contains(e.target) || setIsMenuShow(false)
    }

    document.addEventListener('click', handleOutsideMenu)
  }, [menuRef, setIsMenuShow])

  return (
    <StyledMenu ref={menuRef}>
      <FontAwesomeIcon icon={faBars} size="2x" onClick={handleMenu} />
      <Nav handlePageLink={handlePageLink} isMenuShow={isMenuShow} />
    </StyledMenu>
  )
}
export default HamburgerMenu
