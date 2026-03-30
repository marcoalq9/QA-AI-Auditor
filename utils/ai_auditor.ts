export interface AuditResult {
  approved: boolean;
  reason: string;
}

export async function auditProductDescription(
  description: string,
): Promise<AuditResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const prompt = `
You are a legal quality auditor. 
Review the following product description:

"${description}"

Respond ONLY in JSON format with the following structure:
{
  "approved": boolean,
  "reason": "string"
}

The "approved" field must be false if the text mentions impossible things or unrealistic guarantees.
`.trim();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Gemini API request failed: ${response.status} - ${errorText}`,
    );
  }

  const data = await response.json();

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: AuditResult;

  try {
    parsed = JSON.parse(rawText) as AuditResult;
  } catch {
    throw new Error(
      `Gemini did not return valid JSON. Raw response: ${rawText}`,
    );
  }

  if (
    typeof parsed.approved !== "boolean" ||
    typeof parsed.reason !== "string"
  ) {
    throw new Error(`Gemini returned invalid schema: ${rawText}`);
  }

  return parsed;
}
