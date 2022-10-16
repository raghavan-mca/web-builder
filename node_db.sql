-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 17, 2022 at 12:02 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `node_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `aristostech_contact_form`
--

CREATE TABLE `aristostech_contact_form` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` longtext NOT NULL,
  `template_name` varchar(50) NOT NULL,
  `user_template_name` varchar(100) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `aristostech_domain_picker`
--

CREATE TABLE `aristostech_domain_picker` (
  `id` int(11) NOT NULL,
  `template_name` varchar(100) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `domain_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `aristostech_template`
--

CREATE TABLE `aristostech_template` (
  `id` int(11) NOT NULL,
  `template_name` varchar(100) DEFAULT NULL,
  `count` mediumint(9) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `aristostech_users`
--

CREATE TABLE `aristostech_users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `validate` int(10) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `uid` mediumtext,
  `password_timestamp` varchar(100) DEFAULT NULL,
  `business_name` mediumtext NOT NULL,
  `business_nature` varchar(100) NOT NULL,
  `terms` varchar(10) NOT NULL,
  `password` mediumtext,
  `template_limit` int(11) NOT NULL DEFAULT '1',
  `template_count` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `custom_raghavan`
--

CREATE TABLE `custom_raghavan` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) DEFAULT NULL,
  `flags` varchar(100) NOT NULL DEFAULT 'false',
  `domain` varchar(100) DEFAULT NULL,
  `RAM` longtext,
  `SNO` int(11) DEFAULT NULL,
  `DFGHJKL` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `custom_testing`
--

CREATE TABLE `custom_testing` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) DEFAULT NULL,
  `flags` varchar(100) NOT NULL DEFAULT 'false',
  `ram` longtext,
  `sonu` int(11) DEFAULT NULL,
  `littleheart` varchar(10) DEFAULT NULL,
  `user_template_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aristostech_contact_form`
--
ALTER TABLE `aristostech_contact_form`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aristostech_domain_picker`
--
ALTER TABLE `aristostech_domain_picker`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aristostech_template`
--
ALTER TABLE `aristostech_template`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aristostech_users`
--
ALTER TABLE `aristostech_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_raghavan`
--
ALTER TABLE `custom_raghavan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `custom_testing`
--
ALTER TABLE `custom_testing`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aristostech_contact_form`
--
ALTER TABLE `aristostech_contact_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aristostech_domain_picker`
--
ALTER TABLE `aristostech_domain_picker`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aristostech_template`
--
ALTER TABLE `aristostech_template`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aristostech_users`
--
ALTER TABLE `aristostech_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_raghavan`
--
ALTER TABLE `custom_raghavan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `custom_testing`
--
ALTER TABLE `custom_testing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
