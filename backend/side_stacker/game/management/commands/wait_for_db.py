"""
Django command to wait for db to be available
"""
import time

from django.core.management.base import BaseCommand
from django.db import connection


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.stdout.write('Waiting for database...')
        db_up = False
        while db_up is False:
            try:
                print("checking")
                connection.ensure_connection()
                db_up = True
            except Exception as err:
                print(err)
                self.stdout.write('Database unavailble, waiting 1 second...')
                time.sleep(1)
        self.stdout.write(self.style.SUCCESS('Database available'))