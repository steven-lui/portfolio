# 4
- Create a query
    - includes a sub query
    - formatted outputs
    - sorted by a value
- From the following tables, write a SQL query to find for movies whose reviewer is unknown. Return movie title, year, release date, director first name, last name, actor first name, last name.
    - Ordered by director's last name
    - Where reviewer is known (i.e ``NOT NULL``)
    - Where release date is known
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
``` sql
SELECT mov_title AS "Movie Title", mov_year AS "Year", to_char(mov_dt_rel, 'DD/MM/YYYY') AS "Release Date" , dir_fname || ' ' || dir_lname AS "Director", act_fname || ' ' || act_lname AS "Actor" FROM movie AS m
JOIN movie_direction AS md ON md.mov_id = m.mov_id
JOIN director AS d ON d.dir_id = md.dir_id
JOIN movie_cast AS mc ON mc.mov_id = m.mov_id
JOIN actor AS a ON a.act_id = mc.act_id
WHERE m.mov_id IN ( -- select mov_id with not null reviewers
    SELECT mov_id FROM rating as ra
    JOIN reviewer AS re ON re.rev_id = ra.rev_id
    WHERE rev_name IS NOT NULL
        )
ORDER BY dir_lname;
```
``` sql
SELECT mov_title AS "Movie Title", mov_year AS "Year", to_char(mov_dt_rel, 'DD/MM/YYYY') AS "Release Date" , dir_fname || ' ' || dir_lname AS "Director", act_fname || ' ' || act_lname AS "Actor" FROM movie_direction AS md
JOIN (SELECT * FROM movie WHERE mov_dt_rel IS NOT NULL) AS m -- movies with a release date
    ON m.mov_id = md.mov_id
JOIN director AS d ON d.dir_id = md.dir_id
JOIN movie_cast AS mc ON mc.mov_id = md.mov_id
JOIN actor AS a ON a.act_id = mc.act_id
WHERE md.mov_id IN ( -- select mov_id with not null reviewers
    SELECT mov_id FROM rating as ra
    JOIN reviewer AS re ON re.rev_id = ra.rev_id
    WHERE rev_name IS NOT NULL
        )
ORDER BY dir_lname;
```