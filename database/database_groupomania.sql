-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 17 déc. 2020 à 12:32
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
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `userId`, `title`, `description`, `media`, `likes`, `createdAt`, `updatedAt`) VALUES
(1, '2', 'Message 1', 'Message 1', NULL, NULL, '2020-12-01 15:58:28', '2020-12-01 15:58:28'),
(5, '2', 'Message 5', 'Message 5', NULL, NULL, '2020-12-01 16:01:30', '2020-12-01 16:01:30'),
(13, '2', 'Message du jour', 'Message du jour', NULL, NULL, '2020-12-02 07:43:58', '2020-12-02 07:43:58'),
(61, '2', 'message11', 'message11', NULL, NULL, '2020-12-03 13:10:24', '2020-12-03 13:10:24'),
(62, '2', 'message12', 'message12', NULL, NULL, '2020-12-03 13:39:41', '2020-12-03 13:39:41'),
(71, '1', 'message14', 'message14', NULL, NULL, '2020-12-04 08:40:38', '2020-12-04 08:40:38'),
(74, '1', 'message 189', 'message 189', NULL, NULL, '2020-12-04 18:19:37', '2020-12-04 18:19:37'),
(75, '1', 'message18', 'message18', NULL, NULL, '2020-12-07 09:35:30', '2020-12-07 09:35:30'),
(76, '1', 'message19', 'message19', NULL, NULL, '2020-12-07 09:40:02', '2020-12-07 09:40:02'),
(78, '1', 'message98', 'message98', NULL, NULL, '2020-12-08 11:58:29', '2020-12-08 11:58:29'),
(79, '2', 'message 222', 'message 222', NULL, NULL, '2020-12-16 07:59:53', '2020-12-16 07:59:53'),
(80, '6', 'message 333', 'message 333', NULL, NULL, '2020-12-16 09:54:48', '2020-12-16 09:54:48'),
(81, '6', 'message 33', 'message 33', NULL, NULL, '2020-12-16 10:13:21', '2020-12-16 10:13:21'),
(82, '1', 'message88', 'message88', NULL, NULL, '2020-12-16 14:24:22', '2020-12-16 14:24:22'),
(83, '2', 'message 72', 'message 72', NULL, NULL, '2020-12-16 18:15:04', '2020-12-16 18:15:04'),
(84, '2', 'message 73', 'message 73', NULL, NULL, '2020-12-16 18:15:27', '2020-12-16 18:15:27'),
(85, '2', 'message 74', 'message 74', NULL, NULL, '2020-12-16 18:15:53', '2020-12-16 18:15:53'),
(86, '3', 'message78', 'message78', NULL, NULL, '2020-12-17 09:21:38', '2020-12-17 09:21:38'),
(87, '3', 'fdsfd', 'fdsfsdfsd', NULL, NULL, '2020-12-17 09:25:59', '2020-12-17 09:25:59'),
(88, '8', 'message test8', 'message test8', NULL, NULL, '2020-12-17 10:27:08', '2020-12-17 10:27:08'),
(89, '8', 'message esssais model', 'message esssais model', NULL, NULL, '2020-12-17 10:31:16', '2020-12-17 10:31:16'),
(90, '8', 'autre message', 'autre message', NULL, NULL, '2020-12-17 10:34:36', '2020-12-17 10:34:36'),
(91, '8', 'gdfgdg', 'gfdgfgdf', NULL, NULL, '2020-12-17 10:36:30', '2020-12-17 10:36:30');

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
  `service` varchar(255) DEFAULT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `face` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `service`, `bio`, `face`, `createdAt`, `updatedAt`) VALUES
(1, 'test1', 'test1@test1.com', '$2b$10$sZa4lcxwRazSLUmiMMK9Z.k1AewmmzFogU4e05eKG3IRW6WixQxkO', NULL, NULL, NULL, '2020-12-01 15:58:05', '2020-12-01 15:58:05'),
(2, 'test2', 'test2@test2.com', '$2b$10$ynjQ8SxLKfarf9swquAKI.MeFAR8fRz709UkEz0DnVpd07OpNaVoq', NULL, NULL, NULL, '2020-12-01 15:59:56', '2020-12-01 15:59:56'),
(3, 'test3', 'test3@test3.com', '$2b$10$p2l9gpJOAXQTG3QdtJAfCO6J6A1hiEQDdv.keixDDewq31pbrQ3pO', NULL, NULL, NULL, '2020-12-04 17:47:57', '2020-12-04 17:47:57'),
(4, 'test4', 'test4@test4.com', '$2b$10$G0IiJX6D1iDOx0TpTzOm9uyNdgqiWk0s98C.LdxxSBTBlAIKOSDYi', NULL, NULL, NULL, '2020-12-14 07:45:37', '2020-12-14 07:45:37'),
(5, 'test5', 'test5@test5.com', '$2b$10$OrhANdD2VEd6HfS2ZE2Fr.FevNgkzqZeSkdTI.mH4woJKm0DABvl6', NULL, NULL, NULL, '2020-12-16 09:48:24', '2020-12-16 09:48:24'),
(6, 'test6', 'test6@test6.com', '$2b$10$QWl1JcfEcgf4Oa9CmuZLbeKlLZYcTNHSGVXLCGGWzoOl/LQdQv04G', NULL, NULL, NULL, '2020-12-16 09:54:06', '2020-12-16 09:54:06'),
(7, 'test7', 'test7@test7.com', '$2b$10$z09y8SPhuKOKCO4fvF352.oIJyF7m99FQsylqkqOHksq4POvIJoRi', NULL, NULL, NULL, '2020-12-16 14:22:52', '2020-12-16 14:22:52'),
(8, 'test8', 'test8@test8.com', '$2b$10$jFiBfGLy5DL0VrFNus8qGORPMOHgMEGsIzeF0o/LfaMeyrtZ2Vfoa', NULL, NULL, NULL, '2020-12-17 10:24:37', '2020-12-17 10:24:37');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
