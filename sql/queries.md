# Queries
<!--
## 1
From the following table, write a SQL query to find the actors who played a role in the movie 'Annie Hall'. Return all the fields of actor table.
``` sql
SELECT a.* FROM actor AS a
JOIN movie_cast AS mc ON a.act_id = mc.act_id
JOIN movie AS m ON mc.mov_id = m.mov_id
WHERE m.mov_title = 'Annie Hall';
``` 
## 2
From the following tables, write a SQL query to find the director of a film that cast a role in 'Eyes Wide Shut'. Return director first name, last name.
``` sql
SELECT dir_fname, dir_lname FROM director AS d
JOIN movie_direction AS md ON md.dir_id = d.dir_id
JOIN movie AS m ON m.mov_id = md.mov_id
WHERE m.mov_title = 'Eyes Wide Shut';
```
## 3
From the following table, write a SQL query to find those movies that have been released in countries other than the United Kingdom. Return movie title, movie year, movie time, and date of release, releasing country. 
``` sql
SELECT mov_title, mov_year, mov_time, mov_dt_rel AS date_of_release, mov_rel_country AS releasing_country
FROM movie
WHERE mov_rel_country != 'UK';
```
## 4
From the following tables, write a SQL query to find for movies whose reviewer is unknown. Return movie title, year, release date, director first name, last name, actor first name, last name.
``` sql
SELECT mov_title, mov_year, mov_dt_rel, d.dir_fname, d.dir_lname, act_fname, act_lname FROM movie AS m
JOIN movie_direction AS md ON md.mov_id = m.mov_id
JOIN director AS d ON d.dir_id = md.dir_id
JOIN movie_cast AS mc ON mc.mov_id = m.mov_id
JOIN actor AS a ON a.act_id = mc.act_id
JOIN rating AS ra ON ra.mov_id = m.mov_id
JOIN reviewer AS re ON re.rev_id = ra.rev_id
WHERE re.rev_name IS NULL;
```
It's important to note that this is relatively bad way to write this query. This is because:
- Its hard to read
- No clear structure to the join order
- It would be hard to maintain this query by anyone (including myself) in the future.
-->
## 5
From the following tables, write a SQL query to find those movies directed by the director whose first name is Woddy and last name is Allen. Return movie title.
``` sql
SELECT mov_title FROM movie
JOIN movie_direction AS md ON md.mov_id = movie.mov_id
JOIN director AS d ON d.dir_id = md.dir_id
WHERE dir_fname = 'Woody' AND dir_lname = 'Allen';
```
## 6
From the following tables, write a SQL query to determine those years in which there was at least one movie that received a rating of at least three stars. Sort the result-set in ascending order by movie year. Return movie year.
``` sql
SELECT * FROM rating AS r
WHERE rev_stars > 3
```