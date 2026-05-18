# Development Guide

This document provides guidelines for developing SellYou.

## Starting the Server

### First time setup:
```bash
npm install
```

### Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

### Development mode (with auto-reload):
```bash
npm run dev
```

This uses nodemon to automatically restart the server when you make changes.

## Project Structure

```
sellyou/
├── backend/
│   ├── server.js          # Main server file
│   ├── routes/            # API endpoints
│   ├── controllers/       # Business logic
│   └── models/            # Database models
├── frontend/
│   ├── index.html         # Main page
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript
├── database/              # Database files
├── package.json           # Project dependencies
└── README.md              # Project overview
```

## Making Changes

1. Create a new branch: `git checkout -b feature/your-feature-name`
2. Make your changes
3. Test your changes: `npm start` or `npm run dev`
4. Commit your changes: `git add . && git commit -m "Your commit message"`
5. Push to GitHub: `git push origin feature/your-feature-name`
6. Create a Pull Request on GitHub

## Testing the API

### Using curl (command line):
```bash
curl http://localhost:3001/
curl http://localhost:3001/api/health
```

### Using Postman:
1. Open Postman
2. Create a new GET request
3. Enter the URL: `http://localhost:3001/`
4. Click Send

## Common Issues

### Port already in use
If you get an error saying port 3001 is already in use, change the PORT in `.env`:
```
PORT=3002
```

### npm command not found
Make sure Node.js is installed correctly. Run: `node --version`

### Module not found
Run `npm install` again to make sure all dependencies are installed.

## Next Steps

Check GitHub Issues to see what features to build next!
