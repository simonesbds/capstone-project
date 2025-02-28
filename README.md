Il mio progetto è un e-commerce per prodotti per la pulizia e l'igiene della casa. Il sito permette agli utenti di registrarsi tramite Clerk, navigare tra i prodotti, aggiungerli al carrello e completare il checkout con Stripe.

                            Struttura del progetto
Frontend: React con React Bootstrap, gestisce l’interazione con l’utente.
Backend: Node.js con Express e Axios, gestisce le API e la comunicazione con il database.
Database: MongoDB, dove vengono salvati utenti, prodotti e ordini.
Autenticazione: Clerk, per la gestione sicura degli accessi.
Pagamenti: Stripe, per il pagamento sicuro degli ordini.

                            Funzionalità principali
- Autenticazione con Clerk:
Gli utenti possono registrarsi con email/password o provider social.
I dati vengono salvati sia in Clerk che nel database MongoDB.

- Gestione prodotti e carrello:
Gli utenti possono visualizzare i prodotti, filtrare per categorie e aggiungere prodotti al carrello.
Il carrello salva i dati localmente per mantenere la sessione.

- Checkout con Stripe:
Il carrello viene inviato al backend per creare una sessione di pagamento.
Stripe gestisce i pagamenti e restituisce lo stato della transazione.

- Pagina "Dove Siamo" con mappa interattiva:
Implementata con React Leaflet, mostra la posizione del negozio.
