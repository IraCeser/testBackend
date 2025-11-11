from rest_framework import serializers
from users.models import Korisnik
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class KorisnikSerializer(serializers.ModelSerializer):
    class Meta:
        model = Korisnik
        fields = ['email', 'korisnickoIme', 'uloga']

    def create(self, validated_data):
        return Korisnik.objects.create_user(**validated_data)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token=super().get_token(user)

        token['username']=user.korisnickoIme
        token['email'] = user.email
        token['role'] = user.get_uloga_display()

        return token
