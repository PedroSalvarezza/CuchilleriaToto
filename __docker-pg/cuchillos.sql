-- Conectar a la base de datos 'cuchillos'
\c cuchillos;

-- Crear la tabla 'productos'
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    medidas VARCHAR(100),
    material VARCHAR(100),
    cabo VARCHAR(100),
    precio NUMERIC(10, 2)
);

-- Insertar 10 productos deportivos
INSERT INTO productos (nombre, medidas, material, cabo, precio) VALUES
('Cuchillo número 22', '20cm de hoja, 30cm en total', 'Acero Inoxidable', 'Quebracho', 250000.00),
('Cuchillo número 24', '25cm de hoja, 35cm en total', 'Acero Inoxidable', 'Aplique de Paraiso, Quebracho', 200000.00),
('Cuchillo número 25', '17cm de hoja, 27cm en total', 'Acero Inoxidable', 'Quebracho Blanco', 160000.00),
('Cuchillo número 26', '13cm de hoja, 26cm en total', 'Acero Inoxidable', 'Algarrobo', 100000.00),
('Cuchillo número 27', '17cm de hoja, 28cm en total', 'Acero Inoxidable', 'Quebracho', 160000.00),
('Cuchillo número 28', '14cm de hoja, 28cm en total', 'Acero Inoxidable', 'Paraiso', 120000.00);