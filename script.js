// Dirección web de la API https://pokeapi.co/
//Existe desde el pokemon 1 hasta el 898

var imagenPokemon = document.getElementById("imgPokemon");
var nombrePokemon = document.getElementById("name");
var hpPokemon     = document.getElementById("hp");
var attPokemon    = document.getElementById("att");
var defPokemon    = document.getElementById("def");
var speAttPokemon = document.getElementById("speAtt");
var speDefPokemon = document.getElementById("speDef");
var speedPokemon  = document.getElementById("speed");
var typePokemon   = document.getElementById("type");

var nextButton     = document.getElementById("nextButton");
var previousButton = document.getElementById("prevButton");
var contador       = 1;


//Es async porque necesitamos que se espere a que nos traiga la información y la pinte
//fetch recibe una url.
//https://pokeapi.co/api/v2/pokemon/150  -> url de la api con la información del pokemon 150
//Pero usando `https://pokeapi.co/api/v2/pokemon/${id}`, ya se genera una url con un número aleatorio
const fetchData = async (id) => {
  try {
    //Con async y   Aawait le decimos que se espere a que tenga una solictud, cuando tengas esa información, pasa a la siguiente linea.
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    //Aquí la información viene en bruto, por lo tanto se convierte a json
    const data = await res.json();

    //Creamos el objeto con la información necesaria que se menciona abajo.
    const pokemon = {
      img: data.sprites.other.dream_world.front_default,
      nombre: data.forms[0].name,
      hp: data.stats[0].base_stat,
      ataque: data.stats[1].base_stat,
      defensa: data.stats[2].base_stat,
      ataqueEspecial: data.stats[3].base_stat,
      defensaEspecial: data.stats[4].base_stat,
      velocidad: data.stats[5].base_stat,
      tipo: data.types[0].type.name
    };

    //Ya que tengo los datos mando a llamar a la funcion y muestro los datos
    pintarDatos(pokemon);

  } catch (error) {
    console.log(error);
  }
};

const pintarDatos = (pokemon) => {
  imagenPokemon.setAttribute("src", pokemon.img); //Al atributo src le asigno la URL traida de la API
  nombrePokemon.innerHTML = `${contador}.- ${pokemon.nombre}`;
  hp.innerHTML = pokemon.hp;
  attPokemon.innerHTML = pokemon.ataque;
  defPokemon.innerHTML = pokemon.defensa;
  speAttPokemon.innerHTML = pokemon.ataqueEspecial;
  speDefPokemon.innerHTML = pokemon.defensaEspecial;
  speedPokemon.innerHTML = pokemon.velocidad;
  typePokemon.innerHTML = pokemon.tipo;
};

//Termina de cargar el contenido y hace lo que le indiquemos en el código
document.addEventListener("DOMContentLoaded", () => {
  //Llamo a fetchData para mostar la información en la consola
  fetchData(contador);

  previousButton.addEventListener('click', () => {
    contador -= 1;
    //Llamo a fetchData para mostar la información en la consola
    fetchData(contador);
    if (contador < 1) {
      contador = 1;
    }
  });
  
  nextButton.addEventListener('click', () => {
    contador += 1;
    //Llamo a fetchData para mostar la información en la consola
    fetchData(contador);
    if (contador > 898) {
      contador = 898;
    }
  });

});