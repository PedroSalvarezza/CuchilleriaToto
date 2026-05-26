import pg from 'pg'

// clase Pool -> hacer consultas simples

const pool = new pg.Pool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    database: 'cuchillos',
    port: 5432
})

export default pool 