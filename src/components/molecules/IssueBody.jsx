import { styled } from 'styled-components'

import { useDispatch, useSelector } from 'react-redux'
import IssueForm from '../../components/organisms/IssueForm'
import { toggle, push } from '../../features/ui/uiSlice'
import { useEffect, useState } from 'react'
import { fetchIssueData } from '../../features/issue/issueSlice'

const StyledTableContainer = styled.div`
  overflow: scroll;
  width: 100%;
`

const StyledTable = styled.table`
  border: 1px solid rgb(225, 228, 232);
  border-radius: 6px;
`

const StyledTableTr = styled.tr`
  tbody & {
    cursor: pointer;

    &:hover {
      background: rgb(198 218 230 / 25%);
    }
  }

  th:first-child,
  td:first-child {
    min-width: auto;
    white-space: nowrap;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 150rem;
  }
`

const StyledTableTh = styled.th`
  padding: 8px;
  text-align: left;
  min-width: 10rem;
  border-bottom: 1px solid #e1e4e8;
`

const StyledTableTd = styled.td`
  padding: 8px;
  text-align: left;
  min-width: 10rem;
  border-bottom: 1px solid #e1e4e8;
`

const IssueBody = ({ searchFields, isChecked, setIsChecked }) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.issue.data)
  const [isCheckedAll, setIsCheckedAll] = useState(false)

  const handleModalShow = (e, data) => {
    dispatch(push(<IssueForm defaultValue={data} />))

    dispatch(toggle())
  }

  const handleCheck = (issueNumber) => {
    const newIsChecked = [...isChecked]

    // issueNumberが配列に存在するか確認
    const index = newIsChecked.indexOf(issueNumber)

    if (index !== -1) {
      newIsChecked.splice(index, 1)
    } else {
      newIsChecked.push(issueNumber)
    }

    setIsChecked(newIsChecked)
  }

  const handleCheckboxAll = (data) => {
    setIsCheckedAll(!isCheckedAll)

    const newIsChecked = data.map((item) => {
      return isCheckedAll ? false : item.number
    })

    setIsChecked(newIsChecked)
  }

  useEffect(() => {
    dispatch(fetchIssueData())
  }, [dispatch])

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <StyledTableTr>
            <StyledTableTh>
              <input type="checkbox" onChange={() => handleCheckboxAll(data)} checked={isCheckedAll} />
            </StyledTableTh>
            <StyledTableTh></StyledTableTh>
            <StyledTableTh>ステータス</StyledTableTh>
            <StyledTableTh>作成者</StyledTableTh>
            <StyledTableTh>作成日付</StyledTableTh>
            <StyledTableTh>更新日付</StyledTableTh>
          </StyledTableTr>
        </thead>
        <tbody>
          {searchFields.length > 0 ? (
            data.map((data) => (
              <StyledTableTr key={data.id} onClick={(e) => handleModalShow(e, data)}>
                <StyledTableTd>
                  <input
                    type="checkbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleCheck(data.number)}
                    checked={isChecked.includes(data.number)}
                  />
                </StyledTableTd>
                <StyledTableTd>{data.title}</StyledTableTd>
                <StyledTableTd>{data.state}</StyledTableTd>
                <StyledTableTd>{data.user.login}</StyledTableTd>
                <StyledTableTd>{data.createdAt}</StyledTableTd>
                <StyledTableTd>{data.updatedAt}</StyledTableTd>
              </StyledTableTr>
            ))
          ) : (
            <StyledTableTr>
              <StyledTableTd>データがありません</StyledTableTd>
            </StyledTableTr>
          )}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  )
}
export default IssueBody
