# COMP 4513 (Winter 2023)
## Assignment #2: Node, MongoDB, Simple Authentication


Hosted on Glitch at https://longhaired-serious-perch.glitch.me/

***

### APIs
## Dataset requests (GET)
1. All Movies
	- https://longhaired-serious-perch.glitch.me/api/movies
2. Limited movies (Example of 10)
	- https://longhaired-serious-perch.glitch.me/api/movies/limit/10
3. Specific movie by ID (Example ID 13)
	- https://longhaired-serious-perch.glitch.me/api/movies/13
4. Specific movie by TMDB ID (Example ID 24)
	- https://longhaired-serious-perch.glitch.me/api/movies/tmdb/24
5. Movies by year range, inclusive (Example range 2004 to 2005, and a second of just 2009)
	- https://longhaired-serious-perch.glitch.me/api/movies/year/2000/2005
	- https://longhaired-serious-perch.glitch.me/api/movies/year/2009/2009
6. Movies by average ratings range, inclusive (Example range 5 to 5.5)
	- https://longhaired-serious-perch.glitch.me/api/movies/ratings/5/5.5
7. Movies by title, case insensitive, allows for incomplete search term (Example "amer" and "American Pie")
	- https://longhaired-serious-perch.glitch.me/api/movies/title/amer
	- https://longhaired-serious-perch.glitch.me/api/movies/title/American%20Pie
8. Movies by genre, case insensitive, allows for incomplete search term (Example "dra" and "Drama")
	- https://longhaired-serious-perch.glitch.me/api/movies/genre/dra
	- https://longhaired-serious-perch.glitch.me/api/movies/genre/Drama

## Important Authentication Endpoints
You must be logged in to access the API endpoints. If testing through a tool like Postman, these endpoints can be invoked

1. Login (POST) 
	- Requires data to be application/x-www-form-urlencoded
	- expected fields are: 
		- email
		- password
	- https://longhaired-serious-perch.glitch.me/login
2. Logout (GET)
	- https://longhaired-serious-perch.glitch.me/logout
