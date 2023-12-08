import './App.css'
// import Switch from './components/Switch/SwitchTheme';
import Navbar from './components/Navbar/Navbar';
import PokeCard from './components/Card/PokeCard';
import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Container, CssBaseline, Grid } from '@mui/material';
import axios from 'axios';
import Functions from './components/MoreFunctions/Functions';
import KanyeQuotes from './components/KanyeQuotes/KanyeQuotes';

export default function App() {
  const [start, setStart] = useState(1)  //min 1
  const [limit, setLimit] = useState(151) //max 1017
  const [pokemons, setPokemons] = useState([])
  const [showQuote, setShowQuote] = useState(false)
  const [mode, setMode] = useState(true)
  const [shiny, setShiny] = useState(false)
  const [rotate, setRotate] = useState('front')
  const filteredPokemons = []

  const handleGenerationChange = (selectedGen) => {
    if (selectedGen === 'All Generations') {
      setStart(1)
      setLimit(1017)
    } else if (selectedGen === 'Kanto') {
      setStart(1)
      setLimit(151)
    } else if (selectedGen === 'Johto') {
      setStart(152)
      setLimit(251)
    } else if (selectedGen === 'Hoenn') {
      setStart(252)
      setLimit(386)
    } else if (selectedGen === 'Sinnoh') {
      setStart(387)
      setLimit(493)
    } else if (selectedGen === 'Unova') {
      setStart(494)
      setLimit(649)
    } else if (selectedGen === 'Kalos') {
      setStart(650)
      setLimit(721)
    } else if (selectedGen === 'Alola') {
      setStart(722)
      setLimit(809)
    } else if (selectedGen === 'Galar') {
      setStart(810)
      setLimit(905)
    } else if (selectedGen === 'Paldea') {
      setStart(906)
      setLimit(1017)
    }

    // console.log(selectedGen)
    // console.log('start: ' + start)
    // console.log('limit: ' + limit)
  } 


  useEffect(() => {
    getPokemons()
  }, [start, limit])

  const getPokemons = () => {
    let endpoints = []

    for (let i = start; i <= limit; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }

    axios
      .all(endpoints.map(endpoint => axios.get(endpoint)))
      .then(res => {
        setPokemons(res)
        // console.log(res)
      })
      .catch(err => alert('Erro ao fazer a requisição'))
  }


  const filter = (name) => {
    for (let i in pokemons) {
      if (pokemons[i].data.name.includes(name)) {
        filteredPokemons.push(pokemons[i])
      }
    }

    if (filteredPokemons.length === 0) {
      setShowQuote(true)
    } else {
      setShowQuote(false)
    }

    if (name === '') {
      getPokemons()
      setShowQuote(false)
    }

    setPokemons(filteredPokemons)
  }


  const changeTheme = () => {
    setMode(prevMode => !prevMode)
  }

  const theme = createTheme({
    palette: {
      mode: mode ? 'dark' : 'light'
    }
  })


  const changeShiny = () => {
    setShiny(!shiny)
  }


  const changeRotate = () => {
    rotate === 'front' ? setRotate('back') : setRotate('front')
  }

  return (
    <Box paddingBottom='5rem'>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Navbar onGenerationChange={handleGenerationChange} filter={filter} />

        <Container maxWidth='xl'>
          {showQuote && <KanyeQuotes />}

          <Grid container spacing={2}>
            {pokemons.map((pokemon, key) => (
              <Grid item xl={3} lg={3} md={4} sm={6} xs={12} key={key} >
                <PokeCard
                  name={pokemon.data.name}
                  number={pokemon.data.id}
                  image={shiny ? pokemon.data.sprites[`${rotate}_shiny`] : pokemon.data.sprites[`${rotate}_default`]}
                  type1={pokemon.data.types[0].type.name}
                  type2={pokemon.data.types.length === 2 ? pokemon.data.types[1].type.name : null}
                  stats={pokemon.data.stats}
                  moves={pokemon.data.moves}
                />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* <Switch changeTheme={changeTheme} /> */}
        <Functions changeTheme={changeTheme} theme={theme} changeShiny={changeShiny} changeRotate={changeRotate} />

      </ThemeProvider>
    </Box>
  )
}
