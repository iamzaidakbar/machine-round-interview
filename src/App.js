import { Outlet } from 'react-router';
import './App.scss';
import Sidebar from './Common/Sidebar';

function App() {

  return (
    <div className="App">
      <Sidebar />
      <div className='outlet'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
