import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { Homepage, Login, PageNotFound, Pricing, Product } from "./pages";
const Homepage = lazy(() => import("./pages/Homepage"));
const Login = lazy(() => import("./pages/Login"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

import {
  City,
  CityList,
  CountryList,
  Form,
  SpinnerFullPage,
} from "./components";
import { CityProvider } from "./contexts/CityContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/product" element={<Product />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoutes>
                    <AppLayout />
                  </ProtectedRoutes>
                }
              >
                {/* Redirect to cities default */}
                <Route index element={<Navigate to={"cities"} />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="countries/:id" element={<City />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}
