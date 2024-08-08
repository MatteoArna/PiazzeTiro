import React, { useEffect, useState } from "react";

import useUser from "../../useUser";

import { getStatus } from "../../../utils/userUtil";

const useUserApproval = (email) => {
    const {users, loading, error, changeRole} = useUser();

    const [selectedUser, setSelectedUser] = useState(null);
    const [elements, setElements] = useState([]);

    useEffect(() => {
        //Remove the user that is currently logged in
        const filteredUsers = users.filter((user) => user.email !== email);
        const list = filteredUsers.map((user) => {
            return {
                id: user.email,
                title: user.society,
                subtitle: user.firstName + " " + user.lastName,
                description: user.UserRole.role,
                more: getStatus(user.status)
            };
        });

        setElements(list);
    }, [users]);

    const handleOnUserClicked = (id) => {
        const user = users.find((user) => user.email === id);
        setSelectedUser(user);
    }

    const handleChangeRole = async (roleId) => {
        changeRole(selectedUser.email, roleId);
    }
    return {
        elements,
        loading,
        error,
        onUserClicked: handleOnUserClicked,
        selectedUser,
        changeRole: handleChangeRole
    };
};

export default useUserApproval;
