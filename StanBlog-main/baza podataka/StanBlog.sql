CREATE TABLE Korisnik
(
  sifKorisnik INT NOT NULL,
  korisnickoIme VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  uloga VARCHAR(20) NOT NULL,
  udioVlasnistva FLOAT NOT NULL,
  hashLozinka VARCHAR(100) NOT NULL,
  PRIMARY KEY (sifKorisnik),
  UNIQUE (korisnickoIme),
  UNIQUE (email)
  CHECK (uloga IN ('Suvlasnik', 'Predstavnik suvlasnika', 'Administrator'))
);

CREATE TABLE Diskusija
(
  sifDiskusija INT NOT NULL,
  naslovDiskusije VARCHAR(100) NOT NULL,
  poveznica VARCHAR(100) NOT NULL,
  sadrzajDiskusije VARCHAR(300) NOT NULL,
  jePrivatna BOOLEAN NOT NULL,
  jeAktivna BOOLEAN NOT NULL,
  vrijemeKreiranja TIMESTAMP NOT NULL,
  sifKorisnik INT NOT NULL,
  PRIMARY KEY (sifDiskusija),
  FOREIGN KEY (sifKorisnik) REFERENCES Korisnik(sifKorisnik),
  UNIQUE (poveznica)
);

CREATE TABLE Glasanje
(
  sifGlasanje INT NOT NULL,
  pitanjeGlasanja VARCHAR(100) NOT NULL,
  sifDiskusija INT NOT NULL,
  PRIMARY KEY (sifGlasanje),
  FOREIGN KEY (sifDiskusija) REFERENCES Diskusija(sifDiskusija)
);

CREATE TABLE Sastanak
(
  sifSastanak INT NOT NULL,
  naslovSastanka VARCHAR(100) NOT NULL,
  terminSastanka TIMESTAMP NOT NULL,
  tekstPoziva VARCHAR(300) NOT NULL,
  sifGlasanje INT NOT NULL,
  PRIMARY KEY (sifSastanak),
  FOREIGN KEY (sifGlasanje) REFERENCES Glasanje(sifGlasanje)
);

CREATE TABLE sudjelujeU
(
  ogranicenjePoruka INT NOT NULL,
  sifDiskusija INT NOT NULL,
  sifKorisnik INT NOT NULL,
  PRIMARY KEY (sifDiskusija, sifKorisnik),
  FOREIGN KEY (sifDiskusija) REFERENCES Diskusija(sifDiskusija),
  FOREIGN KEY (sifKorisnik) REFERENCES Korisnik(sifKorisnik)
);

CREATE TABLE glasao
(
  glasaoZa BOOLEAN NOT NULL,
  sifKorisnik INT NOT NULL,
  sifGlasanje INT NOT NULL,
  PRIMARY KEY (sifKorisnik, sifGlasanje),
  FOREIGN KEY (sifKorisnik) REFERENCES Korisnik(sifKorisnik),
  FOREIGN KEY (sifGlasanje) REFERENCES Glasanje(sifGlasanje)
);

CREATE TABLE Poruka
(
  sifPoruka INT NOT NULL,
  sadrzajPoruke VARCHAR(300) NOT NULL,
  sifKorisnik INT NOT NULL,
  sifDiskusija INT NOT NULL,
  PRIMARY KEY (sifPoruka),
  FOREIGN KEY (sifKorisnik) REFERENCES Korisnik(sifKorisnik),
  FOREIGN KEY (sifDiskusija) REFERENCES Diskusija(sifDiskusija)
);