import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
  usersUrl,
} from "../services/user.service";

const useAllUser = () => {
  const { data, isLoading, error } = useSWR(usersUrl, getAllUsers);
  return { users: data, isLoading, error };
};

const useAddUser = () => {
  const { trigger, isMutating, error } = useSWRMutation(usersUrl, addUser);
  return { addUser: trigger, isMutating, error };
};

const useGetUser = (id) => {
  const { data, isLoading, error } = useSWR(`${usersUrl}/${id}`, getUser);
  return { userFound: data, isLoading, error };
};

const useUpdateUser = (id) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `${usersUrl}/${id}`,
    updateUser
  );

  return { updateUser: trigger, isMutating, error };
};

const useDeleteUser = () => {
  const { trigger, isMutating, error } = useSWRMutation(usersUrl, deleteUser);

  return { deleteUser: trigger, isMutating, error };
};

export { useAllUser, useAddUser, useGetUser, useUpdateUser, useDeleteUser };
