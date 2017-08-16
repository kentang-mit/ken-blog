
let config = {
  app:{
    port: process.env.PORT || 3000,
  },
  mongodb: {
    url: 'mongodb://localhost:27017/ken-blog'
  },
  jwt: {
    secret: 'me'
  },
  admin: {
    user: 'admin',
    pwd: 'kentangsjtu'
  }
}

export default config;