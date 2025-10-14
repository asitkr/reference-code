import './App.css'
import Card from './components/Card'
import ChatGpt from './components/ChatGpt'
import ExpandableSearch from './components/ExpandableSearch'
import FormikFileForm from './components/FormikForm'
import InteractiveCard from './components/InteractiveCard'
import ECard from './components/LogoCard'
import NewCard from './components/NewCard'
import ResultCard from './components/ResultsSummaryCard'
import ShowFetchData from './components/ShowFetchData'
import TableComponent from './components/TableComponent'

function App() {

  return (
    <div className='w-full min-h-screen h-full'>
      {/* <ChatGpt />
      <div className='w-80 flex justify-end'>
        <ExpandableSearch />
      </div>

      <TableComponent data={users} />
      <Card />
      <ECard />
      <NewCard />
      <ResultCard />
      <InteractiveCard />

      <ShowFetchData /> */}
      <FormikFileForm />
    </div>
  )
}

export default App
