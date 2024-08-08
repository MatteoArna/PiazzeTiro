import React, { useEffect, useState } from "react";

import useUser from "../../useUser";

const useUserApproval = (email) => {
    const {users, loading, error} = useUser();

    const [selectedUser, setSelectedUser] = useState(null);
    const [elements, setElements] = useState([]);

    const onUserSelected = (user) => {
        setSelectedUser(user);
    }

    const translateStatus = (status) => {
        switch (status) {
            case 0:
                return 'never approved';
            case 1:
                return 'waiting for first approval';
            case 2:
                return 'approvement expired';
            case 3:
                return 'waiting for approval';
            case 4:
                return 'approved';
            default:
                return 'Sconosciuto';
        }
    }

    useEffect(() => {
        //Remove the user that is currently logged in
        const filteredUsers = users.filter((user) => user.email !== email);
        const list = filteredUsers.map((user) => {
            return {
                id: user.email,
                title: user.society,
                subtitle: user.firstName + " " + user.lastName,
                description: user.UserRole.role,
                more: translateStatus(user.status)
            };
        });

        setElements(list);
    }, [users]);

    return {
        users,
        loading,
        error,
        onUserSelected,
        selectedUser,
        elements
    };
};

export default useUserApproval;