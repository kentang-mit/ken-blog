import mongoose from 'mongoose'
const Tag = require('../models/tag.js')

export async function createTag(ctx){
  let tagName = ctx.request.body.tagName,
        created = new Date(new Date().getTime() + 28800000),
        lastModified = new Date(new Date().getTime() + 28800000);
    const newTag = new Tag({
      tagName: tagName,
      created: created,
      lastModified: lastModified
    })
    let foundTag = await Tag.findOne({tagName: tagName}).catch(err =>{
      ctx.throw(500, err);
    })
    if(foundTag !== null){
      ctx.body = {
        success: true,
        createdTag: foundTag
      }
    } else{
      let res = await newTag.save().catch(err => {
        ctx.throw(500, err);
      })
      ctx.body = {
        success: true,
        createdTag: res
      }
    }
}

export async function modifyTag(ctx){
  let id = ctx.params.id;
    let res = await Tag.findByIdAndUpdate(id, {$set: ctx.request.body}).catch(err => {
      ctx.throw(500, err);
    })
    ctx.body = {
      success: true
    }
}

export async function deleteTag(ctx){
  let id = ctx.params.id;
    let res = await Tag.findByIdAndRemove(id).catch(err => {
      ctx.throw(500, err);
    })
    ctx.body = {
      success: true
    }
}

export async function getAllTags(ctx){
  let tagList = await Tag.find().catch(err => {
      ctx.throw(500, err);
    });
    ctx.body = {
      tagList,
      success: true
    }
}