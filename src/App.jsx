import './App.css'
import ExpandableSearch from './components/ExpandableSearch'
import TableComponent from './components/TableComponent'
import { users } from './utils'

function App() {

  return (
    <div className='w-full min-h-screen h-full'>
      <div className='w-80 flex justify-end'>
        <ExpandableSearch />
      </div>

      <TableComponent data={users} />
    </div>
  )
}

export default App
