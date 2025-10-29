const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// In-memory storage for vegetables (simple, no database)
let vegetables = [
  { id: 1, name: 'Tomato', price: 25, freshness: 'High', expiryDate: '2025-11-02', deliveryTime: '2 hours', location: 'Delhi Market', image: 'https://images.unsplash.com/photo-1561136594-7f6846a1cd25?w=300&h=200&fit=crop' },
  { id: 2, name: 'Carrot', price: 22, freshness: 'High', expiryDate: '2025-11-05', deliveryTime: '1 hour', location: 'Mumbai Market', image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=300&h=200&fit=crop' },
  { id: 3, name: 'Spinach', price: 18, freshness: 'Medium', expiryDate: '2025-11-03', deliveryTime: '3 hours', location: 'Bangalore Market', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop' },
  { id: 4, name: 'Potato', price: 20, freshness: 'High', expiryDate: '2025-12-01', deliveryTime: '2 hours', location: 'Chennai Market', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop' },
  { id: 5, name: 'Onion', price: 35, freshness: 'High', expiryDate: '2025-11-15', deliveryTime: '1 hour', location: 'Delhi Market', image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=300&h=200&fit=crop' },
  { id: 6, name: 'Broccoli', price: 45, freshness: 'Medium', expiryDate: '2025-11-04', deliveryTime: '4 hours', location: 'Pune Market', image: 'https://images.unsplash.com/photo-1459411621453-7e7709e8a887?w=300&h=200&fit=crop' },
  { id: 7, name: 'Cucumber', price: 15, freshness: 'High', expiryDate: '2025-11-06', deliveryTime: '2 hours', location: 'Hyderabad Market', image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f30a3?w=300&h=200&fit=crop' },
  { id: 8, name: 'Bell Pepper', price: 30, freshness: 'High', expiryDate: '2025-11-08', deliveryTime: '3 hours', location: 'Kolkata Market', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=200&fit=crop' },
  { id: 9, name: 'Lettuce', price: 28, freshness: 'Medium', expiryDate: '2025-11-05', deliveryTime: '2 hours', location: 'Ahmedabad Market', image: 'https://images.unsplash.com/photo-1556801712-76c8eb07bbc9?w=300&h=200&fit=crop' },
  { id: 10, name: 'Eggplant', price: 32, freshness: 'High', expiryDate: '2025-11-10', deliveryTime: '2 hours', location: 'Jaipur Market', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=200&fit=crop' }
];
let nextId = 11;

// Routes
app.get('/api/vegetables', (req, res) => {
  res.json(vegetables);
});

app.post('/api/vegetables', (req, res) => {
  const vegetable = { id: nextId++, ...req.body };
  vegetables.push(vegetable);
  io.emit('vegetableAdded', vegetable);
  res.status(201).json(vegetable);
});

app.put('/api/vegetables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = vegetables.findIndex(v => v.id === id);
  if (index !== -1) {
    vegetables[index] = { ...vegetables[index], ...req.body };
    io.emit('vegetableUpdated', vegetables[index]);
    res.json(vegetables[index]);
  } else {
    res.status(404).json({ message: 'Vegetable not found' });
  }
});

app.delete('/api/vegetables/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = vegetables.findIndex(v => v.id === id);
  if (index !== -1) {
    vegetables.splice(index, 1);
    io.emit('vegetableDeleted', id);
    res.json({ message: 'Vegetable deleted' });
  } else {
    res.status(404).json({ message: 'Vegetable not found' });
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
