# Otis

![](screenshot.png)

Otis will become a text adventure maker that converts to native shell scripts for different operating systems.
It will have a web GUI interface, and is meant to be ran in Docker.

You will be able to export to batch and bash.

Front-end will be React.
Back-end will be Flask.

Database will be MongdoDB.
Testing and building will be with Jenkins.


## API endpoints

* **POST /screen/** will create a blank screen object and return the id
* **PUT /screen/(id)** will update the values included in the body on a screen object
* **GET /screen/(id)** will return a screen object
* **DELETE /screen/(id)** recursively deletes a screen from the database and any child screens/options

* **PUT /screen/option-array/(id)** will add an option to a screens option array
* **DELETE /screen/option-array/(id)** will delete an option from a screens option array

* **POST /option** creates an option pointing to the screen id included in the body. Returns the option id
* **GET /option/(id)** returns the title and the id for the screen it points to
* **PUT /option/(id)** updates the option with the values included in the body
* **DELETE /option/(id)** recursively deletes the option and any child screens/options