import GlobalStyles from "./styles/GlobalStyles";
import { DarkModeProvider } from "./context/DarkModeContext";
import { ProtectedRoute, ToasterDisplay } from "./components";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  Login,
  Users,
  Checkin,
  Account,
  Booking,
  Settings,
  Bookings,
  CabinsV2,
  AppLayout,
  Dashboard,
  PageNotFound,
} from "./pages";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 30*1000, // Time re-fetching data
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <ToasterDisplay />
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="cabins" element={<CabinsV2 />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="settings" element={<Settings />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
};

export default App;
