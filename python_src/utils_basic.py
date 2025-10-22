import re
import os
import json
import yaml
import time
import argparse
import pandas as pd
from dotenv import load_dotenv
from functools import wraps

# ======================
# Load related functions
# ======================
def load_api_key(api_key_name):
    load_dotenv()
    token = os.getenv(api_key_name)
    return token

def load_config(config_list):
    # Load topics from configuration file
    # Merge all config into one, assuming all keys are unique when combined

    merged_config = {}
    for filename in config_list:
        print(f"Loading {filename} from file from config folder")
        config_filename = os.path.join(os.getcwd(), '..', 'config', filename)

        with open(config_filename) as f:
            config = yaml.safe_load(f)
            merged_config.update(config)

    return merged_config

# Registry design
# ---------------
load_function_dict = {}

def register_load_function(format):
    def decorator(fn):
        @wraps(fn)
        def wrapper(filename):
            return fn(filename)
        
        load_function_dict[format] = wrapper
        return wrapper
    return decorator

@register_load_function("csv")
def load_csv(filename):

    print(f"Loading {filename} from file from data folder")
    data = None
    csv_filename = os.path.join(os.getcwd(), '..', 'data', filename)

    if os.path.exists(csv_filename):
        data = pd.read_csv(csv_filename, index_col=0)
    return data

@register_load_function("json")
def load_json(filename):

    print(f"Loading {filename} from file from data folder")
    data = None
    json_filename = os.path.join(os.getcwd(), "..", "data", filename)

    if os.path.exists(json_filename):
        with open(json_filename, 'r') as f:
            data = json.load(f)
    
    return data

# Main load function
def load_data(filename, format):
    load_function = load_function_dict.get(format)
    if load_function is None:
        raise ValueError(f"No load function found for format: {format}")
    return load_function(filename)

# ======================
# Save related functions
# ======================
# Registry design
# ---------------
save_function_dict = {}

def register_save_function(format):
    def decorator(fn):
        @wraps(fn)
        def wrapper(data, filename):
            return fn(data, filename)
        
        save_function_dict[format] = wrapper
        return wrapper
    return decorator

@register_save_function("csv")
def save_csv(csv_data, filename):

    if csv_data is not None:
        print(f"Saving {filename} to file to data folder")
        csv_filename = os.path.join(os.getcwd(), '..', 'data', filename)
        csv_data.to_csv(csv_filename)

@register_save_function("text")
def save_text(text_data, filename):
    if text_data is not None:
        text_filename = os.path.join(os.getcwd(), '..', 'data', filename)
        with open(text_filename, "a", encoding="utf-8") as f:
            f.write(text_data + "\n")

@register_save_function("json")
def save_json(json_data, filename):

    if json_data is not None:
        print(f"Saving {filename} to file to data folder")
        json_filename = os.path.join(os.getcwd(), "..", "data", filename)
        with open(json_filename, 'w') as f:
            json.dump(json_data, f, indent=4)

@register_save_function("matlabplot")
def save_matlabplot(plt, filename):

    if plt is not None:
        print(f"Saving {filename} to file to images folder")
        plot_filename = os.path.join(os.getcwd(), '..', 'images', filename)
        plt.savefig(plot_filename)

# Main save function
def save_data(data, filename, format):
    save_function = save_function_dict.get(format)
    if save_function is None:
        raise ValueError(f"No save function found for format: {format}")
    save_function(data, filename)

# ===============
# Other functions
# ===============
def parse_arugments(arg_list, arg_desc_list):

    # Create the parser to process arguments
    parser = argparse.ArgumentParser()
    for arg, arg_desc in zip(arg_list, arg_desc_list):
        parser.add_argument(f"--{arg}", action='store_true', help=arg_desc)
    parser.add_argument("--no_truncate", action='store_true', help="flag to show dataframe in full mode")
   
    # Retrieve arguments value
    parse_args = parser.parse_args()
    no_truncate = parse_args.no_truncate
    arg_list = list(vars(parse_args).values())

    if no_truncate:
        print("Dataframe in full mode")
        # Set display options
        pd.set_option('display.max_rows', None)     # Show all rows
        pd.set_option('display.max_columns', None)  # Show all columns
        pd.set_option('display.width', None)        # No line wrapping
        pd.set_option('display.max_colwidth', None) # Show full column content

    return arg_list

def map_value(value, mapping):
    for rule in mapping.values():
        if eval(rule["condition"], {}, {"value": value}):
            return rule["label"]
    return "unknown"

# =================================
# File operations related functions
# =================================
def get_files_with_extension(folder_path, ext_name, relative_path=True):

    files_list = []
    full_folder_path = os.path.join(os.getcwd(), '..', folder_path)

    for filename in os.listdir(full_folder_path):
        if os.path.isfile(os.path.join(full_folder_path, filename)):
            ext = os.path.splitext(filename)[1]
            if ext and ext == ext_name:
                files_list.append(filename)

    if relative_path:
        files_list = [f"../{folder_path}/{file}" for file in files_list]
    else:
        files_list = [f"{full_folder_path}/{file}" for file in files_list]
             
    return files_list

def get_filename_from_path(path, with_ext=True):
    match = re.search(r'[^\\/]+$', path)
    if match:
        filename = match.group()
        if with_ext:
            return filename
        else:
            return filename.split(".")[0]
    return None

def get_folder_from_path(path):
    match = re.match(r'^(.*[\\/])[^\\/]+$', path)
    if match:
        folder = match.group(1)
        return folder
    return None

# ---------------
# Processing time
# ---------------
def get_process_time():
    return time.time()

def print_time_taken(time1, time2):
    print(f"Processing time: {time1 - time2:.4f} seconds")

def measure_time(func, *args, **kwargs):
    start = time.time()
    result = func(*args, **kwargs)
    end = time.time()
    print(f"Processing time: {end - start:.4f} seconds")
    return result