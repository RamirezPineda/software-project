import { useAllUser } from "../../../hooks/userUsers.hook";

function Users() {
  const { users } = useAllUser();
  // console.log(users);
  return (
    <div className="bg-[#1E1F25] p-10 rounded-lg">
      {users.map((user) => (
        <div key={user.id} className="mt-2 bg-zinc-900 p-4 rounded-md">
          <div className="flex justify-center gap-4">
            <p>Id: {user.id}</p>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Users;
