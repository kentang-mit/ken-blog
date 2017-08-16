import Axios from 'axios'

export default {
  getAllArticles(tags, page, limit){
    return Axios.get(`/api/get_all_articles?tags=${tags}&page=${page}&limit=${limit}`);
  },
  getArticle(id){
    return Axios.get('/api/get_article/' + id);
  },
  deleteArticle(id){
    return Axios.delete('/api/delete_article/' + id);
  },
  createArticle(article){
    return Axios.post('/api/add_article', article)
  },
  //might be problematic
  modifyArticle(id, article){
    return Axios.patch('/api/modify_article/' + id, article);
  }
}