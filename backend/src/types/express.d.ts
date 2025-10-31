/**
 * Express type extensions
 * Extends Express Request/Response types with custom properties
 */

declare global {
  namespace Express {
    interface Request {
      // Add custom properties to Request here
      // Example: userId?: string;
    }

    interface Response {
      // Add custom properties to Response here if needed
    }
  }
}

export {};
