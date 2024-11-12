import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '@/pages/Main';
import Login from '@/pages/auth/Login';
import SignUp from '@/pages/auth/SignUp';
import FindPw from '@/pages/auth/FindPw';
import Newpw from '@/pages/auth/Newpw';
import EmailAuth from '@/pages/auth/EmailAuth';
import EmailAuthNext from '@/pages/auth/EmailAuthNext';
import MoreInfo from '@/pages/MoreInfo';
import Admin from '@/pages/Admin';
import ActivityLog from '@/pages/quickAccess/ActivityLog';
import HealthReport from '@/pages/quickAccess/HealthReport';
import SafetySettings from '@/pages/quickAccess/SafetySettings';
import Settings from '@/pages/quickAccess/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/find-password" element={<FindPw />} />
        <Route path="/new-password" element={<Newpw />} />
        <Route path="/email-auth" element={<EmailAuth />} />
        <Route path="/email-update" element={<EmailAuthNext />} />
        <Route path="/information" element={<MoreInfo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/health-report" element={<HealthReport />} />
        <Route path="/safety-settings" element={<SafetySettings />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
