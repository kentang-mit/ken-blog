import * as types from './mutation-types'

export default {
  [types.ADD_ARTICLE](state, article){
  	state.articleList.push(article);
  },
  [types.GET_ARTICLE](state, currentArticle){
    state.currentArticle = currentArticle
  },
  [types.GET_ALL_ARTICLES](state, articleList){
  	state.articleList = articleList;
  },
  [types.ADD_TAG](state, tag){
  	state.currentTagList.push(tag);
  },
  [types.DELETE_TAG](state, id){
    var index = state.currentTagList.indexOf(state.currentTagList.find(p => p._id === id));
    state.currentTagList.splice(index, 1);
  },
  [types.GET_ALL_TAGS](state, tagList){
    state.tagList = tagList;
  },
  [types.ADD_CATEGORY](state, category){
  	state.categoryList.push(category);
  },
  [types.DELETE_CATEGORY](state, id){
    var index = state.categoryList.indexOf(state.categoryList.find(p => p._id === id));
    state.categoryList.splice(index, 1);
  },
  [types.GET_ALL_CATEGORIES](state, categoryList){
    state.categoryList = categoryList;
  },
  [types.LOGIN](state, token){
    state.token = token;
  },
  [types.LOGOUT](state){
    state.token = '';
  }
};