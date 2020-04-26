const getUsers = (data) => {
    return {
        type: "VIEW_LOGGEDIN_USER",
        data
    }
}
export function getValidUser() {
    let fetchData = {
        method: 'GET',
        headers: new Headers()
    }
    return (dispatch) => {
        fetch("./Users.json", fetchData)
        .then(response => response.json())
        .then(result => dispatch(getUsers(result.users)))
        .catch(error => error);
    }
}

export const login = (username) => {
    return { type: "LOGIN", uname: username }
}