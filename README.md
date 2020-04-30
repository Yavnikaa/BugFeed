**BugFeed**
**IMG Summer Assignment**

BugFeed is an app being made to aid the testing process in IMG, before launching any app. 
The dependencies for the backend are :
   - python3
   - pip
   - virtualenv
    

**Build and Run**

    Clone the repository (https://github.com/Yavnikaa/BugFeed)

    $ git clone 

    $ cd bugfeed

    Set-up virtual environment

    $ sudo apt-get install python3-venv

    $ python3 -m venv <env_name>

    $ source <env_name>/bin/activate 
    
    Virtual environment is set-up and activated.

    Migrate files

    $ python3 manage.py makemigrations bugfeed

    $ python3 manage.py migrate

    Start the backend server

    $ python3 manage.py runserver

    Open browser

    Go to localhost:8000/bugfeed 
 

