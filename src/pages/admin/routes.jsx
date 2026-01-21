import AdminLayout from './AdminLayout'
import RequireAdminAuth from './RequireAdminAuth'
import Dashboard from './Dashboard'
import Copiers from './Copiers'
import Masters from './Masters'
import Reports from './Reports'
import Management from './Management'
import Settings from './Settings'
import Groups from './Groups'
import Branding from './Branding'
import CopierDetails from './CopierDetails'
import MasterDetails from './MasterDetails'
import MasterReport from './MasterReport'
import CopierReport from './CopierReport'
import Login from './Login'

const adminRoutes = [
  {
    path: "/admin/login",
    element: <Login />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <RequireAdminAuth><Dashboard /></RequireAdminAuth>
      },
      {
        path: "copiers",
        element: <RequireAdminAuth><Copiers /></RequireAdminAuth>
      },
      {
        path: "copiers/:id",
        element: <RequireAdminAuth><CopierDetails /></RequireAdminAuth>
      },
      {
        path: "copiers/:id/report",
        element: <RequireAdminAuth><CopierReport /></RequireAdminAuth>
      },
      {
        path: "masters",
        element: <RequireAdminAuth><Masters /></RequireAdminAuth>
      },
      {
        path: "masters/:id",
        element: <RequireAdminAuth><MasterDetails /></RequireAdminAuth>
      },
      {
        path: "masters/:id/report",
        element: <RequireAdminAuth><MasterReport /></RequireAdminAuth>
      },
      {
        path: "reports",
        element: <RequireAdminAuth><Reports /></RequireAdminAuth>
      },
      {
        path: "management",
        element: <RequireAdminAuth><Management /></RequireAdminAuth>
      },
      {
        path: "settings",
        element: <RequireAdminAuth><Settings /></RequireAdminAuth>
      },
      {
        path: "groups",
        element: <RequireAdminAuth><Groups /></RequireAdminAuth>
      },
      {
        path: "branding",
        element: <RequireAdminAuth><Branding /></RequireAdminAuth>
      }
    ]
  }
]

export default adminRoutes
