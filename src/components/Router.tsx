import { MemberProvider } from '@/context/MemberContext';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/components/pages/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import CustomerDashboard from '@/components/pages/CustomerDashboard';
import ServiceRequestDetails from '@/components/pages/ServiceRequestDetails';
import TechnicianDashboard from '@/components/pages/TechnicianDashboard';
import TechnicianProfile from '@/components/pages/TechnicianProfile';
import TechniciansDirectory from '@/components/pages/TechniciansDirectory';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "customer-dashboard",
        element: <CustomerDashboard />,
      },
      {
        path: "service-request/:id",
        element: <ServiceRequestDetails />,
      },
      {
        path: "technician-dashboard",
        element: <TechnicianDashboard />,
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
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
