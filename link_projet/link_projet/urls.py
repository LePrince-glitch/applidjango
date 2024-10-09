from django.contrib import admin
from django.urls import include, path
from django.conf import settings  # Import correct de settings
from django.conf.urls.static import static  # Import de static pour servir les fichiers médias

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('linkapp0.Urls')),  # Inclure les URLs de votre application
]

# Servir les fichiers médias en mode développement
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
