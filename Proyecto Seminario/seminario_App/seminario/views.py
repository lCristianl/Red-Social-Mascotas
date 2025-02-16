from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Mascota, Publicacion, Comentario
from .serializers import MascotaSerializer, PublicacionSerializer, ComentarioSerializer
from django.http import HttpResponse

def bienvenida(request):
    return HttpResponse("<h1>Bienvenido a la Red Social para Mascotas</h1>")

class MascotaListCreateView(APIView):
    def get(self, request):
        mascotas = Mascota.objects.all()
        serializer = MascotaSerializer(mascotas, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MascotaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublicacionListCreateView(APIView):
    def get(self, request):
        publicaciones = Publicacion.objects.all()
        serializer = PublicacionSerializer(publicaciones, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PublicacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ComentarioListCreateView(APIView):
    def get(self, request):
        comentarios = Comentario.objects.all()
        serializer = ComentarioSerializer(comentarios, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ComentarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)