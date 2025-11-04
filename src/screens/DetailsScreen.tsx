import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import axios from 'axios';

// ✅ Tipagem da estrutura de dados retornada pela PokeAPI
interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
    other?: {
      ['official-artwork']?: {
        front_default?: string;
      };
    };
  };
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities?: { ability: { name: string } }[];
  stats?: { stat: { name: string }; base_stat: number }[];
}

// ✅ Tipagem das rotas de navegação
type RootStackParamList = {
  Home: undefined;
  Details: { url: string; name: string };
};
type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const route = useRoute<DetailsRouteProp>();
  const { url } = route.params;

  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        if (mounted) setData(res.data);
      } catch (err) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar os detalhes.');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [url]);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B4CCA" />
      </View>
    );

  if (!data)
    return (
      <View style={styles.center}>
        <Text>Dados indisponíveis</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        {data.name[0].toUpperCase() + data.name.slice(1)}
      </Text>

      <Image
        source={{
          uri:
            data.sprites.other?.['official-artwork']?.front_default ??
            data.sprites.front_default ??
            undefined,
        }}
        style={styles.image}
      />

      <View style={styles.row}>
        <Text style={styles.label}>Altura:</Text>
        <Text style={styles.value}>{data.height / 10} m</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{data.weight / 10} kg</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Tipos:</Text>
        <Text style={styles.value}>
          {data.types.map((t) => t.type.name).join(', ')}
        </Text>
      </View>

      {data.abilities && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {data.abilities.map((ab: { ability: { name: string } }, i: number) => (
            <Text key={i}>{ab.ability.name}</Text>
          ))}
        </View>
      )}

      {data.stats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Estatísticas</Text>
          {data.stats.map(
            (s: { stat: { name: string }; base_stat: number }, i: number) => (
              <Text key={i}>
                {s.stat.name}: {s.base_stat}
              </Text>
            )
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: 'center', backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#3B4CCA',
    marginBottom: 16,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    marginRight: 4,
  },
  value: {
    color: '#333',
  },
  section: {
    marginTop: 16,
    alignSelf: 'stretch',
    backgroundColor: '#F4F4F4',
    padding: 10,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3B4CCA',
  },
});
