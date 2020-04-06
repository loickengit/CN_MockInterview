/*
Navicat MySQL Data Transfer

Source Server         : mockInterview
Source Server Version : 50724
Source Host           : localhost:3306
Source Database       : mock

Target Server Type    : MYSQL
Target Server Version : 50724
File Encoding         : 65001

Date: 2020-01-08 18:30:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intervieweeId` int(11) DEFAULT NULL,
  `coding` int(11) DEFAULT NULL,
  `solution` int(11) DEFAULT NULL,
  `communication` int(11) DEFAULT NULL,
  `interviewerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) E

-- ----------------------------
-- Table structure for interview
-- ----------------------------
DROP TABLE IF EXISTS `interview`;
CREATE TABLE `interview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `subject` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `intervieweeName` varchar(255) DEFAULT NULL,
  `interviewerName` varchar(255) DEFAULT NULL,
  `title1Id` int(11) DEFAULT NULL,
  `title2Id` int(11) DEFAULT NULL,
  `feedback1Id` int(11) DEFAULT NULL,
  `feedback2Id` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL,
  `intervieweeEmail` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;


-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `hints` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postid` int(11) ,
  `content` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  constraint `postFK` foreign key (`postid`) references `post`(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
