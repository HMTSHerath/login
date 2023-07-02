function LoginValidation (values) {

  let errors = {};
  const email_pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
  const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

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
  else if (!password_pattern.test(values.password)) {
    errors.password = "Password is invalid";
  }else{
    errors.password = ""
  }

    return errors;

}


export default LoginValidation