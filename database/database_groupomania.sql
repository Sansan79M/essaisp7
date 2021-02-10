-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 10 fév. 2021 à 12:55
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
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `content` text NOT NULL,
  `isSignaled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `content`, `isSignaled`, `createdAt`, `updatedAt`) VALUES
(1, 2, 1, 'Bonjour le premier.', 0, '2021-02-09 14:23:17', '2021-02-09 14:23:17'),
(2, 2, 3, 'Oui !', 0, '2021-02-09 14:28:15', '2021-02-09 14:28:15'),
(3, 1, 5, 'gfdgdfggdf gfdgdfgdfgdg', 1, '2021-02-10 11:10:12', '2021-02-10 11:11:15');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `isSignaled` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `description`, `isSignaled`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Bonjour, je suis le premier ?', 'Y a-t-il d\'autres collègues par ici ?', 0, '2021-02-09 14:21:31', '2021-02-09 14:21:41'),
(2, 2, 'Bonjour bienvenue !', 'Bienvenue sur notre nouveau réseau social interne GROUPOMANIA.', 0, '2021-02-09 14:23:04', '2021-02-09 14:23:04'),
(3, 3, 'Bonjour bonjour.', 'C\'est cool ce nouveau réseau social.', 0, '2021-02-09 14:24:31', '2021-02-09 14:24:31'),
(4, 2, 'Qui fait des crêpes cette semaine ?', 'Qui dans vos services vont faire des crêpes ?', 0, '2021-02-09 14:27:51', '2021-02-09 14:27:51'),
(5, 1, 'gdfgdfgd gfdgdf', 'gfddfgfd hdghfghfh', 1, '2021-02-10 11:10:04', '2021-02-10 11:11:11');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `service` text,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `service`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'test1', 'test1@test1.com', '$2b$10$U1jgAfq5INuNhs5Atxdz.Owre.ug4dZpttii8oeboM9TKWLQ4cnpG', 'test', 0, '2021-02-09 14:20:49', '2021-02-10 11:10:47'),
(2, 'Administrateur', 'test@test.com', '$2b$10$hA8dFjyl4gLnAo1owEXFDesK4NqQoaVDB36aGOaNIff5/yEgZ/NwW', 'Administrateur', 1, '2021-02-09 14:22:13', '2021-02-10 11:11:37'),
(3, 'Machin truc', 'test2@test2.com', '$2b$10$JIWKBeptr5kzdLyw5LHi8.f.L321PBWsB0rZUVw3AeRrBn9AWlTCq', 'magasinier', 0, '2021-02-09 14:23:53', '2021-02-09 14:24:51');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
