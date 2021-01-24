import React from "react";

const initialState = {
  signInEmail: "",
  signInPassword: "",
};

export default function Signin(props) {
  const [state, setState] = React.useState(initialState);
  const { onRouteChange, loadUser } = props;
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         signInEmail: '',
  //         signInPassword: '',
  //     };
  // }

  const onEmailChange = (event) => {
    setState({ ...state, signInEmail: event.target.value });
  };

  const onPasswordChange = (event) => {
    setState({ ...state, signInPassword: event.target.value });
  };

  const onSubmitSignIn = async () => {
    try {
      const response = await fetch("http://localhost:4000/signin", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.signInEmail,
          password: state.signInPassword,
        }),
        // credentials: "include",
      });
      //   console.log(response);
      // .then((response) => response.json())
      // .then((user) => {
      //     if (user.id) {
      //         this.props.loadUser(user);
      //         this.props.onRouteChange('home');
      //     }
      // })
      // .catch((err) => console.error(err));
      const user = await response.json();
      //   console.log("token:", user.token);
      if (user.id) {
        loadUser(user);
        onRouteChange("home");
        localStorage.setItem("user", JSON.stringify(user));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmitSignIn}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim black db pointer"
            >
              Register
            </p>
          </div>
        </div>
      </main>
    </article>
  );
}
