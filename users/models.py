from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models


class KorisnikManager(BaseUserManager):
    use_in_migration = True

    def create_user(self, korisnickoIme, email, uloga, password, **dodatna_polja):
        """Stvara i sprema korisnika s danim korisnickim imenom, emailom i ulogom."""
        if not korisnickoIme:
            raise ValueError("Korisnik mora imati dodijeljeno korisničko ime")
        if not email:
            raise ValueError("Korisnik mora imati dodijeljenu email adresu")
        if not uloga:
            raise ValueError("Korisnik mora imati dodijeljenu ulogu")

        korisnik = self.model(korisnickoIme=korisnickoIme, email=email, uloga=uloga, **dodatna_polja)

        if password:
            korisnik.set_password(password)
        else:
            korisnik.set_unusable_password()

        korisnik.save()
        return korisnik

    def create_superuser(self, korisnickoIme, password, email, uloga, **dodatna_polja):

        dodatna_polja.setdefault('is_staff', True)
        dodatna_polja.setdefault('is_superuser', True)

        if dodatna_polja.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if dodatna_polja.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(korisnickoIme=korisnickoIme, password=password, email=email, uloga=uloga, **dodatna_polja)


class Korisnik(AbstractBaseUser, PermissionsMixin):
                                                # PermissionsMixin omogucuje da admin stranica radi i bez dodatnih fja
    ULOGE = {
        "s":"Suvlasnik",
        "ps":"Predstavnik suvlasnika",
        "a":"Administrator",
    }

    email = models.EmailField(max_length=50, unique=True)
    udioUVlasnistvu = models.FloatField(default=0.0)
    id = models.AutoField(primary_key=True)                 #preimenovao u id da bi jwt tokeni radili
    korisnickoIme = models.CharField(max_length=50, unique=True)
    uloga = models.CharField(max_length=2, choices=ULOGE)

    is_staff = models.BooleanField(default=False)


    objects = KorisnikManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["korisnickoIme", "uloga"]

    def __str__(self):
        return self.korisnickoIme + "(" + self.get_uloga_display() + ")"  #get_uloga_display da se ispise puno ime uloge

