const initState = {
  showRightbar: false,
  showSidebar: false,
  user: null,
  isAuthenticated: false,
  apploaded: false,
  socket : {},
  rfid : '',
  notifications : [],
  socket_notification : ''
};

const generalReducers = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_USER":
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        apploaded: true,
      };
    case "UPDATE_NOTIFICATIONS":
      return {
        ...state,
        notifications: payload,
      };
    case "UPDATE_NOTIFICATIONS_SOCKET_UPDATE":
      return {
        ...state,
        socket_notification: payload,
      };
    case "AUTHENTICATION_FAIL": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        apploaded: true,
      };
    }
    case "UPDATE_WS": {
      return {
        ...state,
        socket : payload,
      };
    }
    case "RFID_INSPECTION": {
      return {
        ...state,
        rfid : payload,
      };
    }
    case "MESSAGE_UPDATE": {
      return {
        ...state,
        socket_message : payload,
      };
    }
    case "SHOW_RIGHT_BAR":
      return { ...state, showRightbar: payload };
    case "SHOW_SIDE_BAR":
      return { ...state, showSidebar: payload };
    default:
      return state;
  }
};

export default generalReducers;
