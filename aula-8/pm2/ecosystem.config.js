/**
 * @type {import('pm2').StartOptions}
 */
module.exports = {
  apps: [
    {
      name: 'checkout',
      script: 'cd ../backend/checkout && npm start',
    },
    {
      name: 'catalog',
      script: 'cd ../backend/catalog && npm start',
    },
    {
      name: 'auth',
      script: 'cd ../backend/auth && npm start',
    },
    {
      name: 'freight',
      script: 'cd ../backend/freight && npm start',
    },
    {
      name: 'stock',
      script: 'cd ../backend/stock && npm start',
    },
  ],
}
