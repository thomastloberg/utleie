## V2.0.0
### => React
Migrer Utleiekalkulator v1.0.0 til React<br>
    CSS => SASS Migrering<br>
     JS => React kode<br>
 JQuery => React kode<br><br>

 ### Redesign
 Mindre på hver side.<br>
 Side 1 - Input<br>
        - 1.1 Hent data => JSON?<br>
                Adresse, Bilde, BoligType, Størrelse, Kommunale avgifter, Soverom, Byggeår, Etasje(r), Bruksareal, Primærrom, Energimerking, Rom, Tomteareal, Formuesverdi, Verditakst, Prisantydning, Totalpris, Matrikkelinformasjon, Omkostningsdata, Link komplett salgsoppgave, Visningsinformasjon, Om nabolaget, Finnkode, Sist endret<br>
        - 1.2 Kjøpesum, Effektiv Lånerente, Egenkapital, Ekstra utlegg ifht. kjøp, Kommunale avgifter, fellesutgifter, <br>
        - 1.3 Ikke nødvendig: Vedlikehold, husforsikring, søppelhandtering, feier, eiendomsskatt, enhets type: leilighet/enebolig++<br>
        - 1.4 Ikke nødvendig: Leieinntekter 1,2,3,4,5<br>
        - 1.5 Ikke nødvendig: Antall år investering<br>
        - 1.6 Ikke nødvendig: Andre data => <br>
 Side 2 - Faner<br>
        - Nøkkeltall<br>
            - Annonse<br>
            - Total Kjøpesum<br>
            - Forhåndskostnad<br>
            - Formueverdi<br>
            - LÅN<br>
        - Total Oversikt MND/ÅR<br>
 Side 3 - Plan<br><br>

### Utleiepris
Kalkuler minimum utleie beløp<br>
Maksimalpris vanskelig å estimere. Innverknad:<br>
    * Lokasjon<br>
    * Antall soverom<br>
    * Beregnet kunde: Singel / Familie / Student / Korttidsleie<br><br>


### Importert
Importere data fra Finn.no fra link eller Finnkode<br><br>

### Del
Generer json fil som inneholder data du la inn til share/<br><br>



## v2.5.0
### Faner
Enkel<br>
All data<br>
Kalkulering<br><br>


## v3.0.0
### Korttidsleie / Airbnb

### Generelt Lån
Lån, Periode, Nominell+Effektiv Rente => Plan<br><br>

### Lånegrad
Inntekt x5 => Maksimal Lånegrad<br>
Minus huslån, studielån, billån, forbrukslån, kredittkort++<br>
Flere kjøpere? +deres inntekt x5--<br>
Egenkapital, kausjonist? Verdi i eksisterende bolig?<br>
Maksimal evt. renteøkning? 5%, Kostnadsøkning? 10%<br>
Bokostnader<br>
- Mat/drikke, Mobil, Forsikringer, Strøm, Transport++<br><br>




## V1.0.0

[Utleiekalkulator v1.0.0](https://utleie.tloberg.net/)