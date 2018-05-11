import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const RightSide = (props) => {
  if(props.weight){
    return(
      <div className="text-container">
        <h1 className="name">{props.name}</h1>
        <h1 className="weight">{props.weight}</h1>
      </div>
    );
  }else {
    return <h1 className="hello">Welcome to the Pokegenerator!<br /> Click the refresh button to generate a Pokemon.<br /> Then click again to generate another one<br /> Or search for a Pokemon by name</h1>
  }
};

class App extends Component {
  constructor(){
    super()

    this.state = {
      name: "",
      image: "",
      weight: null
    }
  }
  searchPokemon = (event) => {
    event.preventDefault();
    console.log(this.searchInput.value);
    let search = this.searchInput.value.toLowerCase();
    let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${search}/`;
      axios
        .get(pokemonURL)
        .then(data => {
          if (!data) {
          }
          console.log(data);
          let name = "Name: " + data.data.name;
          let image = data.data.sprites.front_default;
          let weight = "Weight: " + data.data.weight;
          this.setState({
            name: name,
            image: image,
            weight: weight
          })
        })
        .catch(err => {
          alert(`${search} is not a known Pokemon!`)
          console.log(err);
        });
  }

    addPokemon = () => {
      let id = Math.floor(Math.random()*802);
      let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${id}/`;
        axios
          .get(pokemonURL)
          .then(data => {
            let name = "Name: " + data.data.name;
            let image = data.data.sprites.front_default;
            let weight = "Weight: " + data.data.weight;

            this.setState({
              name: name,
              image: image,
              weight: weight
            })
          })
          .catch(err => {
            console.log(err);
          });
    }

  render() {
    return (
      <div className="App">
        <h1 className="title">Pokegenerator</h1>
        <form className="pokeSearch"onSubmit={this.searchPokemon}>
          <input className="search" type="text" name="search" ref={input => {this.searchInput = input}} placeholder="Search for Pokemon" />
        </form>
        <div className="leftSide">
          <div className="image-container">
            <img className="pokemon" src={this.state.image} alt={this.state.name}/>
          </div>
        </div>
        <div className="button-container">
          <button className="generate" onClick={this.addPokemon}><i className="fas fa-sync-alt fa-4x"></i></button>
        </div>
        <div className="rightside">
          <RightSide weight={this.state.weight} name={this.state.name}/>
        </div>
      </div>
    );
  }
}

export default App;
