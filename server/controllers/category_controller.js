import mongoose from 'mongoose'
const Category = require('../models/category.js')

export async function createCategory(ctx){
  let categoryName = ctx.request.body.categoryName,
    created = new Date().toLocaleString(),
    lastModified = new Date().toLocaleString();

  const newCategory = new Category({
    categoryName: categoryName,
    created: created,
    lastModified: lastModified
  })

  let foundCategory = await Category.findOne({categoryName: categoryName}).catch(err => {
    ctx.throw(500, err);
  });

  if(foundCategory !== null){
    ctx.body = {
      success: true,
      createdCategory: foundCategory
    }
  } else {
    let res = await newCategory.save().catch(err => {
      ctx.throw(500, err);
    });
    ctx.body = {
      success: true,
      createdCategory: res
    }
  }
}

export async function modifyCategory(ctx){
  let id = ctx.params.id;
  let res = await Category.findByIdAndUpdate(id, {$set: ctx.request.body}).catch(err => {
    ctx.throw(500, err);
  })
  ctx.body = {
    success: true,
  }
}

export async function deleteCategory(ctx){
  let id = ctx.params.id;
  let res = await Category.findByIdAndRemove(id).catch(err => {
    ctx.throw(500, err);
  })
  ctx.body = {
    success: true
  }
}

export async function getAllCategories(ctx){
  let categoryList = await Category.find().catch(err => {
    ctx.throw(500, err);
  })
  ctx.body = {
    categoryList: categoryList,
    success: true
  }
}