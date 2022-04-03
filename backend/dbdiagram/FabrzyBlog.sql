CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `full_name` varchar(255),
  `email` varchar(255),
  `date_of_birth` date,
  `created_at` timestamptz DEFAULT (now())
);
