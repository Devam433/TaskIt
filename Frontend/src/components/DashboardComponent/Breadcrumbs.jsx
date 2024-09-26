import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label="breadcrumb" className="hidden md:block md:text-2xl md:font-bold md:pb-2 ">
      <ol className="flex space-x-2">
        {/* Home link */}

        {/* Separator and dynamic links */}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <li key={to} className="text-gray-500">
              <span className="mx-2">/</span>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </li>
          ) : (
            <li key={to}>
              <span className="mx-2">/</span>
              <Link to={to} className="text-blue-500 hover:underline">
                {value.charAt(0).toUpperCase()+ value.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
