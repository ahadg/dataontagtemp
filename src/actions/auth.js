import axios from 'axios';
import setheadertoken from './setHeaderToken'
export const loaduser = (history) => async (dispatch) => {
    let res;
    console.log("inside 1")
    if (localStorage.dataontag12344H) {
      console.log("inside 2")
      try {
        res = await axios.get(
          `${process.env.REACT_APP_END_URL}api/getuser`,{headers: {
            "thenfcjwttoken445" : JSON.parse(localStorage.dataontag12344H).token
          }
        }
        );
        console.log('the res',res)
        console.log('tokenn',JSON.parse(localStorage.dataontag12344H).token)
        setheadertoken(JSON.parse(localStorage.dataontag12344H).token);     
        dispatch({
        type: "GET_USER",
        payload: {...res.data.userlogin,token : JSON.parse(localStorage.dataontag12344H).token},
        });

      } catch (error) {
        //localStorage.removeItem('dataontag12344H')
        dispatch({
          type: "AUTHENTICATION_FAIL",
        });
      }
      
    }
    else  {
      dispatch({
        type: "AUTHENTICATION_FAIL",
      });
    }
  };