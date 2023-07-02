

const corsOptions = {
  origin: ['https://cadinov.onrender.com', 'https://www.cadinovtours.com', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

module.exports = corsOptions
