import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import { msalConfig } from "./Authentication/authConfig";
import WaitingForApprovalPage from "./components/ApprovalPage/ApprovalPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminReport from "./components/adminreport/AdminReport";
import EditPageHandler from "./components/editPage/EditPageHandler";
import {
  default as MenteeReport,
  default as PairReport,
} from "./components/pairreport/PairReport";
import PairReportDownloadPage from "./pages/admin/PairReportDownloadPage/PairReportDownloadPage";
import AdminReportDownloadPage from "./pages/admin/ReportDownloadPage/AdminReportDownloadPage";
import CreatePairCardHandler from "./pages/admin/createPair/CreatePairCardHandler";
import AdminDashboardHandler from "./pages/admin/dashboard/AdminDashboardHandle";
import Pairs from "./pages/admin/pairs/Pairs";
import AdminReportPage from "./pages/admin/report/AdminReportPage";
import ViewUsers from "./pages/admin/user/ViewUsers";
import EventPageHandler from "./pages/common/event/EventPageHandler";
import { UserRoleProvider } from "./pages/common/loginpage/Context/UserRoleContext";
import LoginPage from "./pages/common/loginpage/LoginPage";
import MenteeCalendarPage from "./pages/mentee/calendar/CalendarPage";
import MenteeChat from "./pages/mentee/chat/Chat";
import MenteeDashboard from "./pages/mentee/dashboard/MenteeDashboard";
import MenteeTask from "./pages/mentee/menteeTask/MenteeTask";
import SubmitTaskHandler from "./pages/mentee/submitTask/SubmitTaskHandler";
import MentorCalendarPage from "./pages/mentor/calendar/CalendarPage";
import Chat from "./pages/mentor/chat/Chat";
import CreateMeetingHandler from "./pages/mentor/createMeeting/CreateMeetingHandler";
import CreatetaskHandler from "./pages/mentor/createtask/CreateTasksHandler";
import MentorDashboradHandler from "./pages/mentor/dashboard/MentorDashboardHandler";
import MenteeProfileHandler from "./pages/mentor/menteeProfile/MenteeProfileHandler";
import MenteesList from "./pages/mentor/menteesList/MenteesList";
import MentorTask from "./pages/mentor/mentorTask/MentorTask";
import MentorSelectedTask from "./pages/mentor/mentorselectedtask/MentorSelectedTask";
import MentorReportPage from "./pages/mentor/report/MentorReportPage";

const msalInstance = new PublicClientApplication(msalConfig);
const AppRoutes = () => {
  return (
    <MsalProvider instance={msalInstance}>
      <UserRoleProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/waiting" element={<WaitingForApprovalPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <App role="admin" />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<AdminDashboardHandler />} />
            <Route path="pairs" element={<Pairs />} />
            <Route path="users" element={<ViewUsers />} />
            <Route path="pairs/edit/:programId" element={<EditPageHandler />} />
            <Route path="report" element={<AdminReportPage />} />
            <Route path="report/overall" element={<AdminReport />} />
            <Route path="report/pair" element={<PairReport />} />
            <Route
              path="report/adminreportdownload"
              element={<AdminReportDownloadPage />}
            />
            <Route
              path="report/menteereportdownload/:programId"
              element={<PairReportDownloadPage />}
            />

            <Route path="pairs/create" element={<CreatePairCardHandler />} />
          </Route>
          <Route
            path="/mentee"
            element={
              <ProtectedRoute allowedRoles={["mentee"]}>
                <App role="mentee" />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<MenteeDashboard />} />
            <Route path="calendar" element={<MenteeCalendarPage />} />
            <Route
              path="calendar/event/:meetingId"
              element={<EventPageHandler />}
            />
            <Route path="report" element={<MenteeReport />} />
            <Route path="tasks" element={<MenteeTask />} />

            <Route
              path="tasks/submit/:taskId"
              element={<SubmitTaskHandler />}
            />

            <Route path="chat" element={<MenteeChat />} />
          </Route>
          <Route
            path="/mentor"
            element={
              <ProtectedRoute allowedRoles={["mentor"]}>
                <App role="mentor" />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<MentorDashboradHandler />} />
            <Route path="calendar" element={<MentorCalendarPage />} />
            <Route path="mentees" element={<MenteesList />} />
            <Route path="tasks" element={<MentorTask />} />
            <Route path="tasks/selected" element={<MentorSelectedTask />} />
            <Route path="tasks/create" element={<CreatetaskHandler />} />
            <Route path="tasks/create" element={<CreatetaskHandler />} />
            <Route path="calendar/create" element={<CreateMeetingHandler />} />
            <Route
              path="mentees/profile/:menteeId"
              element={<MenteeProfileHandler />}
            />
            <Route
              path="calendar/event/:meetingId"
              element={<EventPageHandler />}
            />
            <Route path="chat" element={<Chat />} />
            <Route path="report" element={<MentorReportPage />} />
          </Route>
        </Routes>
      </UserRoleProvider>
    </MsalProvider>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;
