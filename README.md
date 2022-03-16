# etls_form_dashboard
At SF Planning, all python scripts were ran using the Windows Task Scheduler. This proved
to be cucumbersome because one had to log into the server to see the run statuses of
the python scripts. As a result, I created this simple web application that allowed
us to track each of the Python script run statses. The backend of the application was created with NodeJS
and Postgres. The front end was created with React. <br><br>

To log whether a python script ran successfully or not, I created a python function that
interacted with the Postgres Database and it would log True or False to its corresponding
python script name on whether it ran successfully or not. The python function would then be 
imported into other running scripts and be used accordingly. 

NodeJS created the REST endpoints that allowed CRUD operations to happen. The
front end then displayed all the python script run statuses based on their
supposed run time. 

While this web application did serve its purpose to see the run statuses of the Python scripts,
I eventually made the recommendation to the Senior GIS Analyst to move everything to Jenkins

Below is a diagram of the application architecture. 

![image](https://user-images.githubusercontent.com/31725260/158701710-0a3a1bfc-219d-4051-80de-3b8de75482ae.png)

Below is an image of the simple frontend. The pie chart allow one to see how many
python scripts ran successfully.

<img width="1648" alt="Screen Shot 2022-03-16 at 3 27 36 PM" src="https://user-images.githubusercontent.com/31725260/158702209-d1a1a9aa-58b5-48c0-ae6a-07c2b72402f5.png">
