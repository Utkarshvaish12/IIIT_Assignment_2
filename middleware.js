const validateRequest = (req, res, next) => {
    if (!req.body || !req.body.customer_name) {
      return res.status(400).json({ error: 'Bad Request: Customer name is required' });
    }
    next();
  };
  
  const logRequests = (req, res, next) => {
    // Logging details of each incoming request
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.path}`);
    console.log('Request Body:', req.body);
    console.log('Request Query:', req.query);
    console.log('Request Params:', req.params);
  
    next();
  };
  
  module.exports = { validateRequest, logRequests };
  