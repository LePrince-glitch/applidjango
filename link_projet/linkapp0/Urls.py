# urls.py

from . import views
from django.contrib import admin
from django.urls import path
from django.contrib.auth.decorators import user_passes_test
from .views import * 

def is_superuser(user):
    return user.is_superuser

urlpatterns = [
    path('admin/', user_passes_test(is_superuser)(admin.site.urls)),
    path('', login_view, name='connexion'), 
    path('home/', home, name='home'),  
    path('Data/', datas, name='datas'),  
    path('dossier/', page_dossiers, name='page_dossiers'),
    path('prospects/', page_prospects, name='page_prospects'),
    path('suivie/', suivie, name='suivie'),
    path('profile/', profiles, name='profiles'),  
    path('planning/', planning, name='planning'),   
    path('clients/', page_clients, name='page_clients'), 
    path('update_prospect/', views.edit_prospect, name='edit_prospect'),
    path('delete_prospect/<int:prospect_id>/', views.delete_prospect, name='delete_prospect'),

    #----------------------gestion dossier------------------------------------------
    path('supprimer-dossier/<int:dossier_id>/', supprimer_dossier, name='supprimer_dossier'),
     path('modifier_dossier/', views.modifier_dossier, name='modifier_dossier'),
    #----------------------gestion client--------------------------------------------------
    path('supprimer_client/<int:client_id>/', views.supprimer_client, name='supprimer_client'),
    #----------------------gestion incident------------------------------------------
    path('update-incident/<int:id>/', views.update_incident, name='update_incident'),
    path('delete-incident/<int:id>/', views.delete_incident, name='delete_incident'),

]
