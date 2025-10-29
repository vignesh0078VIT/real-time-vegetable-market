# 🌱 Real-Time Vegetable Market

A full-stack real-time web application for a vegetable market with live updates, expiry tracking, and price comparison.

## 🚀 Features

- **Real-Time Updates**: Live price and inventory updates using Socket.IO
- **Expiry Tracking**: Visual indicators for expired and expiring soon products
- **Best Price Highlighting**: Automatic highlighting of lowest priced items
- **CRUD Operations**: Add, edit, and delete vegetables
- **User Authentication**: Simple login system
- **Responsive Design**: Works on desktop and mobile devices
- **Image Selection**: Dropdown to choose vegetable images

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **Socket.IO** for real-time communication
- **MongoDB** (configured for local development)
- **CORS** for cross-origin requests

### Frontend
- **React** with hooks
- **Socket.IO Client** for real-time updates
- **Axios** for API calls
- **CSS** for styling

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd vegetable-market
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Set up environment variables**
   - Copy `.env` file and update MongoDB URI if needed
   - Default: `mongodb://localhost:27017/vegetable-market`

5. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

6. **Start the application**
   ```bash
   # Start backend (port 4000)
   npm start

   # In another terminal, start frontend (port 3000)
   cd client
   npm start
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## 🔧 API Endpoints

- `GET /api/vegetables` - Fetch all vegetables
- `POST /api/vegetables` - Add new vegetable
- `PUT /api/vegetables/:id` - Update vegetable
- `DELETE /api/vegetables/:id` - Delete vegetable

## 🎨 Features in Detail

### Expiry Tracking
- **Expired**: Red border, "EXPIRED" text, reduced opacity
- **Expiring Soon**: Orange border, countdown (≤3 days)
- **Normal**: Standard display with expiry date

### Best Price Highlighting
- Golden border and "🏆 BEST PRICE" badge
- Automatic sorting by price (lowest first)

### Real-Time Updates
- Instant updates across all connected clients
- No page refresh needed

## 📱 Screenshots

(Add screenshots of your application here)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Unsplash for vegetable images
- React and Socket.IO communities
