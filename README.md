**BugFeed**
**IMG Summer Assignment**

BugFeed is an app being made to aid the testing process in IMG, before launching any app. 
The dependencies for the backend are :
   - python3
   - pip
   - virtualenv
    

**Build and Run**

 Clone the repository at [link](https://github.com/Yavnikaa/BugFeed)

    $ git clone 

    $ cd bugfeed

  Set-up virtual environment

    $ sudo apt-get install python3-venv

    $ python3 -m venv <env_name>

    $ source <env_name>/bin/activate 
    
  Virtual environment is set-up and activated.
    
  Install the project dependencies
         
         $pip3 install -r requirements.txt
         
  Create a MySQL database and add the credentials to settings.py
    
    DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'db_name',
        'USER': 'name',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '',
    }
    }

 Set-up Rich Text Field
   
    $Run pip install django-richtextfield
    $Configure it in settings.py :
    DJRICHTEXTFIELD_CONFIG = {
    'js': ['//tinymce.cachefly.net/4.1/tinymce.min.js'],
    'init_template': 'djrichtextfield/init/tinymce.js',
    'settings': {
        'menubar': False,
        'plugins': 'link image',
        'toolbar': 'bold italic | link image | removeformat',
        'width': 700
    }
    }

    
 Migrate files

    $ python3 manage.py makemigrations bugfeed

    $ python3 manage.py migrate

  Start the backend server

    $ python3 manage.py runserver

  Open browser

  Go to localhost:8000/bugfeed/
 

