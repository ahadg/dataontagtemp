import moment from "moment";
import momenttz from 'moment-timezone'
const initState = {
    userlist : [],
    rfidinspectionrealtime : []
  };
  
  const rfidReducers = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "RFID_INSPECTION_REAL_TIME_UPDATE": {
          let rfid = payload
          let userlist = state.userlist
        if(!rfid || rfid == undefined || rfid == "undefined"){
            return {...state}
          }
          console.log('id_check_passed',rfid)
          const date = momenttz.tz("Europe/Rome").format('MM-DD-YYYY')
          try {
            let user = {}
            console.log('users',userlist)
            // find user id with rfid
             userlist?.map((item) => {
               if(item?.assignedrfidDevices){
                item?.assignedrfidDevices?.map((item2) => {
                  if(item2?.deviceRef?.rfid == rfid){
                    user = item
                  }
                })
              }
             })
             console.log('user_found',user)
            // see if in realtime rfidinspection this user exist, if exist simply update it otherwise add it with all info
            let theindex = -1
            if(!user._id){
              return {...state}
            }
            console.log('id',user._id)
            console.log('rfidinspectionrealtime',state.rfidinspectionrealtime)
            state.rfidinspectionrealtime?.map((item,indx) => {
                if(String(item.userRef._id) == String(user._id)){
                    theindex = indx
                }
            })
            console.log('theindex',theindex)
            if(theindex > -1){
              // console.log(moment().tz("Europe/Rome").format())
                  let devices = state.rfidinspectionrealtime[theindex].detectedDevices
                  let index = -1
                  console.log('devices',devices)
                  devices.map((item,indx) => {
                      if(String(item.deviceRef.rfid) == String(rfid)){
                          index = indx
                      }
                  })
                  devices[index]["detected"] = true
                  devices[index]["date"] = momenttz.tz("Europe/Rome").format()
                  console.log('devices_after',devices)
                  state.rfidinspectionrealtime[theindex].detectedDevices = devices
                //   setrfidinspectionrealtime([...rfidinspectionrealtime])
                //   setrfidremoveid(rfid)
              }
              else {
      
                  //let user = await User.findById(therfid.assignedTo).populate("assignedrfidDevices.deviceRef")
                  console.log('user',user)
                  let devices = user.assignedrfidDevices
                  let devicestobedetected  = []
                  devices?.map((item) => {
                      if(String(item.deviceRef.rfid) == String(rfid)){
                          devicestobedetected.push({
                              deviceRef : item.deviceRef,
                              date : momenttz.tz("Europe/Rome").format(),
                              detected : true
                          })
                      }else {
                          devicestobedetected.push({
                              deviceRef : item.deviceRef,
                              detected : false
                          })
                      }
                  })
                  console.log('devicestobedetected',devicestobedetected)
                  state.rfidinspectionrealtime = [...state.rfidinspectionrealtime,{
                    userCreatedBy : user.createdBy,userRef : user,dateScanned:date,detectedDevices : devicestobedetected
                  }]
                //   setrfidinspectionrealtime([...rfidinspectionrealtime,{
                //     userCreatedBy : user.createdBy,userRef : user,dateScanned:date,detectedDevices : devicestobedetected
                //   }])
                //   setrfidremoveid(rfid)
              }
          } catch (error) {
              console.log(error)
          }
        return {
          ...state,
        };
      }
      case "USER_LIST_UPDATE": {
        return {
            ...state,
            userlist : payload
        };
      }
      case "RFID_INSPECTION_REAL_TIME_REMOVE": {
        let rfid = payload
        let userlist = state.userlist
        console.log('removerealtimecallled',rfid)
        if(!rfid || rfid == undefined || rfid == "undefined"){
            return {...state}
        }
        try {
          let user = {}
          console.log('users',userlist)
          // find user id with rfid
           userlist?.map((item) => {
             if(item?.assignedrfidDevices){
              item?.assignedrfidDevices?.map((item2) => {
                if(item2?.deviceRef?.rfid == rfid){
                  user = item
                }
              })
            }
           })
           console.log('user_found',user)
          // see if in realtime rfidinspection this user exist, if exist simply update it otherwise add it with all info
          let theindex = -1
          if(!user._id){
            return {...state}
          }
          console.log('id',user._id)
          console.log('rfidinspectionrealtime',state.rfidinspectionrealtime)
          state.rfidinspectionrealtime?.map((item,indx) => {
              if(String(item.userRef._id) == String(user._id)){
                  theindex = indx
              }
          })
          console.log('theindex',theindex)
          if(theindex > -1){
            // console.log(moment().tz("Europe/Rome").format())
            let devices = state.rfidinspectionrealtime[theindex].detectedDevices
            let index = -1
            console.log('devices',devices)
            devices.map((item,indx) => {
                if(String(item.deviceRef.rfid) == String(rfid)){
                    index = indx
                }
            })
            console.log('inside_index',index)
            if(index > -1){
            devices[index].detected = false
            state.rfidinspectionrealtime[theindex].detectedDevices  = devices
            console.log('devices_after',devices)
            const foundedindex = devices?.find((item) => item.detected == true)
            console.log('foundedindex',foundedindex)
            if(!foundedindex){
                console.log('state.rfidinspectionrealtime.splice(theindex,1)',state.rfidinspectionrealtime.splice(theindex,1))
                state.rfidinspectionrealtime = state.rfidinspectionrealtime.splice(theindex,1)
            }
            
            //setrfidinspectionrealtime([...rfidinspectionrealtime])
            }
            }
    
        } catch (error) {
            console.log(error)
        }
        return {
            ...state,
        };
      }
      
      default:
        return state;
    }
  };
  
  export default rfidReducers;
  