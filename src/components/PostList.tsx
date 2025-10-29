import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
interface Post {
    id: number;
    title: string;
    body: string;
}
const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Falha na requisição');
                }
                return response.json();
            })
            .then((data: Post[]) => {
                setPosts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <Text>Carregando...</Text>;
    }
    if (error) {
        return <Text>Erro: {error}</Text>;
    }
    return (
        <View style={styles.container}>
            {posts.map(post => (
                <Text key={post.id}>{post.title}</Text>
            ))}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});
export default PostList;