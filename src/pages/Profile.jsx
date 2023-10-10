import styled from 'styled-components'
import Title from '../components/atoms/Title'

const avotorURL = 'https://avatars1.githubusercontent.com/u/25723193?s=60&u=5f2d871352830fdf1a79ee285e0712044105ca91&v=4'

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
  max-width: 100%;
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
  return (
    <div>
      <Title title="Profile" />
      <StyledContainer>
        <StyledItem>
          <StyledText>プロフィール</StyledText>
          <div>
            <StyledAvator src={avotorURL} />
          </div>
        </StyledItem>
        <StyledItem>
          <StyledText>ユーザ名</StyledText>
          <StyledDesc>jjoo</StyledDesc>
          <StyledText>メールアドレス</StyledText>
          <StyledDesc>hoge@example.com</StyledDesc>
        </StyledItem>
      </StyledContainer>
    </div>
  )
}
export default Profile
