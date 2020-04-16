import axios from "axios";
const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemons = async (url) => {
  let result = false;
  try {
    result = await http.get(url);
    result = result.data;
  } catch (error) {
    result = error.message.data;
  }
  return result;
};
