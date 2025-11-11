# Programsko inženjerstvo

> Ime projekta u naslovu ima cilj opisati namjenu projekta te pomoći u podizanju početnog interesa za projekt prezentirajući osnovnu svrhu projekta.
> Isključivo ovisi o Vama!
> 
> Naravno, nijedan predložak nije idealan za sve projekte jer su potrebe i ciljevi različiti. Ne bojte se naglasiti Vaš cilj u ovoj početnoj stranici projekta, podržat ćemo ga bez obzira usredotočili se Vi više na tenologiju ili marketing.
> 
> Zašto ovaj dokument? Samo manji dio timova je do sada propoznao potrebu (a i meni je lakše pratiti Vaš rad).  

# Opis projekta
Ovaj projekt je rezultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. 

Stambene zgrade nerijetko imaju velik broj suvlasnika, 
zbog čega je usklađivanje njihove međusobne komunikacije zahtjevan posao.
Ideja projekta StanBlog je aplikacija koja omogućuje jednostavnu i brzu komunikaciju svih suvlasnika, ali i predstavnika suvlasnika
koristeći moderne tehnologije. Dijeljenje zajedničkih troškova, građevinska i slična stambena pitanja moći će se rješavati
uz pomoć diskusija u aplikaciji. Svaki će suvlasnik moći pokrenuti diskusiju, ali i sustav glasanja. Aplikacija također nudi
povezivanje na vanjsku aplikaciju StanPlan u kojoj će suvlasnici, povodom pozitivnog ishoda glasanja,
moći otvoriti sastanak i direktno razgovarati o danom problemu.

> Obzirom da je ovo zadani projekt navedite i što želite/jeste novo  naučili.

# Funkcijski zahtjevi
> 
> Aplikacija administratoru omogućava kreiranje drugih korisnika uloga suvlasnika i predstavnika suvlasnika.
> 
> Pri kreiranju novog korisnika, aplikacija dodjeljuje korisničko ime, lozinku i adresu elektroničke pošte.
> 
> Aplikacija omogućava mijenjanje dane početne lozinke koristeći početnu lozinku svakom korisniku.
> 
> Aplikacija svakom suvlasniku omogućava otvaranje diskusije o određenoj temi.
> 
> Aplikacija svakom suvlasniku koji otvara diskusiju omogućava odabir privatnosti diskusije (privatna/javna).
> 
> Aplikacija omogućava da su početne poruke i čitav sadržaj svih javnih diskusija vidljive svim dionicima i mogućnost odgovora s vlastitim porukama.
> 
> Dioniku koji otvara diskusiju aplikacija omogućava određivanje maksimalnog broja odgovora i zabranu sudjelovanja u diskusiji određenim suvlasnicima.
> 
> Aplikacija omogućava da u svakoj privatnoj diskusiji može sudjelovati samo dionik koji ju je otvorio i lista sudionika(u kojoj može, ali ne mora biti predstavnik suvlasnika) koju određuje inicijator diskusije.
> 
> Aplikacija omogućava vidljivost privatne diskusije svim dionicima, ali njen sadržaj samo inicijatoru diskusije i listi sudionika koju je odredio.
> 
> Pri otvaranju javne diskusije, aplikacija omogućava automatsko slanje elektroničke pošte svim dionicima i informira ih o početku nove diskusije.
> 
> Pri otvaranju privatne diskusije, aplikacija omogućava automatsko slanje elektroničke pošte svim dionicima unutar liste sudionika i informira ih o početku nove diskusije u kojoj mogu sudjelovati.
> 
>Inicijatoru diskusije aplikacija omogućava pokretanje glasanja u formatu postavljanja pitanja vezanog uz temu diskusije i odgovora pozitivno/negativno u obliku kontrole odabira odgovora s prikazanim ukupnim brojem odgovora i brojem pozitivnih/negativnih glasova.
> 
> Ako je pokrenuto glasanje, aplikacija omogućava svakom sudioniku diskusije odabir između pozitivnog i negativnog odgovora, a rezultat se osvježava svakim odgovorom.
> 
> Ako broj pozitivnih odgovora bude veći od 25% ukupnog broja suvlasnika iz glasanja, aplikacija omogućava kreiranje poziva na sastanak.
> 
> Aplikacija administratoru omogućava unos adrese StanPlan servera.
> 
> Pri kreiranju sastanka, aplikacija omogućava korištenje vanjske aplikacije StanPlan.
> 
> Pri kreiranju sastanka, aplikacija navodi naslov i termin sastanka i tekst poziva na sastanak(on uključuje dnevni red i ciljeve sastanka).
> 
> Aplikacija ostvaruje serversko sučelje koje omogućava preuzimanje liste diskusija s pozitivnim ishodom glasanja, pri čemu lista sadrži naslov diskusije, poveznice na istu i pitanje pozitivnog ishoda glasanja.
> 
> Aplikacija omogućava proces registracije i prijave putem vanjskog servisa za autentifikaciju OAuth 2.0.

# Nefunkcijski zahtjevi

> Aplikacija osigurava zaštitu osobnih podataka. 
> 
> Aplikacija pruža responzivan dizajn kako bi osigurala optimalan izgled na različitim uređajima.
> 
> Aplikacija ima visoku razinu dostupnosti čak i u vremenu povećanog opterećenja.
> 
> Aplikacija je usklađena sa standardima pristupačnosti.
> 
> Aplikacija je jednostavna za korištenje čak i za nove korisnike.


# Tehnologije

> Backend - Django <br />
> Frontend - React <br />
> Dizajn - Figma <br />
> Baza podataka - PostgreSQL <br />
> Deployment - 

# Članovi tima 
> Noa Zdenčar noa.zdencar@fer.unizg.hr - Voditelj projekta <br />
> Kal Rimac kal.rimac@fer.unizg.hr <br />
> Ivan Radić ivan.radic@fer.unizg.hr <br />
> Ivan Katić ivan.katic@fer.unizg.hr <br />
> Dorijan Strbad dorijan.strbad@fer.unizg.hr <br />
> Borna Milković borna.milkovic@fer.unizg.hr <br />

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
