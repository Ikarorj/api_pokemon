import react, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import post  from '../model/entities/post';


export const PostList = () => {
    const [posts, setPosts] = useState<post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchPosts() {
        try {
            let postService = new postService();
            let posts = await postService.getPosts();
            setPosts(posts);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch posts');
            setLoading(false);
        }
        
    }

}