const getToken =() => {
    const token = sessionStorage.getItem
    ('loggedInUser');
    return User.token;
}

export default getToken;