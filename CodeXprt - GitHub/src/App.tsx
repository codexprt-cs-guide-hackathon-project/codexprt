import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import DailyPractice from './pages/DailyPractice';
import Progress from './pages/Progress';
import Graph from './pages/Graph';
import Settings from './pages/Settings';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Welcome from './pages/Welcome';
import AI from './pages/AI';
import SkillAnalysis from './pages/SkillAnalysis';
import CodeChecker from './pages/CodeChecker';
import CustomPath from './pages/CustomPath';
import Bookings from './pages/Bookings';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Collab from './pages/Collab';
import SimpleConvertor from './pages/SimpleConvertor';
import CodeDebugger from './pages/CodeDebugger';
import PlagiarismDetection from './pages/PlagiarismDetection';
import CoverLetter from './pages/CoverLetter';
import MakeYourOwnX from './pages/MakeYourOwnX';
import GetPremium from './pages/GetPremium';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  const isLoggedIn = true;

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route
            path="/welcome"
            element={<Welcome />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
          />
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                localStorage.getItem('selectedCareerPath') ? (
                  <Layout />
                ) : (
                  <Navigate to="/welcome" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="practice" element={<DailyPractice />} />
            <Route path="progress" element={<Progress />} />
            <Route path="graph" element={<Graph />} />
            <Route path="settings" element={<Settings />} />
            <Route path="ai" element={<AI />} />
            <Route path="skill-analysis" element={<SkillAnalysis />} />
            <Route path="code-checker" element={<CodeChecker />} />
            <Route path="custom-path" element={<CustomPath />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="collab" element={<Collab />} />
            <Route path="code-converter" element={<SimpleConvertor />} />
            <Route path="code-debugger" element={<CodeDebugger />} />
            <Route path="plagiarism-detection" element={<PlagiarismDetection />} />
            <Route path="cover-letter" element={<CoverLetter />} />
            <Route path="make-your-own-x" element={<MakeYourOwnX />} />
            <Route path="get-premium" element={<GetPremium />} />
            <Route path="resume-builder" element={<ResumeBuilder />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
