const config = {
    server: {
        port: '3000',
        host: 'localhost',
        mongourl: 'mongodb://localhost:27017/kuber'
    },
    coordinates_server: {
        port: '5000',
        host: 'localhost'
    },
    authentication: {
        secret: 'Qd4M2w1IlZJxZGz2MUNamg9QgNP3lTDe4pedK68XZLNWY5uXMkHyPJeAtHlTNzOAB6AaWb58ZXBpufEkPqVgKyXKBHc7APAgMj2s77WDIrlkdxX1AtylYWpslgiiGRni6RHlMC5SHhzt2tVxSJ-ld6lbeET8-k0AR2u6eo4xyAb6_CHvnZhDr1dl32xzzw_XvQFirOyTFHNVthWQ56RRHqLiBkpM-uP1hd-VJTNI1nplb_E_1hUVLRcrja07L1cKuRilcA0YqD-mOd9MNaXXGEO2Q6t-OGZVVJUq1bZWSiT5IA7IQgjlxkgs3XBvLNZ_zLAEcCNLTyS5jR7-z9OLpQ',
        algorithms: ['HS256'],
        expiresIn: '24h'
    },
    api: {
        endpoint: {
            'authenticate': '/api/authenticate',
            'validate': '/api/validate',
            'trips': '/api/trips',
            'coordinates': '/api/coordinates',
            'tripPositionTracking': '/api/trackit/trip_coordinates',
            'webhook': '/api/webhooks/notifier'
        }
    },
    simulation: {
        repeat_every: 10000
    }
}

export { config };
