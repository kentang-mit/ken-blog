import * as types from './mutation-types'
import articleApi from '../api/article'
import loginApi from '../api/login'
import tagApi from '../api/tag'
import categoryApi from '../api/category'

//don't forget: 1. 'return' articleApi.createArticle..... 2. return new Promise!!!
export default{
  createArticle({ commit }, title, content, tags, category){
    return articleApi.createArticle(title, content, tags, category).then(res => {
      console.log(res);
      commit(types.ADD_ARTICLE, res.data.createdArticle);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  getArticle({ commit }, id){
    return articleApi.getArticle(id).then(res => {
      commit(types.GET_ARTICLE, res.data.foundArticle);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  getAllArticles({ commit }, {tags, page, limit}){
    return articleApi.getAllArticles(tags, page, limit).then(res => {
      commit(types.GET_ALL_ARTICLES, res.data.articleArr);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  //might be problematic
  //modify and delete: no synchronized 'commit', articleList will be updated everytime the user visits home page
  //but should add {commit}
  modifyArticle({ commit }, {id, article}){
    return articleApi.modifyArticle(id, article).then(res => {
      console.log('Modified ' + id);
      console.log(res);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  deleteArticle({commit}, id){
    return articleApi.deleteArticle(id).then(res => {
      console.log('Deleted' + id);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  createTag({ commit }, tagName){
    return tagApi.createTag(tagName).then(res => {
      console.log(res);
      commit(types.ADD_TAG, res.data.createdTag);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  getAllTags({ commit }){
    return tagApi.getAllTags().then(res => {
      commit(types.GET_ALL_TAGS, res.data.tagList);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  deleteTag({ commit }, id){
    return tagApi.deleteTag(id).then(res => {
      console.log('Deleted Tag ' + id);
      commit(types.DELETE_TAG, id);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

//Only delete in vuex.store
  deleteCurrentTag({ commit }, id){
    commit(types.DELETE_TAG, id);
    return new Promise((resolve, reject) => {
      resolve();
    })
  },

  modifyTag({ commit }, {id, tagName}){
    return tagApi.modifyTag(id, tagName).then(res => {
      console.log('Modified Tag ' + id);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  createCategory({ commit }, categoryName){
    return categoryApi.createCategory(categoryName).then(res => {
      commit(types.ADD_CATEGORY, res.data.createdCategory);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  modifyCategory({ commit }, {id, categoryName}){
    return categoryApi.modifyCategory(id, categoryName).then(res => {
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  deleteCategory({ commit }, id){
    return categoryApi.deleteCategory(id).then(res => {
      commit(types.DELETE_CATEGORY, id);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  getAllCategories({ commit }){
    return categoryApi.getAllCategories().then(res => {
      commit(types.GET_ALL_CATEGORIES, res.data.categoryList);
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  login({ commit }, {username, password}){
    return loginApi.login(username, password).then(res => {
      commit('LOGIN', res.data.token)
      return new Promise((resolve, reject) => {
        resolve(res);
      })
    })
  },

  logout({ commit }){
    commit('LOGOUT')
    return new Promise((resolve, reject) => {
      resolve();
    })
  }
}