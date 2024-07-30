import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {string} label - The label of the sidebar item.
 * @param {string} path - The path to navigate to when the item is clicked.
 * @param {React.ReactNode} icon - The icon to display alongside the label.
 * @returns {JSX.Element} The rendered sidebar item component.
 */
const SidebarItem = ({ label, path, icon }) => (
    <li>
        <Link
            to={path}
            className="flex items-center p-2 text-base font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
            {icon}
            <span className="ml-3">{label}</span>
        </Link>
    </li>
)

SidebarItem.propTypes = {
    label: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.node
}

export default SidebarItem