import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {string} label - The label of the sidebar item.
 * @param {string} path - The path to navigate to when the item is clicked.
 * @param {React.ReactNode} icon - The icon to display alongside the label.
 * @returns {JSX.Element} The rendered sidebar item component.
 */
const SidebarItem = ({ label, path, icon }) => {
  const baseClasses =
    'flex items-center p-2 text-base font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group';

  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? `${baseClasses} border border-[#11181C]` : baseClasses)}
      >
        {icon}
        <span className="ml-3">{label}</span>
      </NavLink>
    </li>
  );
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default SidebarItem;
