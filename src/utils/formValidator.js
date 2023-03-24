
export const registerFormValidator = (data) =>{
    if (data.password !== data.repeatPassword) {
        return "Passwords must match!"
      }
      if (data.password.length < 3 || data.password.length > 10) {
        return "Password must be atleast 3 characters long!"
      }
      if (!data.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        return "Invalid email!"
      }
      return data
}

export const createFormVlaidator = (data) =>{

    const {title,director,year,genre,img, description} = data

    if( !title || !director || !year || !genre || !img || !description){
        return "All fields are required!";
    }
    return data
}

export const editFormVlaidator = (data) =>{

    const {title,director,year,genre,img, description} = data

    if( !title || !director || !year || !genre || !img || !description){
        return "All fields are required!";
    }
    return data
}