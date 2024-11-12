import('./server.mjs')
.then(() => console.log('Server is running'))
.catch((err) => console.error('Error starting server:', err));