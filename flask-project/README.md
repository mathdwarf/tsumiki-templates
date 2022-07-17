# flask-project

## 01. What is this ?

This is a flask app templates collection.  
You can use these templates by copying to any directory.  

## 02. Contents

- api : The directory "api" is only api type flask project.  
- website : The directory "website" is only website type flask project. It is include simple user authentication.  

## 03. The directory "api"

### 03-01. Get Started

At first : copy for use.  

    cp -r ./api [any directory path]
    cd [any directory path]

Second : install necessary packages.  

    pip install -r ./setup/requirements.txt

Third : run.

    python run.py

Then, post to API by "./rest_client/request.http", you confirm response.  

    POST http://localhost:5001/template/post

## 04. The directory "website"

### 04-01. Get Started

At first : copy for use.  

    cp -r ./api [any directory path]
    cd [any directory path]

Second : install necessary packages.  

    pip install -r ./setup/requirements.txt

Third : create db before run.

    python

    >>> from app import create_app
    >>> from app.models.db_manager import db_manager
    >>> db_manager.create_db(create_app())
    >>> exit()

Fourth : run.

    python run.py

Then, access following url:  

[[user registration] - http://localhost:5002/register](http://localhost:5002/register)  
[[login] - http://localhost:5002/login](http://localhost:5002/login)  

Register user information(email and password) on user registration page.  
Only registered users can be login.  
If you can log in, following page is opened.  

[[main page] - http://localhost:5002/](http://localhost:5002/)  

That's it. Enjoy!  
