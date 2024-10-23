import './App.css'
import TopHeader from './components/topHeader'
import Dashboard from './components/dashboard'
import Footer from './components/footer'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div >
      <TopHeader />
      <Dashboard />
      <Toaster />
      <Footer />
    </div>
  )
}

export default App
