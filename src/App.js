import React, { Component } from "react";
import Particles from "react-particles-js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    // console.log(data);
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        // entries: data.entries,
        joined: data.joined,
      },
    });
  };

  calculateFaceLocations = (data) => {
    // const clarifaiFace =
    //     data.outputs[0].data.regions[0].region_info.bounding_box;

    return data.regions.map((element) => {
      const face = element.region_info.bounding_box;
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);

      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });
  };

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = async () => {
    this.setState({ imageUrl: this.state.input });
    const response = await (
      await fetch("http://localhost:4000/imageurl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
    ).json();
    console.log(response);
    this.displayFaceBox(this.calculateFaceLocations(response));

    //   .then((response) => response.json())
    //   .then((response) => {
    //     if (response) {
    //       fetch("http://localhost:4000/image", {
    //         method: "put",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //           id: this.state.user.id,
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((count) => {
    //           console.log(count);
    //           this.setState(
    //             Object.assign(this.state.user, {
    //               entries: count,
    //             })
    //           );
    //         })
    //         .catch((err) => console.log(err));
    //     }
    //     this.displayFaceBox(this.calculateFaceLocations(response));
    //   })
    //   .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
      localStorage.removeItem("user");
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  async componentWillMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.loadUser(user);
      const response = await (
        await fetch(`http://localhost:4000/users/${user.id}/profile`, {
          method: "get",
        })
      ).json();
      //   console.log(response.entries);
      this.setState(
        Object.assign(this.state.user, {
          entries: response.entries,
        })
      );
      console.log(this.state.user);
      this.onRouteChange("home");

      // })
      // .catch((err) => console.error(err));
    }
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
