import React from "react";

const initialState = {
  email: "",
  password: "",
  name: "",
};

export default function Register(props) {
  const [state, setState] = React.useState(initialState);
  const { loadUser, onRouteChange } = props;
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         email: '',
  //         password: '',
  //         name: '',
  //     };
  // }

  const onNameChange = (event) => {
    // this.setState({ name: event.target.value });
    setState({ ...state, name: event.target.value });
  };

  const onEmailChange = (event) => {
    // this.setState({ email: event.target.value });
    setState({ ...state, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    // this.setState({ password: event.target.value });
    setState({ ...state, password: event.target.value });
  };

  const onSubmitSignIn = async () => {
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.password,
          confirmPassword: state.password,
        }),
      });
      // .then((response) => response.json())
      // .then((user) => {
      //     if (user.id) {
      //         this.props.loadUser(user);
      //         this.props.onRouteChange('home');
      //     }
      // })
      // .catch((err) => console.error(err));
      const user = await response.json();
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
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
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
              value="Register"
            />
          </div>
        </div>
      </main>
    </article>
  );
}
