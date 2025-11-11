from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .serializers import KorisnikSerializer
from google.oauth2 import id_token
from google.auth.transport.requests import Request
from .models import Korisnik
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.

#ovu fju ne trebamo na kraju al necu jos micat
@api_view(['POST'])
def user_login(request):

    #if request.method != 'POST':
    #   return JsonResponse({'error': 'Method must be POST.'}, status=405)

    data = JSONParser().parse(request)
    email = data.get('email')
    password = data.get('password')

    user = authenticate(email=email, password=password)

    if not user:
        return JsonResponse({'error': 'Neispravan unos korisnickog imena ili lozinke.'}, status=401)

    login(request, user)
    return JsonResponse({'success': True, "message": "Uspjesna prijava!", 'uloga': user.get_uloga_display()}, status=200)


@api_view(['POST'])
def create_korisnik(request):

    if not request.user.is_authenticated or not request.user.uloga == "a":
        return JsonResponse({'error': "Niste prijavljeni ili nemate ovlasti administratora."}, status=401)

    data = JSONParser().parse(request)

    serializer = KorisnikSerializer(data=data)
    if not serializer.is_valid():
        return JsonResponse({'error': serializer.errors}, status=400)
    if not data.get('udioUVlasnistvu'):
        serializer.save(password=data.get('password'))
    else:
        serializer.save(password=data.get('password'), udioUVlasnistvu=data.get('udioUVlasnistvu'))

    return JsonResponse(data={"success":True, "message":"Korisnik kreiran"}, status=200)


@api_view(['POST'])
def change_password(request):

    user = request.user

    if not user.is_authenticated:
        return JsonResponse({'error' : 'Ne možete mijenjati lozinku ako niste prijavljeni!'}, status=401)


    data = JSONParser().parse(request)
    old_password = data.get('oldPassword')
    new_password = data.get('newPassword')

    if not old_password or not new_password:
        return JsonResponse({'error' : 'Nisu unesena sva potrebna polja!'}, status=400)

    if not user.check_password(old_password):
        return JsonResponse({'error' : 'Neispravna stara lozinka!'}, status=401)

    if old_password == new_password:
        return JsonResponse({'error' : 'Nova lozinka mora se razlikovati od stare!'}, status=400)

    user.set_password(new_password)
    user.save()

    return JsonResponse({'success': True, 'message': 'Lozinka uspjesno promijenjena!'}, status=200)

@api_view(['POST'])
def google_login(request):
    data = JSONParser().parse(request)
    token = data.get('token')

    try:
        idinfo = id_token.verify_oauth2_token(token, Request(),"403577417985-1cm5an3v0qrbb19u6fbodn88vnuhh3u6.apps.googleusercontent.com")
    except ValueError as v:
        return JsonResponse({"Error":v.__str__()}, status=400)

    if Korisnik.objects.filter(email=idinfo["email"]).exists():
        user = Korisnik.objects.get(email=idinfo["email"])
    else:
        return JsonResponse({"Error":"Korisnik nema pristup aplikaciji"}, status=403)

    refresh_token = RefreshToken.for_user(user)
    refresh_token['username'] = user.korisnickoIme
    refresh_token['email'] = user.email
    refresh_token['role'] = user.get_uloga_display()
    return JsonResponse({'access_token': str(refresh_token.access_token), 'refresh_token': str(refresh_token)}, status=200)

