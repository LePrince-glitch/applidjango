from django.contrib import admin

from django.contrib import admin
from .models import Agent, Client, Prospect, Incident, Dossier, Data

# Enregistrement des modèles dans l'admin
admin.site.register(Agent)
admin.site.register(Client)
admin.site.register(Prospect)
admin.site.register(Incident)
admin.site.register(Dossier)
admin.site.register(Data)
