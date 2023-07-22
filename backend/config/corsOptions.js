

const corsOptions = {
  origin: ['https://cadinov-997l.onrender.com', 'https://www.cadinovtours.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

module.exports = corsOptions
