const winston = require('winston');

//enumerate errors and APi errors and assign them to info logging level
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

//create a custome winston logger object
const logger = winston.createLogger({
  level: process.env.DEPLOY_ENV === 'dev' ? 'debug' : 'info',
  format: winston.format.combine(
    enumerateErrorFormat(),
    process.env.DEPLOY_ENV === 'dev' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }), 
    winston.format.splat(),
    winston.format.simple(),
    winston.format.printf(({ level, message, timestamp }) => `${timestamp} | ${level} | ${message}`)
  ),
  defaultMeta: { service: process.env.SERVICE_NAME },
  
  //TODO: add logging to file in production  environment
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});

module.exports = logger;