import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useRef } from "react";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import PageTransition from "./components/PageTransition";
import type { PageTransitionRef } from "./components/PageTransition";
import Works from "./pages/Works";

function App() {
  const transitionRef = useRef<PageTransitionRef>(null);

  const handlePageTransition = async () => {
    if (transitionRef.current) {
      await transitionRef.current.startTransition();
    }
  };

  return (
    <Router>
      <div className="App min-h-screen">
        <Navbar onNavigate={handlePageTransition} />
        <Routes>
          <Route
            path="/"
            element={<Landing onNavigate={handlePageTransition} />}
          />
          <Route
            path="/works"
            element={<Works onNavigate={handlePageTransition} />}
          />
        </Routes>
        <PageTransition ref={transitionRef} />
      </div>
    </Router>
  );
}

export default App;
