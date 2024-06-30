import { useLocation, useNavigate } from "react-router-dom"
import { Breadcrumb } from "../components/Breadcrumbs";

const useNavigateSmooth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const crumbs: Breadcrumb[] = location.state?.crumbs ?? [];
  return (url: string, crumb: Breadcrumb) => () => {
    window.scrollTo({ behavior: "smooth", left: 0, top: 0 });
    navigate(url, {state: {
      crumbs: [
        ...crumbs,
        crumb
      ].slice(-2)
    }});
  }
}

export default useNavigateSmooth;