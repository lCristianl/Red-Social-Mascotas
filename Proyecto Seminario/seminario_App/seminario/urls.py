from django.urls import path
from .views import MascotaListCreateView, PublicacionListCreateView, ComentarioListCreateView

urlpatterns = [
    path('mascotas/', MascotaListCreateView.as_view(), name='mascota-list-create'),
    path('publicaciones/', PublicacionListCreateView.as_view(), name='publicacion-list-create'),
    path('comentarios/', ComentarioListCreateView.as_view(), name='comentario-list-create'),
]

