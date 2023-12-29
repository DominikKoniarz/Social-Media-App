import UserListItem from "./UserListItem";

const UserList = () => {
  return (
    <ul className="flex flex-col mt-4">
      <UserListItem />
      <UserListItem />
      <UserListItem />
      <UserListItem />
      <UserListItem />
    </ul>
  );
};
export default UserList;
