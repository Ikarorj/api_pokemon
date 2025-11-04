import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import api from '../services/api';
import PokemonCard from '../components/PokemonCard';

interface PokemonListItem {
  name: string;
  url: string;
}

export default function HomeScreen({ navigation }: any) {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0); // 🧩 controla onde parar
  const limit = 20; // quantos por vez

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      const response = await api.get(`?limit=${limit}&offset=${offset}`);
      const results = response.data.results;

      const detailedData = await Promise.all(
        results.map(async (pokemon: PokemonListItem) => {
          const detail = await fetch(pokemon.url).then((res) => res.json());
          return {
            name: pokemon.name,
            url: pokemon.url,
            image: detail.sprites.front_default,
            height: detail.height,
            weight: detail.weight,
            types: detail.types.map((t: any) => t.type.name),
          };
        })
      );

      // adiciona ao final da lista existente
      setPokemons((prev) => [...prev, ...detailedData]);
    } catch (error) {
      console.error('Erro ao buscar pokémons:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  return (
    <FlatList
      data={pokemons}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <PokemonCard
          pokemon={{ name: item.name, image: item.image }}
          onPress={() => navigation.navigate('Details', item)}
        />
      )}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
      onEndReached={() => {
        if (!loading) setOffset((prev) => prev + limit);
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        loading ? (
          <ActivityIndicator size="large" color="#3B4CCA" style={{ margin: 20 }} />
        ) : null
      }
    />
  );
}
