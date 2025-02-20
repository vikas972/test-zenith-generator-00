
import { FlowType } from "../../types";

export const getFlowTypeIcon = (type: FlowType) => {
  switch (type) {
    case "primary":
      return "→";
    case "alternate":
      return "⤷";
    case "negative":
      return "⚠";
    case "exception":
      return "⚡";
    default:
      return "•";
  }
};
