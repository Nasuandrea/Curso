-- Adminer 5.4.1 MariaDB 10.11.13-MariaDB-0ubuntu0.24.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `asignaturas`;
CREATE TABLE `asignaturas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `asignaturas` (`id`, `nombre`, `codigo`) VALUES
(1,	'Entorno Cliente',	'MP0612'),
(2,	'Lengua Española',	'MP0001'),
(3,	'Matemáticas',	'MP0002');

DROP TABLE IF EXISTS `docentes`;
CREATE TABLE `docentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `especialidad` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `docentes` (`id`, `nombre`, `apellido`, `especialidad`) VALUES
(1,	'Daisy',	'Ramírez',	'Desarrollo Web'),
(2,	'Maria',	'Perez',	'Matemáticas'),
(3,	'Pedro',	'Gonzalez',	'Lengua Española');

DROP TABLE IF EXISTS `estudiantes`;
CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `edad` int(11) NOT NULL,
  `dni` varchar(50) NOT NULL,
  `curso` varchar(50) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `estudiantes` (`id`, `nombre`, `apellido`, `edad`, `dni`, `curso`, `activo`) VALUES
(1,	'Maria',	'Fernandez',	31,	'123456780',	'TecWeb',	1);

-- 2025-11-27 12:32:55 UTC