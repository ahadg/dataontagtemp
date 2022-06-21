import axios from 'axios';

const setAuthToken  = token => {
    //console.log('checking token',token)
    if(token)
    {
        
        axios.defaults.headers.common['thenfcjwttoken445'] = token;
    }
    else {
        delete axios.defaults.headers.common['thenfcjwttoken445'];
    }
};
export default setAuthToken; 