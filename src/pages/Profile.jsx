import styled from 'styled-components'
import Title from '../components/atoms/Title'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../features/user/userSlice'
import { useEffect } from 'react'

const StyledContainer = styled.div`
  margin: 32px 0px;
  padding: 16px;
  display: flex;
  border-radius: 6px;
  border: 1px solid #e1e4e8;

  @media screen and (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
  }
`
const StyledItem = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

const StyledAvator = styled.img`
  color: #586069;
  max-width: 80%;
  margin-inline: auto;
  display: block;
`

const StyledText = styled.p`
  color: #586069;
  margin-block: 0;
`

const StyledDesc = styled.p`
  margin-block: 0;
  font-size: 1.2rem;
`

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.data)
  console.log('🚀 ~ file: Profile.jsx:47 ~ Profile ~ user:', user)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [dispatch])

  return (
    <div>
      <Title title="Profile" />
      <StyledContainer>
        <StyledItem>
          <StyledText>プロフィール</StyledText>
          <div>
            <StyledAvator src={user.avatar_url} />
          </div>
        </StyledItem>
        <StyledItem>
          <StyledText>ユーザ名</StyledText>
          <StyledDesc>{user.name}</StyledDesc>
          <StyledText>メールアドレス</StyledText>
          <StyledDesc>{user.url}</StyledDesc>
          <StyledText>フォロー数</StyledText>
          <StyledDesc>{user.following}</StyledDesc>
          <StyledText>フォロワー数</StyledText>
          <StyledDesc>{user.followers}</StyledDesc>
          <StyledText>パブリックレポジトリ数</StyledText>
          <StyledDesc>{user.public_repos}</StyledDesc>
          <StyledText>プライベートレポジトリ数</StyledText>
          <StyledDesc>{user.total_private_repos}</StyledDesc>
        </StyledItem>
      </StyledContainer>
    </div>
  )
}
export default Profile
