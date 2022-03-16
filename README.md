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

Below is a diagram of how the application works. 

![image](https://user-images.githubusercontent.com/31725260/158701710-0a3a1bfc-219d-4051-80de-3b8de75482ae.png)
