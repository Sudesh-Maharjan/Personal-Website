import { API_URL } from "../Config"


// signup function
export const signup=user=>{
    return fetch(`${API_URL}/signup`,{
        method:'POST',
        headers:{
            accept:'application/json' ,
            'content-type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

// signin function
export const signin=user=>{
    return fetch(`${API_URL}/signin`,{
        method:'POST',
        headers:{
            accept:'application/json' ,
            'content-type':'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res=>{
        return res.json()
    })
    .catch(err=>console.log(err))
}

// authenticate and store token in the local storage:
export const authenticate=(data,next)=>{
    if (typeof window !== undefined){
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
}

// redirect user by role:
// export const isAuthenticated=()=>{
 
//     if(localStorage.getItem('jwt')){
//         return JSON.parse(localStorage.getItem('jwt'))
//     }
//     else{
//         return false
//     }


// }


export const isAuthenticated = () => {
    const user = JSON.parse(localStorage.getItem('jwt'));
  
    // Check if user is authenticated and has a role
    if (user && user.user && user.user.role) {
      return user;
    }
  
    // User is not authenticated
    return false;
  }
// signout
// export const signout=next=>{
//     if(typeof window!== 'undefined'){
//         localStorage.removeItem('jwt')  // localstorage bata item hatayeko ani matrai next function maa gayera backend maa hit gareko.
        
//         return fetch(`${API_URL}/signout`,{
//             method:'POST'
//         })
//         .then(res=>{
//             console.log('signout')
//         })
//         .catch(err=>console.log(err))
//     }
// }