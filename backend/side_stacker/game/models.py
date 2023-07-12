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

    def execute_movement(self, movement, player):
        row_num = movement['row']
        direction = movement['direction']
        row = self.board[row_num]
        if self.current_player == player:
            empty_index = None
            if direction == 'L':
                i = 0
                while i < len(row):
                    piece = row[i]
                    print(f"this piece is {piece} and i is {i}")
                    if piece == 0:
                        empty_index = i
                        break
                    i += 1
            else:
                i = len(row) - 1
                while i >= 0:
                    piece = row[i]
                    print(f"this piece is {piece} and i is {i}")
                    if piece == 0:
                        empty_index = i
                        break
                    i -= 1

            print(f"empty_index is {empty_index}")
            if empty_index is not None:
                self.place_movement(empty_index, row, row_num)
            else:
                return {'title': 'Invalid movement', 'error': 'No space left in this row'}
        else:
            return {'title': 'Invalid movement', 'error': 'It is not your turn'}

    def place_movement(self, empty_index, row, row_num):
        row[empty_index] = self.current_player
        self.board[row_num] = row
        self.toggle_current_player()
        self.save()

    def toggle_current_player(self):
        if self.current_player == 'X':
            self.current_player = 'O'
        else:
            self.current_player = 'X'
