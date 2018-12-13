CREATE USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'outrasenhaqualquer';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
CREATE USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'outrasenhaqualquer';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%' WITH GRANT OPTION;

CREATE TABLE IF NOT EXISTS `Products` (
  `ProductId` int NOT NULL AUTO_INCREMENT,
  `Sku` varchar (255) NOT NULL,
  `Name` varchar (255) NOT NULL DEFAULT '',
  `Description` mediumtext NOT NULL,
  `Price` decimal (6, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`ProductId`)
);

CREATE TABLE IF NOT EXISTS `Orders` ( 
  `OrderId` int NOT NULL AUTO_INCREMENT,
  `Total` decimal (6, 2) NOT NULL,
  `Date` datetime NOT NULL,
  PRIMARY KEY (`OrderId`)
);

CREATE TABLE IF NOT EXISTS `OrdersProducts` ( 
  `OrderId` int (11) NOT NULL,
  `ProductId` int (11) NOT NULL,
  `Quantity` smallint (3) NOT NULL DEFAULT 1
);