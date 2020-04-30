#BugFeed
##IMG Summer Assignment

BugFeed is an app being made to aid the testing process in IMG, before launching any app. 
The dependencies for the backend are :
    python3
    pip
    virtualenv
    

**Build and Run**

    Clone the repository

    $ git clone 

    $ cd stream-2.0

    Set-up virtual environment

    $ sudo apt-get install python3-venv

    $ python3 -m venv <env_name>

    $ source <env_name>/bin/activate Virtual environment is set-up and activated.

    Install requirememnts $ cd ./stream

    $ pip3 install requirements.txt All backend dependencies are installed.

    $ cd ../stream-frontend

    $ npm install All frontend dependenices are installed.

    Migrate files

    $ cd ../stream

    $ python3 manage.py makemigrations stream-2.0

    $ python3 manage.py migrate

    Start the backend server

    $ sudo docker run -p 6379:6379 -d redis:2.8

    $ python3 manage.py runserver

    Start the frontend server

    $ cd ../stream-frontend

    $ npm start

    Open browser

    The music will stream on localhost:3000/stream
    But first register on localhost:3000/register
    Create superuser so that your account gets approved

        `$ cd ../stream`
        
        `$ python3 manage.py createsuperuser`

    Go to localhost:8000/stream/admin to approve your account.
    After approval, go to localhost:3000/login and login.
    Search for your favourite music and start listening.
 

