-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 05 fév. 2021 à 09:27
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `userId`, `postId`, `content`, `isSignaled`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'Y a-t-il quelqu\'un d\'autres ?', 0, '2021-02-03 12:28:42', '2021-02-03 12:28:42'),
(2, 2, 1, 'Bonjour the first', 0, '2021-02-03 12:31:00', '2021-02-03 14:27:27'),
(3, 3, 1, 'Bonjour à toi aussi !', 0, '2021-02-03 12:32:37', '2021-02-03 14:27:50'),
(4, 3, 2, 'Merci, c\'est cool !', 0, '2021-02-03 12:32:57', '2021-02-03 14:22:07'),
(5, 1, 3, 'On va y venir je crois.', 0, '2021-02-03 12:34:12', '2021-02-03 12:34:12'),
(6, 4, 4, 'gsdfdgdfgdf', 1, '2021-02-03 12:35:18', '2021-02-03 14:30:19'),
(7, 4, 4, 'fdgdfgdfgdfg', 1, '2021-02-03 12:35:23', '2021-02-03 14:30:02');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `description`, `isSignaled`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Bonjour ', 'Je suis le premier inscrit !', 0, '2021-02-03 12:28:13', '2021-02-03 14:15:29'),
(2, 2, 'Bienvenue chez groupomania !', 'Nous vous souhaitons la bienvenue sur notre réseau social interne.', 0, '2021-02-03 12:30:31', '2021-02-03 12:30:31'),
(3, 3, 'Confinement ou pas ?', 'Qu\'en pensez-vous ?', 0, '2021-02-03 12:33:41', '2021-02-03 12:33:41'),
(4, 4, 'gfsdgdfgd', 'gdfgdfgdfg', 1, '2021-02-03 12:35:14', '2021-02-05 10:08:33'),
(7, 2, 'gdgdfg', 'gfdgdfgfdg', 1, '2021-02-03 14:18:50', '2021-02-03 14:29:52');

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `service`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'test1', 'test1@test1.com', '$2b$10$6bKwmOI/IcCf319XtxI1K.D9LjTi5IO9NgWEKhn1q/4sV53Byxe5C', NULL, 0, '2021-02-03 12:27:35', '2021-02-03 12:27:35'),
(2, 'Administrateur', 'test@test.com', '$2b$10$aNRLQosRBUPFX8SSZPWp/OCzLTyf4EZcBzfpoerzSVEgCniS5YLcS', 'Gestionnaire commerciale - Administrateur', 1, '2021-02-03 12:29:21', '2021-02-03 12:37:12'),
(3, 'Machin truc', 'test2@test2.com', '$2b$10$ZfnkoAMhf6NBE.1EfkK/UO.ZZpAIrBfeb23.iF29yyFqgsPOWXciK', NULL, 0, '2021-02-03 12:31:57', '2021-02-03 12:31:57'),
(4, 'Bidule chouette', 'test3@test3.com', '$2b$10$uM9BJKDfY2luF8J/AplSaujmZ/V23LrVaIWUTkSMnGtSfTaFcMTUK', NULL, 0, '2021-02-03 12:34:46', '2021-02-03 12:34:46');

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
