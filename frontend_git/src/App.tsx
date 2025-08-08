// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./ui/DashboardLayout";
import { Content } from "./ui/Content";
import LandingPage from "./ui/landing page/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route element={<DashboardLayout />}>
          <Route path="/links/:page" element={<Content />} />
          <Route path="/content" element={<Content />} /> {/* Catch-all fallback */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
