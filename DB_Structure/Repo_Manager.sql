CREATE TABLE `repo` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(100) NOT NULL,
  `url` varchar(255) NOT NULL,
  `status_id` integer
);

CREATE TABLE `status` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `comment` (
  `id` integer PRIMARY KEY,
  `body` text,
  `repo_id` integer,
  `created_at` timestamp
);

CREATE TABLE `language` (
  `id` integer PRIMARY KEY NOT NULL,
  `name` varchar(50)
);

CREATE TABLE `repo_language` (
  `repo_id` integer,
  `language_id` integer,
  PRIMARY KEY (`repo_id`, `language_id`)
);

ALTER TABLE `repo` ADD FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

ALTER TABLE `comment` ADD FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`);

ALTER TABLE `repo_language` ADD FOREIGN KEY (`repo_id`) REFERENCES `repo` (`id`);

ALTER TABLE `repo_language` ADD FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);
