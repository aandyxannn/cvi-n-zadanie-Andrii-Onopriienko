# Zadanie – Developer – Gaelta × Shoptet
Autor: Andrii Onopriienko
Zadanie 1 – Shoptet šablóna – úprava komponentu

Kam umiestniť kód v Shoptet

HTML/JS: Administrácia → Šablóna obchodu → Editor šablón → Šablóny → product-in-category.tpl — toto je šablóna karty produktu v kategórii.

CSS: Administrácia → Šablóna obchodu → Editor šablón → CSS → custom.css (alebo Šablóna → Vlastné CSS).

JS: Administrácia → Šablóna obchodu → Hlavička/pätička → pole „Kód pred </body>" — pre vlastné skripty.

Alternatívne: Použite doplnok „Vlastný kód" z marketplace Shoptet na vloženie HTML/CSS/JS bez úpravy šablón.

Zadanie 2 – Shoptet Webhook → Google Sheets // webhook-handler.js
Spracovanie webhooku z Shoptetu po vytvorení novej objednávky
a zápis dát do Google Sheets cez Google Sheets API v4.
Postup nasadenia:
1. V Shoptet Admin → Integrácie → Webhooky → pridať webhook "order:create"
2. URL nastaviť na endpoint tohto handlera (napr. https://your-server.com/webhook/shoptet)
3. 3. Vytvoriť Google Service Account a zdieľať spreadsheet s jeho emailom
4. Uložiť credentials.json do rovnakého adresára
