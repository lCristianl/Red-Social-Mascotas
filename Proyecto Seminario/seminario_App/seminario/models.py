from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class Usuario(AbstractUser):
    email = models.EmailField(unique=True)
    nombre_completo = models.CharField(max_length=200)

    # Agrega related_name para evitar conflictos
    groups = models.ManyToManyField(
        Group,
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='seminario_usuario_set',  # Nombre único para evitar conflictos
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='seminario_usuario_set',  # Nombre único para evitar conflictos
        related_query_name='usuario',
    )

    def _str_(self):
        return self.username

class Mascota(models.Model):
    TIPOS_MASCOTA = [
        ('PERRO', 'Perro'),
        ('GATO', 'Gato'),
        ('AVE', 'Ave'),
        ('OTRO', 'Otro'),
    ]

    nombre = models.CharField(max_length=100)
    tipo = models.CharField(max_length=50, choices=TIPOS_MASCOTA)
    edad = models.PositiveIntegerField()
    descripcion = models.TextField(blank=True, null=True)
    foto_perfil = models.ImageField(upload_to='mascotas/', blank=True, null=True)
    dueño = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='mascotas')

    def _str_(self):
        return f"{self.nombre} ({self.tipo})"

class Publicacion(models.Model):
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='publicaciones/', blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    mascota = models.ForeignKey(Mascota, on_delete=models.CASCADE, related_name='publicaciones')

    def _str_(self):
        return self.titulo

class Comentario(models.Model):
    contenido = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    publicacion = models.ForeignKey(Publicacion, on_delete=models.CASCADE, related_name='comentarios')

    def _str_(self):
        return f"Comentario de {self.usuario.username}"