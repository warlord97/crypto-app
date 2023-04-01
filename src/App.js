import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import CoinDetails from "./Pages/CoinDetails";
import Coins from "./Pages/Coins";
import Exchanges from "./Pages/Exchanges";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";



import "./Styles/App.css";
import "./Styles/Header.css";
import "./Styles/Exchanges.css";
import "./Styles/Coins.css";
import "./Styles/Loader.css";
import "./Styles/CoinDetails.css";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exchanges" element={<Exchanges />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
