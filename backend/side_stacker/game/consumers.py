import json

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from game.models import Game
from game.serializers import GameSerializer


class GameConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game_group_name = 'game_%s' % self.game_id

        await self.channel_layer.group_add(self.game_group_name, self.channel_name)
        await self.accept()
        await self.channel_layer.group_send(
            self.game_group_name, {'type': 'get_game_by_id', 'game_id': self.game_id}
        )

    async def disconnect(self, close):
        await self.channel_layer.group_discard(self.game_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        type = content['type']
        movement = content['movement']
        player = content['player']

        if type == 'movement':
            await self.execute_movement(self.game, movement, player)

        await self.channel_layer.group_send(
            self.game_group_name, {'type': 'get_game_by_id', 'game_id': self.game_id}
        )


    async def get_game_by_id(self, event):
        game_id = event['game_id']
        self.game = await self.get_game(game_id)
        serialized_game = await self.serialize_game(self.game)
        await self.send_json({'game': serialized_game})


    @database_sync_to_async
    def execute_movement(self, game: Game, movement: dict, player: str):
        game.execute_movement(movement, player)
        game.refresh_from_db()

    @database_sync_to_async
    def get_game(self, id):
        game = Game.objects.get(id=id)
        return game

    @database_sync_to_async
    def serialize_game(self, game: Game):
        game_json = GameSerializer(game)
        return game_json.data
