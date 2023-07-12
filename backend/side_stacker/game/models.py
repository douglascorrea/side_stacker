import uuid
from django.db import models


def initial_board():
    return [[0] * 7] * 7


# Create your models here.
class Game(models.Model):
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    board = models.JSONField(default=initial_board)
    current_player = models.CharField(max_length=1, default='X')

    def execute_movement(self, movement):
        row_num = movement['row']
        direction = movement['direction']
        row = self.board[row_num]
        if direction == 'L':
            row[6] = self.current_player
        else:
            row[0] = self.current_player
        self.board[row_num] = row
        self.toggle_current_player()
        self.save()

    def toggle_current_player(self):
        if self.current_player == 'X':
            self.current_player = 'O'
        else:
            self.current_player = 'X'
