from django import forms
from .models import Prospect

class ProspectForm(forms.ModelForm):
    class Meta:
        model = Prospect
        fields = ['logo', 'nom', 'adresse', 'contact', 'referant', 'contact_referant', 'email']



from .models import Dossier

class DossierForm(forms.ModelForm):
    class Meta:
        model = Dossier
        fields = ['titre_projet', 'idprospect', 'service', 'statut', 'description', 'courrierreference', 'date_depot', 'date_relance', 'idagent']


