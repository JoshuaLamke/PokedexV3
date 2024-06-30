import useNavigateSmooth from "../hooks/useNavigateSmooth";

const EvoReqLink = ({ path, name }: { path: string; name: string }) => {
  const handleNavigate = useNavigateSmooth();
  return (
    <span
      className="text-green-700 hover:text-green-500 hover:scale-105"
      role="button"
      onClick={handleNavigate(path, {
        name,
        path,
      })}
    >
      {name}
    </span>
  );
};

export default EvoReqLink;
