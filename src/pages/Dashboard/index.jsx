import PropTypes from 'prop-types'

import Header from "@components/Header"
import SideBar from "@components/Sidebar"

const Dashboard = ({ children }) => (
  <div className="antialiased bg-gray-50 dark:bg-gray-900">
    <Header />
    <SideBar />
    <main className="min-h-screen p-4 pt-20 md:ml-64">
      {children}
    </main>
  </div>
)

Dashboard.propTypes = {
  children: PropTypes.node.isRequired
}

export default Dashboard