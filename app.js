const projectRoutes = require('./src/routes/projectRoutes');
const app = express();

// ...
app.use('/api/projects', projectRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
