# 💬 Review Manager

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-v16+-green.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-100%25-yellow.svg)

A comprehensive opinion management system similar to Facebook posts, with specific functionalities focused on user interaction and expression of opinions.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Opinion Publishing**: Create, edit, and delete opinion posts
- **Interaction System**: Like, comment, and share opinions
- **User Profiles**: Customizable user profiles with activity history
- **Notifications**: Real-time notifications for interactions
- **Search Functionality**: Find opinions by keywords, users, or topics
- **Moderation Tools**: Flag inappropriate content and user management
- **Privacy Settings**: Control who can see and interact with your opinions
- **Analytics Dashboard**: Track engagement metrics for your posts
- **Responsive Design**: Works seamlessly across all devices

## 🛠️ Technologies Used

- **Node.js**: Server-side JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **JWT**: JSON Web Tokens for secure authentication
- **Socket.io**: Real-time event-based communication
- **React/Vue/Angular**: Frontend framework (if applicable)
- **REST API**: Backend architecture for data exchange

## 🚀 Installation and Setup

### 1. Clone the repository
```bash
git clone https://github.com/Elux-2021572/Review_manager.git
cd Review_manager
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory with the following content:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/review_manager
JWT_SECRET=your_super_secure_secret
```

> **Note:** Change the values according to your configuration.

### 4. Run the server
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📌 Available Endpoints

### Authentication
- **Register User:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Logout:** `POST /api/auth/logout`
- **Refresh Token:** `POST /api/auth/refresh-token`

### User Management
- **Get User Profile:** `GET /api/users/:id`
- **Update Profile:** `PUT /api/users/:id`
- **Delete Account:** `DELETE /api/users/:id`
- **Get User Activity:** `GET /api/users/:id/activity`

### Opinion Management
- **Create Opinion:** `POST /api/opinions`
- **Get All Opinions:** `GET /api/opinions`
- **Get Opinion by ID:** `GET /api/opinions/:id`
- **Update Opinion:** `PUT /api/opinions/:id`
- **Delete Opinion:** `DELETE /api/opinions/:id`
- **Like Opinion:** `POST /api/opinions/:id/like`
- **Unlike Opinion:** `DELETE /api/opinions/:id/like`

### Comments
- **Add Comment:** `POST /api/opinions/:id/comments`
- **Get Comments:** `GET /api/opinions/:id/comments`
- **Update Comment:** `PUT /api/opinions/:id/comments/:commentId`
- **Delete Comment:** `DELETE /api/opinions/:id/comments/:commentId`

## 🔑 Using JWT Tokens
Authenticated routes require a valid JWT token in the request headers:
```json
{
  "Authorization": "Bearer <your_token_here>"
}
```

## 📖 Usage Examples

### Creating a new opinion
```javascript
// Example using fetch API
fetch('http://localhost:3000/api/opinions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your_token_here'
  },
  body: JSON.stringify({
    content: 'This is my first opinion post!',
    visibility: 'public',
    tags: ['thoughts', 'firstpost']
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

### Interacting with an opinion
```javascript
// Like an opinion
fetch('http://localhost:3000/api/opinions/opinion_id_here/like', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer your_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- **Elux-2021572** - [GitHub Profile](https://github.com/Elux-2021572)

---

Made with ❤️ by Elux-2021572
