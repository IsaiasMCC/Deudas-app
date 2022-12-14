import React from "react";

const Spinner = () => {
  return (
    <div className="mx-auto text-center mt-56">
      <div
        className="animate-spin inline-block w-20 h-20 border-[6px] border-current border-t-transparent text-blue-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;