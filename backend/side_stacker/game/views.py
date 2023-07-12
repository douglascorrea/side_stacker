from django.shortcuts import render
from rest_framework import generics, mixins

from game.models import Game
from game.serializers import GameSerializer


# Create your views here.
class GameView(mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
