import axios from 'axios';
import { Pokemon } from '../model/entities/pokemon';

const api = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
});

export async function getPokemons(limit = 20, offset = 0) {
    const response = await api.get(`pokemon?limit=${limit}&offset=${offset}`);
    const results = response.data.results;

    const detailed = await Promise.all(
        results.map(async (p: Pokemon) => {
            const res = await axios.get(p.url);
            return res.data;
        })
    );

    return detailed;
}

export async function getPokemonDetails(name: string) {
    const response = await api.get(`pokemon/${name}`);
    return response.data;
}
