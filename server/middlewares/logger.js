import { v4 as uuidv4 } from 'uuid';

const logger = (req, res, next) => {
  req.id = uuidv4();
  const { method, url, headers, body } = req;
  const logMessage = {
    id: req.id,
    method,
    url,
    headers,
    body,
    timestamp: new Date().toISOString(),
  };
  console.log(JSON.stringify(logMessage, null, 2));
  next();
};

export default logger;
