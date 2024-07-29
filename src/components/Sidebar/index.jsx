import { CiHeart, CiChat1, CiCircleInfo  } from "react-icons/ci";

import SidebarItem from '@components/Sidebar/SidebarItem'

const routes = [
  {
    label: 'Liked songs',
    path: '/liked-songs',
    icon: <CiHeart />,
  },
  {
    label: 'Make your own song',
    path: '/song/new',
    icon: <CiChat1 />
  }
]

const SideBar = () => {
  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 pt-14 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="h-full px-3 py-5 overflow-y-auto bg-white dark:bg-gray-800">
        <form action="#" method="GET" className="mb-2 md:hidden">
          <label htmlFor="sidebar-search" className="sr-only">Search by artist, songs or albums</label>
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search by artist, songs or albums"
            />
          </div>
        </form>
        <ul className="mt-6 space-y-2">
          {
            routes.map(({ label, path, icon }) => <SidebarItem key={path} label={label} path={path} icon={icon} />)
          }
        </ul>
        <ul
          className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
          <SidebarItem label="About" path="/about" icon={<CiCircleInfo />} />
        </ul>
      </div>
    </aside>
  )
}

export default SideBar