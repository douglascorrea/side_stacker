import uuid
from django.db import models


def initial_board():
    return [[0] * 7] * 7


# Create your models here.
class Game(models.Model):
    WINNING_CONNECTIONS = 4
    id = models.UUIDField(
        primary_key=True,
        editable=False,
        default=uuid.uuid4
    )
    board = models.JSONField(default=initial_board)
    current_player = models.CharField(max_length=1, default='X')
    winner_player = models.CharField(max_length=1, null=True)

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
                    if piece == 0:
                        empty_index = i
                        break
                    i += 1
            else:
                i = len(row) - 1
                while i >= 0:
                    piece = row[i]
                    if piece == 0:
                        empty_index = i
                        break
                    i -= 1

            if empty_index is not None:
                self.place_movement(empty_index, row, row_num)
            else:
                return {'title': 'Invalid movement', 'error': 'No space left in this row'}
        else:
            return {'title': 'Invalid movement', 'error': 'It is not your turn'}

    def check_winner(self, row_num, last_played_index, current_player):
        row = self.board[row_num]
        connected = self.check_horizontal_connected(row, last_played_index, current_player)
        horizontal_winner = self.check_and_save_winner(connected, current_player)

        connected = self.check_vertical_connected(row_num, last_played_index, current_player)
        vertical_winner = self.check_and_save_winner(connected, current_player)

        connected = self.check_diagonal_connected(row, row_num, last_played_index, current_player)
        diagonal_winner = self.check_and_save_winner(connected, current_player)

        return horizontal_winner or vertical_winner or diagonal_winner or False

    def check_and_save_winner(self, connected, current_player):
        if connected == self.WINNING_CONNECTIONS:
           self.winner_player = current_player
           self.save()
           return True


    def check_diagonal_connected(self, row, last_played_row_num, last_played_index, current_player):
        connected = 1  # the current piece is already "connected"
        i = 1  # starting on 1 position on both sides
        continue_down_right = True
        continue_down_left = True
        continue_up_right = True
        continue_up_left = True
        while (
                continue_up_right or continue_up_left or continue_down_right or continue_down_left) and connected < self.WINNING_CONNECTIONS and i < self.WINNING_CONNECTIONS:
            next_down_row_check = last_played_row_num + i
            next_up_row_check = last_played_row_num - i
            next_right_check = last_played_index + i
            next_left_check = last_played_index - i

            if next_down_row_check > len(self.board) - 1:
                continue_down_left = False
                continue_down_right = False
            # if the next left check is greather than the left edge
            if next_up_row_check < 0:
                continue_up_left = False
                continue_up_right = False

            if next_right_check > len(row) - 1:
                continue_down_right = False
                continue_up_right = False
            # if the next left check is greather than the left edge
            if next_left_check < 0:
                continue_up_left = False
                continue_down_left = False

            if continue_down_right and self.board[next_down_row_check][next_right_check] == current_player:
                connected += 1
            else:
                continue_down_right = False

            if continue_down_left and self.board[next_down_row_check][next_left_check] == current_player:
                connected += 1
            else:
                continue_down_left = False

            if continue_up_right and self.board[next_up_row_check][next_right_check] == current_player:
                connected += 1
            else:
                continue_up_right = False

            if continue_up_left and self.board[next_up_row_check][next_left_check] == current_player:
                connected += 1
            else:
                continue_up_left = False

            i += 1

        return connected

    def check_vertical_connected(self, last_played_row_num, last_played_index, current_player):
        connected = 1  # the current piece is already "connected"
        i = 1  # starting on 1 position on both sides
        continue_down = True
        continue_up = True
        while (continue_up or continue_down) and connected < self.WINNING_CONNECTIONS and i < self.WINNING_CONNECTIONS:
            next_down_row_check = last_played_row_num + i
            next_up_row_check = last_played_row_num - i
            # if the next down check is greather than the down edge
            if next_down_row_check > len(self.board) - 1:
                continue_down = False
            # if the next left check is greather than the left edge
            if next_up_row_check < 0:
                continue_up = False

            if continue_down and self.board[next_down_row_check][last_played_index] == current_player:
                connected += 1
            else:
                # if the next right is not connected so no continue to right
                continue_down = False

            if continue_up and self.board[next_up_row_check][last_played_index] == current_player:
                connected += 1
            else:
                # if the next left is not connected so no continue to left
                continue_up = False

            i += 1

        return connected

    def check_horizontal_connected(self, row, last_played_index, current_player):
        connected = 1  # the current piece is already "connected"
        i = 1  # starting on 1 position on both sides
        continue_left = True
        continue_right = True
        while (
                continue_right or continue_left) and connected < self.WINNING_CONNECTIONS and i < self.WINNING_CONNECTIONS:
            next_right_check = last_played_index + i
            next_left_check = last_played_index - i
            # if the next right check is greather than the right edge
            if next_right_check > len(row) - 1:
                continue_right = False
            # if the next left check is greather than the left edge
            if next_left_check < 0:
                continue_left = False

            if continue_right and row[next_right_check] == current_player:
                connected += 1
            else:
                # if the next right is not connected so no continue to right
                continue_right = False

            if continue_left and row[next_left_check] == current_player:
                connected += 1
            else:
                # if the next left is not connected so no continue to left
                continue_left = False

            i += 1

        return connected

    def place_movement(self, empty_index, row, row_num):
        row[empty_index] = self.current_player
        self.board[row_num] = row
        if not self.check_winner(row_num, empty_index, self.current_player):
            self.toggle_current_player()
        self.save()

    def toggle_current_player(self):
        if self.current_player == 'X':
            self.current_player = 'O'
        else:
            self.current_player = 'X'
