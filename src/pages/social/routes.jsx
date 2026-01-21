import SocialLayout from './SocialLayout'
import Leaderboard from './Leaderboard'
import CopierDashboard from './CopierDashboard'
import TradingReport from './TradingReport'
import Deposit from './Deposit'
import Withdrawal from './Withdrawal'
import TransactionHistory from './TransactionHistory'
import TraderDetails from './TraderDetails'
import CreateSubscription from './CreateSubscription'
import MyAccount from './MyAccount'
import RequireAuth from '../../components/auth/RequireAuth'

const socialRoutes = [
  {
    path: "/",
    element: <RequireAuth><SocialLayout /></RequireAuth>,
    children: [
      {
        index: true,
        element: <Leaderboard />
      }
    ]
  },
  {
    path: "/social",
    element: <RequireAuth><SocialLayout /></RequireAuth>,
    children: [
      {
        index: true,
        element: <Leaderboard />
      },
      {
        path: "copier",
        element: <CopierDashboard />
      },
      {
        path: "my-account",
        element: <MyAccount />
      },
      {
        path: "report",
        element: <TradingReport />
      },
      {
        path: "deposit",
        element: <Deposit />
      },
      {
        path: "withdrawal",
        element: <Withdrawal />
      },
      {
        path: "transactions",
        element: <TransactionHistory />
      },
      {
        path: "trader/:id",
        element: <TraderDetails />
      },
      {
        path: "subscribe/:id",
        element: <CreateSubscription />
      }
    ]
  }
]

export default socialRoutes

