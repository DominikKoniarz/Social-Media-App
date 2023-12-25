import SocketContext from "context/SocketContext";
import { useContext } from "react";

const useSocketContext = () => useContext(SocketContext);

export default useSocketContext;
