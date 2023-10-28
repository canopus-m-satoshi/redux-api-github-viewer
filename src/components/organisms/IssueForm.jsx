import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import Title from '../atoms/Title'
import Button from '../atoms/Button'

import { toggle } from '../../features/ui/uiSlice'
import { update, create, updateIssue } from '../../features/issue/issueSlice'
import { useEffect, useState } from 'react'
import axios from 'axios'

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 598px;
  height: 100%;
  margin-inline: auto;
`

const StyledFormContainer = styled.div`
  padding: 32px 0px 16px;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

const StyledFormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  > * {
    outline: none;
  }

  input,
  textarea,
  select {
    border-radius: 6px;
    border: 1px solid #e1e4e8;
  }

  textarea {
    min-height: 150px;
  }

  select {
    width: max-content;
  }
`

const StyledButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  column-gap: 8px;
  margin-top: auto;

  > button {
    flex-basis: 20%;
  }
`

const StyledAlertText = styled.p`
  color: #d73a49;
  background: rgba(215, 58, 73, 0.35);
  padding: 8px;
  border-radius: 6px;
  display: ${(props) => (props.$isError ? 'block' : 'none')};
`

const IssueForm = ({ defaultValue } = {}) => {
  const { id, title, state, body, number } = defaultValue || {}
  const dispatch = useDispatch()

  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState('')
  const [modalState, setModalState] = useState(0)
  const [isError, setIsError] = useState(false)
  const [alertText, setAlertText] = useState('')

  useEffect(() => {
    setModalTitle(title)
    setModalBody(body)
    setModalState(state)
  }, [title, body, state])

  const handleOnClose = () => {
    dispatch(toggle())
  }

  const onChangeTitle = (e) => {
    setModalTitle(e.target.value)
  }

  const onChangeTextarea = (e) => {
    setModalBody(e.target.value)
  }

  const onChangeState = (e) => {
    setModalState(e.target.value)
  }

  const handleOnCreate = () => {
    if (!modalTitle) {
      setIsError(true)
      setAlertText('タイトルを入力してください')
      return
    }

    if (!modalBody) {
      setIsError(true)
      setAlertText('説明を入力してください')
      return
    }

    setIsError(false)

    dispatch(
      create({
        title: modalTitle,
        body: modalBody,
        status: 0,
      }),
    )
    dispatch(toggle())
  }

  const handleOnUpdate = () => {
    setIsError(true)
    if (!modalTitle) {
      setIsError(true)
      setAlertText('タイトルを入力してください')
      return
    }

    if (!modalBody) {
      setIsError(true)
      setAlertText('説明を入力してください')
      return
    }

    setIsError(false)

    dispatch(
      updateIssue({
        id,
        number,
        title: modalTitle,
        body: modalBody,
        state: modalState,
      }),
    )
    dispatch(toggle())
  }
  return (
    <StyledContainer>
      <Title title="Issueを追加" />
      <StyledFormContainer>
        <StyledForm>
          <StyledFormItem>
            <label>タイトル</label>
            <input type="text" placeholder="タイトルを入力してください" defaultValue={title} onChange={onChangeTitle} />
          </StyledFormItem>
          <StyledFormItem>
            <label>説明</label>
            <textarea placeholder="説明を入力してください" defaultValue={body} onChange={onChangeTextarea}></textarea>
          </StyledFormItem>
          {defaultValue && (
            <StyledFormItem>
              <label>ステータス</label>
              <select defaultValue={state} onChange={onChangeState}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </StyledFormItem>
          )}
        </StyledForm>
      </StyledFormContainer>
      {isError ? <StyledAlertText $isError={isError}>{alertText}</StyledAlertText> : ''}
      <StyledButtonContainer>
        {defaultValue ? <Button text="更新" onClick={handleOnUpdate} /> : <Button text="作成" onClick={handleOnCreate} />}
        <Button text="閉じる" styleType="transparent" onClick={handleOnClose} />
      </StyledButtonContainer>
    </StyledContainer>
  )
}

export default IssueForm
