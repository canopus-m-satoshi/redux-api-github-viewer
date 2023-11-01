import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import Tab from '../atoms/Tab'
import TabPanel from '../atoms/TabPanel'
import Title from '../atoms/Title'
import IssueBody from '../molecules/IssueBody'
import IssueHeader from '../molecules/IssueHeader'
import TabList from '../molecules/TabList'
import TabPanels from '../molecules/TabPanels'

const Tabs = () => {
  const [selectedTab, setSelectedTab] = useState(Tab.length)
  const [searchField, setSearchField] = useState('')
  const [isChecked, setIsChecked] = useState([])
  const [isActive, setIsActive] = useState(false)
  const data = useSelector((state) => state.issue.data)

  const handleTabSelect = (index) => {
    setSelectedTab(index)
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

  const onSearchFeilds = (e) => {
    setSearchField(e.target.value)
  }

  const searchFields = useMemo(() => data.filter((el) => el.title.toLowerCase().includes(searchField.toLowerCase())), [searchField, data])

  return (
    <>
      <TabList selectedTab>
        <Tab onClick={() => handleTabSelect(1)} isActive={isActive} selectedTab={selectedTab === 1}>
          Issue
        </Tab>
        <Tab onClick={() => handleTabSelect(2)} isActive={isActive} selectedTab={selectedTab === 2}>
          Pull Request
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel selectedTab={selectedTab === 1}>
          <IssueHeader onSearchFeilds={onSearchFeilds} isChecked={isChecked} />
          <IssueBody searchFields={searchFields} handleCheck={handleCheck} setIsChecked={setIsChecked} isChecked={isChecked} />
        </TabPanel>
        <TabPanel selectedTab={selectedTab === 2}>
          <Title title="PullRequest" centering />
        </TabPanel>
      </TabPanels>
    </>
  )
}
export default Tabs
