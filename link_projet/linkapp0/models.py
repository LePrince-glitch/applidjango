from django.db import models



# Prospect Model

class Prospect(models.Model):
    idprospect = models.AutoField(primary_key=True)
    logo = models.ImageField(upload_to='logos/')  # Utilisez ImageField pour le logo
    nom = models.CharField(max_length=255)
    adresse = models.CharField(max_length=255)
    contact = models.CharField(max_length=50)
    referant = models.CharField(max_length=255)
    contact_referant = models.CharField(max_length=50)
    email = models.EmailField()
    date = models.DateField(auto_now_add=True)  # Modifié pour auto_now_add

    def __str__(self):
        return self.nom

# Dossier Model
class Agent(models.Model):
    idagent = models.AutoField(primary_key=True)
    nomagent = models.CharField(max_length=255)
    prenomagent = models.CharField(max_length=255)
    fonction = models.CharField(max_length=100)
    telephone = models.CharField(max_length=15)
    mail = models.EmailField()
   

    def __str__(self):
        return f'{self.prenomagent} {self.nomagent}'



class Dossier(models.Model):
    STATUT_CHOICES = [
        ('rdv1_a_fixer', 'RDV1 à fixer'),
        ('rdv1_pris', 'RDV1 Pris'),
        ('devis_remis_negociation', 'Devis Remis-Négo'),
        ('signe_a_valider', 'Signé-A valider'),
        ('signe_valide', 'Signé-Validé'),
        ('signe_annule', 'Signé-Annulé'),
        ('sans_suite_abandonne', 'Sans suite-Abandonné'),
        ('perdu', 'Perdu'),
        ('en_attente', 'En attente'),
        ('termine', 'Terminé'),  
    ]

    SERVICE_CHOICES = [
        ('interconnexion', 'Interconnexion'),
        ('maintenance', 'Maintenance'),
        ('reseau', 'Réseau'),
        ('developpement', 'Développement'),
        ('livraison', 'Livraison'),
        ('divers', 'Divers'),
    ]

    iddossier = models.AutoField(primary_key=True)
    titre_projet = models.CharField(max_length=255)
    idprospect = models.ForeignKey('Prospect', on_delete=models.CASCADE)
    service = models.CharField(max_length=255, choices=SERVICE_CHOICES)
    statut = models.CharField(max_length=100, choices=STATUT_CHOICES)
    description = models.TextField()
    courrierreference = models.CharField(max_length=255)
    date_depot = models.DateField()
    date_relance = models.DateField()
    idagent = models.ForeignKey('Agent', on_delete=models.CASCADE)

    def __str__(self):
        return self.titre_projet


# Data Model
class Data(models.Model):
    numrecharge = models.AutoField(primary_key=True)
    numerosim = models.CharField(max_length=20)
    volume = models.CharField(max_length=50)
    site = models.CharField(max_length=255)
    idprospect = models.ForeignKey(Prospect, on_delete=models.CASCADE)
    dateexpiration = models.DateField()

    def __str__(self):
        return self.numerosim

# Client Model
class Client(models.Model):
    idclient = models.AutoField(primary_key=True)
    idprospect = models.ForeignKey(Prospect, on_delete=models.CASCADE)
    date = models.DateField()

    def __str__(self):
        return f'Client {self.idclient} for Prospect {self.idprospect}'


from django.db import models

# Incident Model
class Incident(models.Model):
    idincident = models.AutoField(primary_key=True)
    idclient = models.ForeignKey(Client, on_delete=models.CASCADE)
    site = models.CharField(max_length=255)
    description = models.TextField()
    responsabilite = models.CharField(max_length=255)
    dateincident = models.DateField()
    heureincident = models.TimeField()
    dateenregistrement = models.DateField(auto_now_add=True)

    def __str__(self):
        return f'Incident {self.idincident} for Client {self.idclient}'

# Intervention Model
class Intervention(models.Model):
    idintervention = models.AutoField(primary_key=True)
    idincident = models.ForeignKey(Incident, on_delete=models.CASCADE)
    date = models.DateField()
    heure = models.TimeField()
    equipe = models.CharField(max_length=255)

    def __str__(self):
        return f'Intervention {self.idintervention} for Incident {self.idincident}'
