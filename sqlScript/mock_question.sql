-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: mock
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `hints` varchar(255) DEFAULT NULL,
  `answer` varchar(2000) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (3,'替换空格','请实现一个函数，将一个字符串中的每个空格替换成“%20”。例如，当字符串为We Are Happy.则经过替换之后的字符串为We%20Are%20Happy。','字符串操作','解法一：用Java自带的函数str.toString().replace(\" \",\"%20\")。\n解法二：在当前字符串上进行替换。\n先计算替换后的字符串需要多大的空间，并对原字符串空间进行扩容；\n从后往前替换字符串的话，每个字符串只需要移动一次；\n如果从前往后，每个字符串需要多次移动，效率较低。\n解法三：开辟一个新的字符串。','树;'),(4,'矩阵中的路径','请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则该路径不能再进入该格子。','回溯法','路径寻找过程中，整体的节点构成了一个树形结构，树形结构通过根节点互相连接。\n\n1.定义一个marks数组标记当前的节点是否访问过，被访问过的节点，我们把他们叫做关键节点，整个路径通过关键节点连接。\n2.定义两个栈结构，本例中使用两个LinkedList rowStack和colStack，分别记录行坐标和列坐标。\n\n整体逻辑如下：\n\n如果marks数组中标记有被访问过，说明此节点是关键节点。再次访问关键节点说明路径已经无法走通，需要pop关键节点。\n如果未被访问过： 一种情况是，此节点正好是要找的值，这个时候需要把此节点定义为关键节点，然后把此关键节点的临接节点存到rowStack和colStack。\n另外一种情况是，此节点不是要找的值，这个时候把此节点pop即可，路径无效。\n重复执行1和2，直到rowStack或者colStack为空。','回溯;'),(5,'删除链表中重复节点','在一个排序的链表中，存在重复的结点，请删除该链表中重复的结点，重复的结点不保留，返回链表头指针。 例如，链表1->2->3->3->4->4->5 处理后为 1->2->5','链表遍历','这道题目看起来很简单，但是实际操作起来并不容易，尤其需要考虑头结点重复修改头结点\n这里说一下思路：直接声明一个ListNode **p = pHead用于修改结点\np最初指向头结点，当头结点重复时可以通过*p直接修改头结点 不重复时可以通过p = &(xxx)修改其指向的结点','链表;');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-04-06 23:19:23
