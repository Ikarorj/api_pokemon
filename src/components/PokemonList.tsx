import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { getPokemons } from '../services/pokeService';
import PokemonCard from '../components/PokemonCard';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

// Defina o tipo das rotas da sua navegação
type RootStackParamList = {
  Home: undefined;
  PokemonDetails: { name: string };
};

// Tipagem do navigation
type NavProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavProp>();

  useEffect(() => {
    async function loadPokemons() {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadPokemons();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E3350D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard
            pokemon={{ name: item.name, image: item.image }}
            onPress={() => navigation.navigate('PokemonDetails', { name: item.name })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 8 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
