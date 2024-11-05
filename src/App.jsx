import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Cards } from './components/card'
import { Scoreboard  } from './components/scoreboard'

function App() {

//----------------------------------API and Card Component------------------------------//
  function shuffle(array){
    for (let i = array.length -1; i>0; i--){
        let j= Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function GetRandomPokemons(){
    const endpoint = 'https://pokeapi.co/api/v2/pokemon';
    try {
        const response = await fetch(`${endpoint}?limit=200`);
        const data = await response.json();
        let randomPokemonList = data.results;
        let shuffledList = shuffle(randomPokemonList).slice(0, 20);
        let pokemonNames = shuffledList.map(element => element.name);
        console.log(shuffledList);
        console.log(pokemonNames);
        let pokemonData = [];
        for (let item of pokemonNames){
            const newResponse = await fetch(`${endpoint}/${item}`)
            const newData = await newResponse.json();
            pokemonData.push(newData);
        }
        return pokemonData;

    } catch (error) { 
        console.error(error);
    }
  }

  const [masterPokemonList, setMasterPokemonList] = useState({
    nameList : [],
    clickedList : [],
  });

  const shuffleList = (pokemonName) => {

  


    if (!masterPokemonList.clickedList.includes(pokemonName)){

      incrementScore();
      setMasterPokemonList(prevData => ({
        ...prevData,
        clickedList : [...prevData.clickedList, pokemonName]
      }))

      let shuffledList = shuffle([...masterPokemonList.nameList]);
      setMasterPokemonList(prevData => ({
        ...prevData,  
        nameList : shuffledList,
       }));

    } else {
      resetScore();
      setMasterPokemonList(prevData => ({
        ...prevData,
        clickedList : []
      }))
    }
  }

  useEffect( ()=>{
    const fetchData = async () => {
        let pokemonList = await GetRandomPokemons();
        setMasterPokemonList({
            nameList : pokemonList,
            clickedList : []
      });
    }
    fetchData();
    }, [] );

//------------------------------------Scoreboard------------------------------------//
  const [ score , setScore ] = useState({
      currentScore : 0,
      highScore : 0
    }
  );

  function incrementScore(){
    setScore(prevData => {
      let newHighScore = prevData.currentScore +1 > prevData.highScore ?
      prevData.currentScore +1 : prevData.highScore;

      return {
        ...prevData,
        currentScore: prevData.currentScore + 1,
        highScore : newHighScore
      };
    });
    
  }

  function resetScore(){
    setScore( prevData => ({
      ...prevData,
      currentScore : 0
    }))
  }



    
//--------------------------------------Return--------------------------------------//

    return (
      <>
        < Scoreboard score = {score}/>
        <Cards masterPokemonList = {masterPokemonList} shuffleList={shuffleList} />
      </>
    )
}

export default App
