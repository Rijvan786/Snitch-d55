import  app from "./src/app.js"; 
import  connectDB from './src/config/database.js';




const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Server is running on port 3000');
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();