let accessToken = null;
let onRefreshFail = () => {};

export const tokenStore = {
    getAccessToken: () => accessToken,
    setAccessToken: (token) => { accessToken = token; },
    clear: () => { accessToken = null; },
    setOnRefreshFail: (callback) => { onRefreshFail = callback; },
    triggerRefreshFail: () => onRefreshFail(),
};