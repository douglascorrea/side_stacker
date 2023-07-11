from channels.generic.websocket import AsyncJsonWebsocketConsumer

class GameConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.game_name = self.scope['url_route']['kwargs']['game_name']
        self.game_group_name = 'game_%s' % self.game_name

        await self.channel_layer.group_add(self.game_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, close):
        await self.channel_layer.group_discard(self.game_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        message = content['message']

        # Send message to room group
        await self.channel_layer.group_send(
            self.game_group_name, {'type': 'game_message', 'message': message}
        )

    # Receive message from room group
    async def game_message(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send_json({"message": f"the message is {message}"})
