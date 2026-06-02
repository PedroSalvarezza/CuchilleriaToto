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
('Cuchillo número 22', '20cm de hoja, 30cm en total', 'Acero Inoxidable', 'Quebracho', 250000.00, 'Cuchillo N22 con funda.jpg'),
('Cuchillo número 23', '15cm de hoja, 25cm en total', 'Acero Inoxidable', 'Paraiso', 150000.00, 'Cuchillo N22 con funda.jpg'),
('Cuchillo número 24', '25cm de hoja, 35cm en total', 'Acero Inoxidable', 'Aplique de Paraiso, Quebracho', 200000.00, 'Cuchillo N24 sin funda acostado.jpg'),
('Cuchillo número 25', '17cm de hoja, 27cm en total', 'Acero Inoxidable', 'Quebracho Blanco', 160000.00, 'Cuchillo N25 de costado derecha.jpg'),
('Cuchillo número 26', '13cm de hoja, 26cm en total', 'Acero Inoxidable', 'Algarrobo', 100000.00, 'Cuchillo N26 de costado derecha.jpg'),
('Cuchillo número 27', '17cm de hoja, 28cm en total', 'Acero Inoxidable', 'Quebracho', 160000.00, 'Cuchillo N27 acostado.jpg'),
('Cuchillo número 28', '14cm de hoja, 28cm en total', 'Acero Inoxidable', 'Paraiso', 120000.00, 'Cuchillo N28 de costdo.jpg'),
('Cuchillo número 29', '18cm de hoja, 30cm en total', 'Acero Inoxidable', 'Quebracho Blanco', 180000.00, 'Cuchillo N29.jpg'),
('Cuchillo número 30', '20cm de hoja, 32cm en total', 'Acero Inoxidable', 'Algarrobo', 220000.00, 'Cuchillo N30.jpg'),
('Cuchillo número 31', '16cm de hoja, 27cm en total', 'Acero Inoxidable', 'Paraiso', 140000.00, 'Cuchillo N31.jpg');


-- Tabla galeria (fotos de cuchillos ya hechos)
CREATE TABLE galeria (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    imagen VARCHAR(255)
);