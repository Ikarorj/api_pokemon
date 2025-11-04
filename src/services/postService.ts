import axios from 'axios';
import Post from '../model/entities/post';

export class PostService {
    static url: string = 'https://jsonplaceholder.typicode.com/posts';

    async getPosts(): Promise<Post[]> {
        let response = await axios.get<Post[]>(PostService.url);
        return response.data;
    }

}


export default PostService;
  
