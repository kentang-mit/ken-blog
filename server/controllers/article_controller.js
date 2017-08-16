const mongoose = require('mongoose')
const Article = require('../models/article.js')
const Tag = require('../models/tag.js')

export async function createArticle(ctx){
    console.log(ctx.request.body);
    let title = ctx.request.body.title,
        content = ctx.request.body.content,
        created = new Date().toLocaleString(),
        tagList = ctx.request.body.tagList,
        lastModified = new Date().toLocaleString(),
        category = ctx.request.body.category,
        abstract;
    let abstract_end_pos = content.indexOf('<!--more-->');
    if(abstract_end_pos === -1){
      console.log('No abstract!');
      ctx.throw(401, 'Empty abstract error!')
    }
    abstract = content.slice(0, abstract_end_pos);
    const newArticle = new Article({
      title: title,
      content: content,
      created: created,
      lastModified: lastModified,
      tagList: tagList,
      category: category,
      abstract: abstract
    });
    let res = await newArticle.save().catch(err => {
      ctx.throw(500, err);
    });
    //don't forget to populate
    let createdArticle = await Article.populate(res, {path: 'tags'}, (err, res) => {
      if(err){
        ctx.throw(500, err);
      }
      createdArticle = res;
    }) 
    ctx.body = {
      success: true,
      article: createdArticle
    }
}

export async function modifyArticle(ctx){
    let id = ctx.params.id;
    let res = await Article.findByIdAndUpdate(id, {$set: ctx.request.body}).catch(err => {
      ctx.throw(500, err);
    })
    ctx.body = {
      success: true
    }
  }

export async function getArticle(ctx){
    let id = ctx.params.id;
    let article = await Article.findById(id).catch(err => {
      ctx.throw(500, err);
    })
    let foundArticle = await Article.populate(article, {path: 'tagList'}, (err, res) => {
      if(err){
        ctx.throw(500, err);
      }
      foundArticle = res;
    })
    ctx.body = {
      success: true,
      article: foundArticle
    }
  }

export async function deleteArticle(ctx){
    let id = ctx.params.id;
    let res = await Article.findByIdAndRemove(id).catch(err => {
      ctx.throw(500, err);
    })
    ctx.body = {
      success: true
    }
  }

export async function getAllArticles(ctx){
    let tags = ctx.query.tags,
        page = +ctx.query.page, //change into integer
        limit = +ctx.query.limit || 4,
        skip = 0,
        totalPageNum = 0,
        totalArticleNum = 0,
        tagArr,
        articleArr;
    //page: start from 1
    skip = (page-1)*limit;
    //no required tags
    if(tags == ''){
      articleArr = await Article.find()
      .sort({created: -1})
      .skip(skip)
      .limit(limit)
      .populate({path: 'tagList'})
      .catch(err => {
        ctx.throw(500, err);
      })
      ctx.body = {
        articleArr,
        success: true
      }
    }

    else{
      tagArr = tags.split(' ');
      articleArr = await Article.find({tags: {"$in": tagArr}})
      .sort({created: -1})
      .skip(skip)
      .limit(limit)
      .populate({path: 'tagList'})
      .catch(err => {
        ctx.throw(500, err);
      })
      ctx.body = {
        articleArr,
        success: true
      }
    }
    //console.log(articleArr)
  }