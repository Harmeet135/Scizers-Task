import './App.css';
import Feed from './components/feed/feed';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nopage from './components/nopage';

function App() {

  return (
   <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="*" element={<Nopage />} />
          </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
