import useSocketContext from "hooks/useSocketContext";

const Header = () => {
  const { userData } = useSocketContext();
  return (
    <span className="flex justify-center text-lg font-medium text-black md:text-xl">
      Add your post here {userData?.firstname ? userData.firstname : ""}
    </span>
  );
};
export default Header;
