import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import CartPage from "./pages/CartPage"
import DiagramPage from "./pages/DiagramPage"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/:year/:model/:part" element={<DiagramPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

