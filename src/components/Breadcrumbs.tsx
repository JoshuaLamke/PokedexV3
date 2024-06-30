import { Link } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";

export interface Breadcrumb {
  name: string;
  path: string;
}

interface Props {
  crumbs: Breadcrumb[];
}

const Breadcrumbs = ({ crumbs }: Props) => {
  return (
    <nav className="flex flex-wrap" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link to="/" className="text-gray-700 hover:text-gray-900">
            <IoHomeSharp className="fill-green-700" size={26} />
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li className="inline-flex items-center" key={`${crumb.name}-${i}`}>
            <span className="ml-2 mr-4 text-gray-400 text-2xl">/</span>
            <Link
              to={crumb.path}
              className="text-gray-700 text-2xl hover:text-green-700"
              state={{
                crumbs: crumbs.slice(0, i + 1),
              }}
            >
              {crumb.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
