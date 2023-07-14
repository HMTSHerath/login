function SignupValidation (values) {

    let errors = {};
    const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    // const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    const phone_pattern = /^[0-9]{10}$/

    if (!values.phone) {
        errors.phone = "Phone Number is required";
        }
    else if (!phone_pattern.test(values.phone)) {
        errors.phone = "Phone Number is invalid";
    }else{
        errors.phone = ""
        }
        
    if (!values.name) {
        errors.name = "Name is required";
        }
    else{
        errors.name = ""
    }

    
    if (!values.email) {
      errors.email = "Email address is required";
    }
    else if (!email_pattern.test(values.email)) {
      errors.email = "Email address is invalid";
    }else{
      errors.email = ""
    }
    
  
    if (!values.password) {
      errors.password = "Password is required";
    }
    // else if (!password_pattern.test(values.password)) {
    //   errors.password = "Password is invalid";
    // }
    else{
      errors.password = ""
    }
  
      return errors;
  
  }
  
  export default SignupValidation