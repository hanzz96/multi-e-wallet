import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to add API documentation metadata to responses
 * This helps with API versioning and documentation tracking
 */
export const apiDocsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Add API documentation headers
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-API-Documentation', '/api-docs');
  
  // Add documentation link to response body for development
  if (process.env.NODE_ENV === 'development') {
    const originalSend = res.send;
    res.send = function(body: any) {
      if (typeof body === 'string') {
        try {
          const parsed = JSON.parse(body);
          parsed._docs = {
            apiVersion: '1.0.0',
            documentationUrl: `${req.protocol}://${req.get('host')}/api-docs`,
            timestamp: new Date().toISOString()
          };
          return originalSend.call(this, JSON.stringify(parsed));
        } catch (e) {
          // If body is not JSON, send as is
          return originalSend.call(this, body);
        }
      } else if (typeof body === 'object') {
        body._docs = {
          apiVersion: '1.0.0',
          documentationUrl: `${req.protocol}://${req.get('host')}/api-docs`,
          timestamp: new Date().toISOString()
        };
        return originalSend.call(this, body);
      }
      return originalSend.call(this, body);
    };
  }
  
  next();
};

/**
 * Middleware to log API usage for documentation purposes
 */
export const apiUsageLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logData = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString()
    };
    
    // Log API usage (you can extend this to store in database or analytics)
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 API Usage:`, logData);
    }
  });
  
  next();
}; 