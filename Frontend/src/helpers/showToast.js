import { toast, Bounce  } from "react-toastify";

export const showToast = (type,msg) => {
    const config = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        progress: undefined,
        theme: "light",
        transition: Bounce ,
    }
    if( type === "Success"){
        toast.success(msg,config);
    }
    else if( type === "Error"){
        toast.error(msg,config);
    }
    else if( type === "Info"){
        toast.info(msg,config);
    }
    else{
        toast(msg,config);
    }
}