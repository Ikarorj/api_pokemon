// src/components/PokemonCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export type PokemonCardProps = {
  pokemon: {
    name: string;
    image?: string;
  };
  onPress: () => void;
};

export default function PokemonCard({ pokemon, onPress }: PokemonCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{
          uri:
            pokemon.image ||
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${extractPokemonId(
              pokemon.name
            )}.png`,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Text>
    </TouchableOpacity>
  );
}

// (opcional) função auxiliar para exibir imagens padrão
function extractPokemonId(name: string): string {
  const map: Record<string, number> = {
    bulbasaur: 1,
    ivysaur: 2,
    venusaur: 3,
    charmander: 4,
    charmeleon: 5,
    charizard: 6,
    squirtle: 7,
    wartortle: 8,
    blastoise: 9,
  };
  return map[name.toLowerCase()]?.toString() ?? '1';
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: 100, height: 100 },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
