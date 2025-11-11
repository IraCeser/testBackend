from django.contrib import admin
from django.urls import path
from users.views import create_korisnik, change_password, google_login
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),                                                #djangova admin stranica
    path('api/email-login', TokenObtainPairView.as_view(), name='user-login'),      #url za login, vraca jwt
    path('api/token-refresh', TokenRefreshView.as_view(), name='token_refresh'),    #url za refreshat isteknuti jwt, vraca novi jwt
    path('api/change-password', change_password, name='change-password'),           #url za mijenjat lozinku
    path('api/create-user', create_korisnik, name='create-user'),                   #url za kreirat korisnike, dostupan samo adminu
    path('api/google-login', google_login, name='google-login')                     #url za sign in with google

]
