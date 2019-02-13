DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (jdoc JSON);

-- EXECUTE THIS FILE IN COMMAND LINE BY TYPING:
-- mysql -u <USER> < schema.sql