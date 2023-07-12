from rest_framework.serializers import ModelSerializer

from game.models import Game


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = ['id', 'board', 'current_player']