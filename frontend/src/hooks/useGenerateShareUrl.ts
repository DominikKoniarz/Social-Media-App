import { APP_URL } from "constraints";

const hostname = import.meta.env.PROD ? APP_URL : "http://localhost:5173";

export default function useGenerateShareUrl() {
  const generateShareUrl = (userId: string) => {
    return `${hostname}/profile/${userId}`;
  };
  return generateShareUrl;
}
