import { MemberProvider, useMember } from '@/context/MemberContext';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/components/pages/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CustomerDashboard from '@/components/pages/CustomerDashboard';
import ServiceRequestDetails from '@/components/pages/ServiceRequestDetails';
import TechnicianDashboard from '@/components/pages/TechnicianDashboard';
import TechnicianProfile from '@/components/pages/TechnicianProfile';
import TechniciansDirectory from '@/components/pages/TechniciansDirectory';
import LoginPage from '@/components/pages/LoginPage';
import { MapProvider } from '@/context/MapContext';
import { CustomerMap } from '@/components/Map/CustomerMap';
import { TechnicianMap } from '@/components/Map/TechnicianMap';

// ... existing code ...

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // ... existing routes ...
      {
        path: "map/customer",
        element: (
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerMap />
          </ProtectedRoute>
        )
      },
      {
        path: "map/technician",
        element: (
          <ProtectedRoute allowedRoles={['technician']}>
            <TechnicianMap />
          </ProtectedRoute>
        )
      },
      // ... existing routes ...
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "customer-dashboard",
        element: (
          <ProtectedRoute allowedRoles={['customer']}>
            <CustomerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "service-request/:id",
        element: (
          <ProtectedRoute allowedRoles={['customer', 'technician']}>
            <ServiceRequestDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "technician-dashboard",
        element: (
          <ProtectedRoute allowedRoles={['technician']}>
            <TechnicianDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "technician/:id",
        element: <TechnicianProfile />,
      },
      {
        path: "technicians",
        element: <TechniciansDirectory />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <MapProvider>
        <RouterProvider router={router} />
      </MapProvider>
    </MemberProvider>
  );
}
