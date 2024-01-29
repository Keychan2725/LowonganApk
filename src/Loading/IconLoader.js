import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const IconLoader = () => (
<div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" style={{ transform: 'translate(-50%, -50%)' }}>
    <div className="relative flex justify-center items-center">
      <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      <img src="./icon/suitcase.png" className="rounded-full h-28 w-28" />
    </div>
  </div>
);

export default IconLoader;
