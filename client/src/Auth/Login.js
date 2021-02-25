import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState({
    emailId: "",
    password: "",
  });
  const { emailId, password } = state;

  const onChangeState = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  console.log(state);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("state", state);
  };
  return (
    <div className="form">
      <h1 className="user-signup">SignIn </h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <label>Email Id :</label>
        <input
          placeholder="abc@gmail.com"
          name="emailId"
          value={emailId}
          type="email"
          onChange={(e) => onChangeState(e)}
          required
        />

        <div>
          <label>Passoword:</label>
          <input
            placeholder="abcd"
            name="password"
            value={password}
            type="password"
            onChange={(e) => onChangeState(e)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
