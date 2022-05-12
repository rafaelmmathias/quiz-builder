import { v4 as uuidv4 } from "uuid";

export const generatePermalinkId = () => {
  return uuidv4().replace(/-/g, "").slice(0, 6);
};
