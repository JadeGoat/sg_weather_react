import os
import json
import yaml
import time
import argparse
import pandas as pd
from dotenv import load_dotenv

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

def load_csv(filename):

    print(f"Loading {filename} from file from data folder")
    data = None
    csv_filename = os.path.join(os.getcwd(), '..', 'data', filename)

    if os.path.exists(csv_filename):
        data = pd.read_csv(csv_filename, index_col=0)
    return data

def load_json(filename):

    print(f"Loading {filename} from file from data folder")
    data = None
    json_filename = os.path.join(os.getcwd(), "..", "data", filename)

    if os.path.exists(json_filename):
        with open(json_filename, 'r') as f:
            data = json.load(f)
    
    return data

# ======================
# Save related functions
# ======================
def save_csv(csv_data, filename):

    if csv_data is not None:
        print(f"Saving {filename} to file to data folder")
        csv_filename = os.path.join(os.getcwd(), '..', 'data', filename)
        csv_data.to_csv(csv_filename)

def save_json(json_data, filename):

    if json_data is not None:
        print(f"Saving {filename} to file to data folder")
        json_filename = os.path.join(os.getcwd(), "..", "data", filename)
        with open(json_filename, 'w') as f:
            json.dump(json_data, f, indent=4)

def save_matlabplot(plt, filename):

    if plt is not None:
        print(f"Saving {filename} to file to images folder")
        plot_filename = os.path.join(os.getcwd(), '..', 'images', filename)
        plt.savefig(plot_filename)

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