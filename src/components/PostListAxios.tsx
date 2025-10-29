import react, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;

}

export const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchPosts() {
        try {
            const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            setPosts(response.data);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }

}

}