from django.core.exceptions import ValidationError
import re

def validate_username(username):
    error_message="Improper name format"
    pattern = re.compile(r'^[a-zA-Z0-9_]+$')
    if not pattern.match(username):
        raise ValidationError("Improper name format. Only alphanumeric characters and underscores are allowed.")
