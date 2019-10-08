module.exports = {
  host: process.env.RDS_HOSTNAME || '127.0.0.1', // '172.22.0.5' ,
  port: process.env.RDS_PORT || '3306',
  user: process.env.RDS_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || 'password',
  database: 'reviews'
};

// other mysql instance: 'reviews.ccm1cvmgiugc.us-east-2.rds.amazonaws.com'