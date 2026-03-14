# Zadanie – Developer – Gaelta × Shoptet
**Autor:** Andrii Onopriienko

## Zadanie 1 – Shoptet šablóna – úprava komponentu

### Implementované funkcie:
1. **„Novinka" badge** – zelený štítok pre produkty pridané za posledných 30 dní
2. **Doprava zadarmo** – text „🚚 Doprava zadarmo nad 50 €" sa zobrazí iba pri cene < 50 €
3. **Hover efekt** – tlačidlo „Pridať do košíka" sa zobrazí až po nabehnutí myšou

### Umiestnenie v Shoptete:
| Čo | Kam v admin |
|---|---|
| **HTML** | Šablóna obchodu → Editor šablón → `product-in-category.tpl` |
| **CSS** | Šablóna obchodu → Editor šablón → CSS → `custom.css` |
| **JS** | Šablóna obchodu → Hlavička/pätička → Kód pred `</body>` |

## Zadanie 2 – Shoptet Webhook → Google Sheets 
Spracovanie webhooku z Shoptetu po vytvorení novej objednávky
a zápis dát do Google Sheets cez Google Sheets API v4.
Postup nasadenia:
1. V Shoptet Admin → Integrácie → Webhooky → pridať webhook "order:create"
2. URL nastaviť na endpoint tohto handlera 
3. Vytvoriť Google Service Account a zdieľať spreadsheet s jeho emailom
4. Uložiť credentials.json do rovnakého adresára

### Pseudokód (JS/Node): `webhook-handler.js`
