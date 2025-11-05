# 🌍 Indradhanu: AI-Driven Global Climate Resilience System (AICRS)

A unified AI-powered platform that bridges fragmented global data silos in Public Health, Marine Protection, and the Circular Economy to build climate resilience.

## 🚀 Features

### Core Engines

1. **Health-Climate Nexus Engine**
   - LSTM-based time-series forecasting
   - Predict and mitigate disease outbreaks linked to meteorological variations
   - Real-time health monitoring and alerts

2. **Marine Digital Twin**
   - Reinforcement Learning for marine ecosystem simulation
   - Biodiversity monitoring and conservation strategy evaluation
   - "What-if" scenario testing for marine policies

3. **Circular AI Optimizer**
   - Genetic Algorithms for waste stream optimization
   - Transform waste into sustainable resources
   - Promote circular economy practices

### Additional Features

- **Adaptive Policy Simulator** - Test interventions safely before implementation
- **Blockchain Data Integrity** - Hyperledger Fabric-based secure data sharing
- **Bias & Fairness Auditor** - Continuous monitoring for equitable outcomes
- **Real-time Data Ingestion** - IoT and satellite feed integration

## 🛠️ Tech Stack

### Frontend
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Chart.js / Recharts** - Data visualization
- **Axios** - API communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

### AI/ML Integration
- Python microservices (TensorFlow, LSTM, RL algorithms)
- REST API integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- npm or yarn

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Indradhanu
```

### 2. Install dependencies
```bash
npm run install-all
```

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` file with your actual configuration values.

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows (if installed as service)
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### 5. Run the application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/docs

## 📁 Project Structure

```
Indradhanu/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # State management
│   │   ├── utils/         # Utility functions
│   │   └── App.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── server.js         # Entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🎯 API Endpoints

### Health-Climate Nexus
- `GET /api/health/predictions` - Get disease outbreak predictions
- `POST /api/health/data` - Submit health data
- `GET /api/health/alerts` - Get active health alerts

### Marine Digital Twin
- `GET /api/marine/ecosystem` - Get ecosystem status
- `POST /api/marine/scenario` - Run scenario simulation
- `GET /api/marine/biodiversity` - Get biodiversity metrics

### Circular Economy
- `GET /api/circular/waste-streams` - Get waste stream data
- `POST /api/circular/optimize` - Run optimization algorithm
- `GET /api/circular/recommendations` - Get circular economy recommendations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🌟 UN SDG Impact

- **SDG 3**: Good Health and Well-being
- **SDG 12**: Responsible Consumption and Production
- **SDG 13**: Climate Action
- **SDG 14**: Life Below Water

## 📧 Contact

For questions and support, please open an issue in the repository.

---

Built with ❤️ for a sustainable future
