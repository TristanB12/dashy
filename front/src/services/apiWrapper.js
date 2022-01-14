const axios = require('axios');
const baseUrl = "/api";

const verifyToken = async (token) => {
    let config = {
        method: 'get',
        url: baseUrl + '/auth/verify',
        params: {
            token: token
        },
        headers: {}
    }
    try {
        let res = await axios(config);
        return true;
    } catch (err) {
        return false;
    }
}

const loginUser = async (inputs) => {
    let config = {
        method: 'post',
        url: baseUrl + '/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            ...inputs
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const signupUser = async (inputs) => {
    let config = {
        method: 'post',
        url: baseUrl + '/auth/signup',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: inputs.email,
            password: inputs.password,
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getUserInfos = async (token) => {
    let config = {
        method: 'get',
        url: baseUrl + '/user',
        headers: { 
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getUserWidgets = async (token) => {
    let config = {
        method: 'get',
        url: baseUrl + '/user/widgets',
        headers: { 
            'Authorization': 'Bearer ' + token
        }
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getWidgetContent = async (token, widgetConfig, code) => {
    let data = JSON.stringify({
        config: widgetConfig
    });
    var config = {
        method: 'post',
        url: baseUrl + '/services/widget/' + code,
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: data
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const updateWidgetConfig = async (token, widgetConfig, id) => {
    let data = {
        id,
        config: {
            ...widgetConfig
        },
    };
    let config = {
        method: 'patch',
        url: baseUrl + '/widgets',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data: data
    }
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const deleteWidget = async (token, id) => {
    let data = {
        id
    }
    let config = {
        method: 'delete',
        url: baseUrl + '/widgets',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const addWidget = async (token, widget) => {
    let data = {
        widget: widget
    }
    let config = {
        method: 'post',
        url: baseUrl + '/widgets',
        headers: { 
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        data : data
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

const getALlWidgetsConf = async () => {
    let config = {
        method: 'get',
        url: baseUrl + '/widgets',
    };
    try {
        let res = await axios(config);
        return [res.data, null];
    } catch (err) {
        return [null, err.response.data];
    }
}

module.exports = {
    verifyToken,
    loginUser,
    getUserInfos,
    getUserWidgets,
    signupUser,
    getWidgetContent,
    updateWidgetConfig,
    deleteWidget,
    getALlWidgetsConf,
    addWidget
}