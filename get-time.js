// api/get-time.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://time100.ru/');
    const html = await response.text();

    // Аналог вашего -match в PowerShell
    const match = html.match(/<span class="time"[^>]*>(\d{2}:\d{2}:\d{2})<\/span>/);

    if (match) {
      const extractedTime = match[1];
      res.status(200).json({
        success: true,
        time: extractedTime,
        source: 'time100.ru'
      });
    } else {
      res.status(404).json({ error: "Не удалось получить данные." });
    }
  } catch (error) {
    res.status(500).json({ error: "Кажется... API не смог получить доступ к данным" });
  }
}
