import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidenav from "./Sidenav"
import Page1 from "./Page1"
import Page2 from "./Page2"
import Timer from "./Timer"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div style={{ display: 'flex', width: '100vw' }}>
          
          <Sidenav />
          <div style={{ flex: 1, padding: "16px" }}>
            <Routes>
              <Route path="/" element={<Timer />} />
              <Route path="/page1" element={<Page1 />} />
              <Route path="/page2" element={<Page2 />} />
            </Routes>
          </div>
        </div>

      </BrowserRouter>

    </div>
  );
}
