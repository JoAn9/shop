module.exports = {
  db:
    'mongodb+srv://admin:bLVo4YiGlrziTBK8@cluster0-msj4i.mongodb.net/test?retryWrites=true&w=majority',
  jwtSecret: 'somethingsecret',
  keySession: ['pampampam'],
  maxAgeSession: 24 * 60 * 60 * 1000,
};
