import os

list_of_required_env_vars = [
  "MY_DATABASE",
]

def check_for_env_vars(required_vars = list_of_required_env_vars):
  missing_vars = [var for var in required_vars if var not in os.environ]
  if missing_vars:
    raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")


