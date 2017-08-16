import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);
const state = {
  articleList : [],
  categoryList : [],//all categories
  tagList : [],
  currentTagList: [],//tagList of current article!
  currentArticle : '',
  token: '',
  //currentArticleCompiled: ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions
});