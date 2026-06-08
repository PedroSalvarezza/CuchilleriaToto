-- Conectar a la base de datos 'cuchillos'
\c cuchillos;

-- Crear la tabla 'productos'
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    medidas VARCHAR(100),
    material VARCHAR(100),
    cabo VARCHAR(100),
    precio NUMERIC(10, 2),
    imagen VARCHAR(255)
);


INSERT INTO productos (nombre, medidas, material, cabo, precio, imagen) VALUES
('Cuchillo número 39', '16cm de hoja, 32cm en total', 'Acero Inoxidable', 'Guayubira', 160000.00, 'Cuchillo N39.jpg'),
('Cuchillo número 41', '15cm de hoja, 28cm en total', 'Acero Inoxidable', 'Caranda', 130000.00, 'Cuchillo N41.jpg'),
('Cuchillo número 42', '12cm de hoja, 26cm en total', 'Acero Inoxidable', 'Paraiso', 120000.00, 'Cuchillo N42.jpg'),
('Cuchillo número 43', '14cm de hoja, 28cm en total', 'Acero Inoxidable', 'Guayacan', 130000.00, 'Cuchillo N43.jpg'),
('Cuchillo número 44', '18cm de hoja, 35cm en total', 'Acero Inoxidable', 'Quebracho', 200000.00, 'Cuchillo N44.jpg');



-- Tabla galeria (fotos de cuchillos ya hechos)
CREATE TABLE galeria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    imagen VARCHAR(255)
);