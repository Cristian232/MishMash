const checkResponse = (axiosResponse) => {
    // Your logic to check the Axios response and return true or false
    if (axiosResponse && axiosResponse.someCondition) {
        return true;
    } else {
        return false;
    }
};

module.exports = checkResponse;
