# Introdution
Main goal: To

# Setup
#### Preparing virtual environment
```
pip install virtualenv
python -m virtualenv xxxx_env
```

#### Installing package into virtual environment
```
.\xxxx_env\Scripts\activate
pip install pyyaml
pip install python-dotenv
```

#### Preparing .env file
Creating .env in python_src folder with the following field
```
xxx_API_TOKEN = <register_xxx_api_key_and_fill_in>
```

#### Data


#### Folder Structure
```
├─ config
|  ├─ xxxxx.yaml
|  └─ xxxx.yaml
├─ data
├─ python_src
|  ├─ .env
|  ├─ utils_basic.py
|  └─ xxxx.py
├─ xxxx_env
├─ .gitignore
└─ README.md
```

# Usage
#### Ensure virtual environment is activate
```
.\xxxx_env\Scripts\activate
```

#### Running scripts
```
cd python_src
python ./xxxx.py 
```

Other modes
```
python ./xxxx.py --help
```

# Features Log
1. xxxxx
