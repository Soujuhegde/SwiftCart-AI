# SwiftCart AI Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/swiftcart
   JWT_SECRET=your_jwt_secret_key
   ```

3. Run the server:
   ```bash
   npm run start
   # or for development
   npm run dev
   ```

## Folder Structure
- `src/config`: Configuration (DB, Env)
- `src/controllers`: Request logic
- `src/models`: Database schemas
- `src/routes`: API routes
- `src/middlewares`: Custom middlewares
