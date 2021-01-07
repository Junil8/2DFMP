var socket = io('localhost:8080', {
    query: {
        authorization: window.localStorage.getItem('token'),
    },
});