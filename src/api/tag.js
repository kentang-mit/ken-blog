import Axios from 'axios'

export default{
  getAllTags(){
    return Axios.get('/api/get_all_tags');
  },
  createTag(tagName){
    return Axios.post('/api/add_tag', {tagName: tagName});
  },
  modifyTag(id, tagName){
    return Axios.patch('/api/modify_tag/' + id, tagName);
  },
  deleteTag(id){
    return Axios.delete('/api/delete_tag' + id);
  }
}