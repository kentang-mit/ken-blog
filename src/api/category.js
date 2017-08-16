import Axios from 'axios'

export default{
  getAllCategories(){
    return Axios.get('/api/get_all_categories');
  },
  createCategory(categoryName){
    return Axios.post('/api/add_category', {categoryName: categoryName});
  },
  modifyCategory(id, categoryName){
    return Axios.patch('/api/modify_category'+ id, categoryName);
  },
  deleteCategory(id){
    return Axios.delete('/api/delete_category' + id);
  }
}