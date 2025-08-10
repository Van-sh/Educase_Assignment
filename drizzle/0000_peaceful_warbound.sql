CREATE TABLE `schools` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`address` varchar(255) NOT NULL,
	`latitude` float NOT NULL,
	`longitude` float NOT NULL,
	CONSTRAINT `schools_id` PRIMARY KEY(`id`),
	CONSTRAINT `schools_name_unique` UNIQUE(`name`),
	CONSTRAINT `schools_address_unique` UNIQUE(`address`),
	CONSTRAINT `latitude_range` CHECK(-90 <= `schools`.`latitude` and `schools`.`latitude` <= 90),
	CONSTRAINT `longitude_range` CHECK(-180 <= `schools`.`longitude` and `schools`.`longitude` <= 180)
);
