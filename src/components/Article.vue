<template>
  <div>
  <article class>
    <header id="header">
      <h1>{{ title }}</h1>
      <h4>{{ created }}</h4>
      <template v-if="category"><label class="label label-success">{{ category }}</label>&nbsp;&nbsp;</template>
      <template v-for="tag in tagList"><label class="label label-primary">{{ tag.tagName }}</label>&nbsp;&nbsp;</template>
      <button class="btn btn-warning btn-xs" @click="modifyArticle">编辑</button>&nbsp;
      <template v-if="this.$store.state.token"><button class="btn btn-danger btn-xs" @click="deleteArticle">删除</button></template>
    </header>
    &nbsp;
    <p v-html="markdown(content)" id="markdown-content"></p>

    <hr>
  </article>
  </div>

</template>

<script>
const markdown = require('../filters/index.js').markdown
import articleApi from '../api/article.js'
  export default{
    name: 'Article',
    data(){
      return{
        'id': '',
        'title': '',
        'created': '',
        'content': '',
        'lastModified': null,
        'tagList': [],
        'category': ''
      }
    },
    created(){
      this.fetchData();
    },
    methods: {
      markdown(content){
        return markdown(content);
      },
      fetchData(){
        articleApi.getArticle(this.$route.params.id).then(res => {
          console.log(res)
          if(res.data.success){
            if(res.data.article == null){
              this.title = '404 Not found!';
              return;
            }
            else{
              this.title = res.data.article.title;
            }
            this.id = res.data.article._id; //not res.data.id!!!
            this.title = res.data.article.title;
            this.content = res.data.article.content;
            this.created = res.data.article.created;
            this.lastModified = res.data.article.lastModified;
            this.tagList = res.data.article.tagList;
            this.category = res.data.article.category;
          }
        })
      },
      modifyArticle(){
        this.$router.push('/editor/'+ this.id);
      },
      deleteArticle(){
        this.$store.dispatch('deleteArticle', this.id);
        this.$router.push('/');
      }
    }
  }
</script>

