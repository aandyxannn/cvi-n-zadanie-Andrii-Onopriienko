const express = require('express');
const { google } = require('googleapis');
const app = express();
app.use(express.json());
// ============================================================
// Konfigurácia
// ============================================================
const SPREADSHEET_ID = 'YOUR_GOOGLE_SPREADSHEET_ID';
const SHEET_NAME = 'Objednávky';
const CREDENTIALS_PATH = './credentials.json'; // Google Service Account
// ============================================================
// Google Sheets autentifikácia
// ============================================================
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}
// ============================================================
// Webhook endpoint – spracovanie payloadu z Shoptetu
// ============================================================
app.post('/webhook/shoptet', async (req, res) => {
  try {
    const payload = req.body;
    // 1. Validácia – overíme, že payload obsahuje dáta objednávky
    if (!payload || !payload.data) {
      console.error('Neplatný payload:', payload);
      return res.status(400).json({ error: 'Neplatný payload' });
    }
    const order = payload.data;
    // 2. Extrakcia dát z objednávky
    const orderCode = order.code || '';                          // Číslo objednávky
    const createdAt = order.creationTime || '';                  // Dátum vytvorenia
    const customerName = `${order.billingAddress?.firstName || ''} ${order.billingAddress?.lastName || ''}`.trim();
    const customerEmail = order.email || '';                     // E-mail zákazníka
    const customerPhone = order.phone || '';                     // Telefón
    const shippingMethod = order.shipping?.name || '';           // Spôsob dopravy
    const paymentMethod = order.paymentMethod?.name || '';       // Platobná metóda
    const orderStatus = order.status?.name || '';                // Stav objednávky
    const totalPrice = order.price?.vat || 0;                   // Celková suma s DPH
    const currency = order.price?.currency || 'EUR';            // Mena
    // 3. Zoznam produktov – spojíme do jedného reťazca
    const items = (order.items || [])
      .map(item => `${item.name} (${item.amount}× / ${item.price?.vat} ${currency})`)
      .join('; ');
    // Adresa doručenia
    const shippingAddress = order.deliveryAddress
      ? `${order.deliveryAddress.street || ''}, ${order.deliveryAddress.city || ''}, ${order.deliveryAddress.zip || ''}, ${order.deliveryAddress.country || ''}`
      : '';
    // 4. Zápis do Google Sheets
    const sheets = await getGoogleSheetsClient();
    const row = [
      orderCode,        // A – Číslo objednávky
      createdAt,        // B – Dátum
      customerName,     // C – Meno zákazníka
      customerEmail,    // D – E-mail
      customerPhone,    // E – Telefón
      items,            // F – Produkty
      totalPrice,       // G – Celková suma
      currency,         // H – Mena
      shippingMethod,   // I – Doprava
      paymentMethod,    // J – Platba
      shippingAddress,  // K – Adresa doručenia
      orderStatus,      // L – Stav
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:L`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });
    console.log(`✅ Objednávka ${orderCode} zapísaná do Google Sheets`);
    return res.status(200).json({ success: true, order: orderCode });
  } catch (error) {
    console.error('❌ Chyba pri spracovaní webhooku:', error.message);
    return res.status(500).json({ error: 'Interná chyba servera' });
  }
});
// ============================================================
// Spustenie servera
// ============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook server beží na porte ${PORT}`);
});
