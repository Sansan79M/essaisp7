-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 22 déc. 2020 à 16:44
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `database_groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `postId` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `content`, `createdAt`, `updatedAt`) VALUES
(1, '1', '1', 'gfddf', '2020-12-21 15:03:37', '2020-12-21 15:03:37'),
(2, '1', '1', 'fgshfshf', '2020-12-21 15:11:21', '2020-12-21 15:11:21'),
(3, '1', '1', 'fgshfshf', '2020-12-21 15:12:51', '2020-12-21 15:12:51'),
(4, '1', '1', 'dggdf', '2020-12-21 15:13:02', '2020-12-21 15:13:02'),
(5, '1', '1', 'salut bruno', '2020-12-21 15:16:02', '2020-12-21 15:16:02'),
(6, '1', '1', 'dgdfgd', '2020-12-21 16:24:08', '2020-12-21 16:24:08'),
(7, '1', '1', 'Salut ça va ?', '2020-12-21 18:27:37', '2020-12-21 18:27:37'),
(8, '2', '2', 'je commente ton message', '2020-12-22 10:38:37', '2020-12-22 10:38:37'),
(9, '2', '2', 'Bonjour ça va bien ?', '2020-12-22 11:00:16', '2020-12-22 11:00:16'),
(10, '2', '4', 'hello', '2020-12-22 13:59:58', '2020-12-22 13:59:58'),
(11, '2', '4', 'ça va', '2020-12-22 14:27:32', '2020-12-22 14:27:32'),
(12, '2', '4', 'ça va bien !', '2020-12-22 14:28:27', '2020-12-22 14:28:27'),
(13, '2', '4', 'bonjour', '2020-12-22 14:29:13', '2020-12-22 14:29:13');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'Salut !', 'Bienvenue sur le GSN.\nPour communiquer plus facilement entre salariés.', '2020-12-19 18:30:10', '2020-12-19 18:30:10'),
(2, '1', 'Message du jour !', 'Travailler avec une attelle !', '2020-12-21 10:45:45', '2020-12-21 10:45:45'),
(3, '2', 'message du profil 2', 'message du profil 2', '2020-12-22 10:37:33', '2020-12-22 10:37:33'),
(4, '2', 'message 78', 'message 78\nmessage 78', '2020-12-22 13:59:48', '2020-12-22 13:59:48');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `bio`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Machin truc', 'test1@test1.com', '$2b$10$XONSpDcwXRSdYih.QiBbt.EfeXIuBADxqDuyI5rAGE4tEkhlTUL..', NULL, 0, '2020-12-19 18:28:09', '2020-12-19 18:28:09'),
(2, 'hello world', 'test2@test2.com', '$2b$10$sA.Nr64q0FHIQjRuh6EWvu8hI3KeFyh0l2jRMe3LcMtcC8KZ61wBC', NULL, 0, '2020-12-22 10:36:10', '2020-12-22 10:36:10');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
