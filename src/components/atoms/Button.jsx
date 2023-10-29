import { styled } from 'styled-components'

const StyleBasedButton = styled.button`
  cursor: pointer;
  display: block;
  text-align: center;
  padding: 8px 16px;
  margin: 4px;
  width: 120px;
  min-width: 100px;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  outline: none;
  border: none;
  appearance: none;
  background: #42c360;
  background: #42c360;
  border-bottom: 2px solid #28a745;

  &:hover {
    background: #28a745;
    border-bottom: 2px solid #208437;
  }
`

const StyledButtonPrimary = styled(StyleBasedButton)`
  background: #4742c3;
  border-bottom: 2px solid #2833a7;
`

const StyledButtonDelete = styled(StyleBasedButton)`
  background: #d73a49;
  border-bottom: 2px solid #af1c2a;

  &:hover {
    background: #af1c2a;
    border-bottom: 2px solid #671019;
  }
`

const StyledButtonTransparent = styled(StyleBasedButton)`
  background: transparent;
  border: none;
  color: #0366d6;

  &:hover {
    background: transparent;
    border-bottom: none;
  }
`

// 全ボタンコンポーネント
const buttonStyleLists = {
  default: StyleBasedButton,
  primary: StyledButtonPrimary,
  delete: StyledButtonDelete,
  transparent: StyledButtonTransparent,
}

const Button = ({ children, styleType, onClick }) => {
  const Component = buttonStyleLists[styleType] || buttonStyleLists.default

  return <Component onClick={onClick}>{children}</Component>
}
export default Button
