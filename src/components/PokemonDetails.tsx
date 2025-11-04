import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PokemonDetailsProps {
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
}

export default function PokemonDetails({ name, image, height, weight, types }: PokemonDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name.toUpperCase()}</Text>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.info}>Altura: {height / 10} m</Text>
      <Text style={styles.info}>Peso: {weight / 10} kg</Text>
      <Text style={styles.info}>Tipos: {types.join(', ')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    margin: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B4CCA',
    marginBottom: 12,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
});
