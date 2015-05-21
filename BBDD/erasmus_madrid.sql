-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-05-2015 a las 23:10:52
-- Versión del servidor: 5.6.20
-- Versión de PHP: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `erasmus_madrid`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id_event` int(10) NOT NULL,
  `title` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `category` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(600) COLLATE utf8_spanish_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `date` datetime NOT NULL,
  `comment` varchar(150) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `event`
--

INSERT INTO `event` (`id_event`, `title`, `category`, `description`, `address`, `date`, `comment`) VALUES
(1, 'BeerPong Tournament', 'Vida nocturna', 'El BEER PONG es un juego de beber de origen norteamericano en el que los jugadores tratan de encestar desde el extremo de una mesa, con pelotas de ping-pong en vasos llenos de cerveza. Se juega por equipos formados por dos personas y 6 vasos dispuestos de forma triangular. Cada martes os invitamos al TORNEO de BEER PONG y a su animada fiesta universitaria para desafiar otros estudiantes ¡y ganar premios y sorpresas!', 'C/ Espoz y Mina 20', '2015-09-14 21:00:00', '¡No te pierdas la mejor fiesta de Madrid!'),
(2, 'Erasmus Party', 'Vida nocturna', 'Ven a la fiesta Erasmus más diverdida de Madrid, todos los lunes y miércoles en la sala Joy, Madrid... nunca duerme.', 'C/ Calle del Arenal, 11', '2015-09-23 23:00:00', '¡Ven a la mejor fiesta Erasmus de Madrid!'),
(3, 'Conoce Madrid', 'Turismo', 'Disfruta de una visita guiada gratuita por el Madrid de los Austrias y los Borbones, en castellano y en inglés, todos los sábados y domingos a las 11 frente al oso y el madroño.\r\n\r\nEnjoy a free tour around the royal Madrid, in English and Spanish, every saturday and sanday at 11 in front of the oso y el madroño statue.', 'C/ Plaza de la Puerta del Sol, s/n', '2015-10-20 12:00:00', ''),
(4, 'Visita Aranjuez', 'Turismo', 'Seguimos conociendo los alrededores más bonitos de Madrid, en esta ocasión visita guiada a Aranjuez y Chinchón, Sábado 11 de Abril, 19 euros transporte incluido, quedamos a las 9:00 en la estación de Atocha.', 'C/ Plaza de la Constitución, s/n', '2015-10-22 11:00:00', '¡La alianza de paisajes culturales patrimonio de la humanidad se reúne en Aranjuez!'),
(5, 'Bravas y Cerves', 'Gastronomía', 'Disfruta de la tapa más famosa de Madrid acompañada de otros estudiantes de Erasmus con los que podrás practicar el Castellano y otros idiomas.', 'C/ RD Valencia 16', '2015-10-08 19:00:00', '¡Disfruta de las mejores raciones!'),
(6, 'La Sureña', 'Gastronomía', 'Decoración marinera, fritura de pescado, cubos de cerveza y tapas españolas en tabernas de estilo andaluz.', ' C/ Cava Baja, 15', '2015-11-05 18:00:00', ''),
(7, 'Visita al Museo del Prado', 'Turismo', 'El Museo Nacional del Prado preside uno de los itinerarios turísticos más visitados de la capital: el Paseo del Arte. Además de Las meninas de Velázquez y de Los fusilamientos del 3 de mayo de Goya, en sus salas pueden verse obras maestras de las escuelas española, italiana y flamenca. El Prado cuenta con una valiosa colección de 8.600 cuadros y más de 700 esculturas. Es recomendable consultar una guía y preparar la visita antes de entrar en el museo.', 'Paseo del Prado, s/n', '2015-09-16 17:00:00', '¡El Museo del Prado tiene la colección de pintura española más completa del mundo!'),
(8, 'Templo de Debod', 'Turismo', 'Se trata de un templo egipcio del siglo II a. d C instalado en el Parque del Cuartel de la Montaña, cerca de la Plaza de España. El templo fue donado a España por el gobierno egipcio para evitar que quedara inundado tras la construcción de la gran presa de Asuán.', 'Calle Ferraz, 1', '2015-11-17 13:00:00', '¡Ven a ver el templo Egipcio!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) NOT NULL,
  `name_user` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `date_birth` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
 ADD PRIMARY KEY (`id_event`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
 ADD PRIMARY KEY (`id_user`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
