<template>
  <div>
  <div class="col-sm-9">
    <!--p: paragraph-->
    <p v-if="!articleList.length"><strong>这一页是空的...</strong></p>

      <article v-for="(article, index) in articleList">
        <header>
          <router-link :to="{path:'/article/'+article._id}"> <h2> {{ article.title }} </h2> </router-link>
          <h4> {{ article.created }} </h4>
          <template v-if="article.category"><label class="label label-success">{{ article.category }}</label>&nbsp;&nbsp;</template>
          <template v-for="tag in article.tagList"><label class="label label-primary">{{ tag.tagName }}</label>&nbsp;&nbsp;</template>
        </header>
        &nbsp;
        <!--{{article._id}}-->
        <p v-html="markdown(article.abstract)"></p>
        <footer>
          <router-link :to="{path:'/article/'+article._id}">...阅读全文</router-link>
        </footer>
        <hr>
      </article>
      <ul class="pager">
      <template v-if="pageNo == 1"><li class="previous disabled"><router-link to="#">&larr; 上一页</router-link></li></template>
      <template v-if="pageNo != 1"><li class="previous"><router-link :to="{path: '/page/'+JSON.stringify(pageNo-1)}">&larr; 上一页</router-link></li></template>
      <template v-if="articleList.length!==0"><li class="next"><router-link :to="{path: '/page/'+JSON.stringify(pageNo+1)}">下一页 &rarr;</router-link></li></template>
      <template v-if="articleList.length===0"><li class="next disabled"><router-link :to="{path: '/page/'+JSON.stringify(pageNo+1)}">下一页 &rarr;</router-link></li></template>
      </ul>
  </div>
  <div class="col-sm-3">
    <side-bar></side-bar>
  </div>
  
  </div>


</template>

<script>
const Sidebar = require('./Sidebar.vue')
const markdown = require('../filters/index.js').markdown

  export default{
  	name: 'List',
    components:{
      'side-bar': Sidebar
    },
    data() {
      return{
        pageNo: 1,
        articleList: []
    }
    },
    mounted: function(){
      if(this.$route.params.id !== undefined){
        this.pageNo = +this.$route.params.id;
      }
      this.$store.dispatch('getAllArticles', {tags:[], page: this.pageNo, limit:4}).then(res => {
        this.articleList = res.data.articleArr;
      })
    },
    //不要用计算属性
  	/*computed: {
  	  articles() {
        /*if(this.$store.state.articleList.length === 0){
        this.$store.dispatch('getAllArticles', [], 1, 4).then(res =>{
          return this.$store.state.articleList;
        })
      }
        //don't forget!
        return this.$store.state.articleList;
  	  }
  	},*/
  	methods: {
      markdown(content){
        return markdown(content);
      }
  	},

    //如果没有watch,路由切换后不会刷新.
    watch:{
      '$route' (to, from) {
        if(this.$route.params.id !== undefined){
          this.pageNo = +this.$route.params.id;
        }
        this.$store.dispatch('getAllArticles', {tags:[], page: this.pageNo, limit:4}).then(res => {
          this.articleList = res.data.articleArr;
        })
      }
    }
  }
</script>