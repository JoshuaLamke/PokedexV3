import snomGIF from "../assets/snom.gif";
const LoadingSnom = () => {
  return (
    <div className="w-full h-full flex p-4 justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-green-700">Loading</h1>
      <img src={snomGIF} alt="Snom bouncing" />
    </div>
  );
};

export default LoadingSnom;
