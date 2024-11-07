import os
import pytest
from app.utils.env_setup import check_for_env_vars

def test_check_for_env_vars_all_present(monkeypatch):
  monkeypatch.setenv("MY_DATABASE", "test_db")
  try:
    check_for_env_vars()
  except EnvironmentError:
    pytest.fail("check_for_env_vars() raised EnvironmentError unexpectedly!")

def test_check_for_env_vars_missing(monkeypatch):
  monkeypatch.delenv("MY_DATABASE", raising=False)
  with pytest.raises(EnvironmentError) as excinfo:
    check_for_env_vars()
  assert "Missing required environment variables: MY_DATABASE" in str(excinfo.value)

def test_check_for_env_vars_custom_vars_all_present(monkeypatch):
  custom_vars = ["CUSTOM_VAR1", "CUSTOM_VAR2"]
  monkeypatch.setenv("CUSTOM_VAR1", "value1")
  monkeypatch.setenv("CUSTOM_VAR2", "value2")
  try:
    check_for_env_vars(custom_vars)
  except EnvironmentError:
    pytest.fail("check_for_env_vars() raised EnvironmentError unexpectedly!")

def test_check_for_env_vars_custom_vars_missing(monkeypatch):
  custom_vars = ["CUSTOM_VAR1", "CUSTOM_VAR2"]
  monkeypatch.delenv("CUSTOM_VAR1", raising=False)
  monkeypatch.delenv("CUSTOM_VAR2", raising=False)
  with pytest.raises(EnvironmentError) as excinfo:
    check_for_env_vars(custom_vars)
  assert "Missing required environment variables: CUSTOM_VAR1, CUSTOM_VAR2" in str(excinfo.value)