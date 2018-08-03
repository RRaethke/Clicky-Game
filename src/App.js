//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import dogs from "./dogs.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    dogs,
    clickedDog: [],
    score: 0
  };

//when you click on a card ... the dogs is taken out of the array
  imageClick = event => {
    const currentDog = event.target.alt;
    const dogAlreadyClicked =
      this.state.clickedDog.indexOf(currentDog) > -1;

//if you click on a dogs that has already been selected, the game is reset and cards reordered
    if (dogAlreadyClicked) {
      this.setState({
        dogs: this.state.dogs.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedDog: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available dogs, your score is increased and cards reordered
    } else {
      this.setState(
        {
          dogs: this.state.dogs.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedDog: this.state.clickedDog.concat(
            currentDog
          ),
          score: this.state.score + 1
        },
//if you get all 12 dogs corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              dogs: this.state.dogs.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedDog: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.dogs.map(dogs => (
            <FriendCard
              imageClick={this.imageClick}
              id={dogs.id}
              key={dogs.id}
              image={dogs.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;