import React from 'react';
import { SafeAreaView } from 'react-native';
import PostList from './src/components/PostList';


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PostList />
    </SafeAreaView>
  );
};
export default App;
