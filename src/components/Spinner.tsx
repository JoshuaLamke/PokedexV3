const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg className="animate-spin h-9 w-9 text-green-700" viewBox="0 0 24 24">
        <circle
          className="text-gray-200"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="white"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;