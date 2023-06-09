import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';

function App() {
  return (
      <Router>
        <div className="App">
          <AnimatedRoutes />
        </div>
      </Router>
  )
}

export default App
