
import { useState } from "react";

export const useRequirementsLayout = () => {
  const [isRequirementsMaximized, setIsRequirementsMaximized] = useState(false);
  const [isSourceMaximized, setIsSourceMaximized] = useState(false);

  const toggleRequirementsMaximize = () => {
    setIsRequirementsMaximized(!isRequirementsMaximized);
    setIsSourceMaximized(false);
  };

  const toggleSourceMaximize = () => {
    setIsSourceMaximized(!isSourceMaximized);
    setIsRequirementsMaximized(false);
  };

  return {
    isRequirementsMaximized,
    isSourceMaximized,
    toggleRequirementsMaximize,
    toggleSourceMaximize,
  };
};
