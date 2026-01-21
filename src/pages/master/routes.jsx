import MasterLayout from './MasterLayout'
import MasterDashboard from './MasterDashboard'
import FollowedCopiers from './FollowedCopiers'
import CommissionSettings from './CommissionSettings'
import EarningsReport from './EarningsReport'
import WithdrawalReport from './WithdrawalReport'
import WalletManagement from './WalletManagement'
import MapMT5Accounts from './MapMT5Accounts'
import RequireMaster from '../../components/auth/RequireMaster'

const masterRoutes = [
  {
    path: "/master",
    element: <RequireMaster><MasterLayout /></RequireMaster>,
    children: [
      {
        index: true,
        element: <MasterDashboard />
      },
      {
        path: "dashboard",
        element: <MasterDashboard />
      },
      {
        path: "copiers",
        element: <FollowedCopiers />
      },
      {
        path: "commission",
        element: <CommissionSettings />
      },
      {
        path: "earnings",
        element: <EarningsReport />
      },
      {
        path: "withdrawals",
        element: <WithdrawalReport />
      },
      {
        path: "wallet",
        element: <WalletManagement />
      },
      {
        path: "map-accounts",
        element: <MapMT5Accounts />
      }
    ]
  }
]

export default masterRoutes

