import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { generateFallbackTripPlan, generateFallbackItem } from "./src/data/fallbackGenerator";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Lazy Gemini initialization helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY environment variable is not configured.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API to generate complete Trip Plan with Google Search grounding
  app.post("/api/plan/generate", async (req, res) => {
    try {
      const {
        destination,
        occasion,
        durationDays = 3,
        travelersCount = 2,
        travelerType = "Couple",
        budget = "Moderate",
        pace = "Balanced",
        dietary = [],
        interests = [],
        specialRequirements = "",
      } = req.body;

      if (!destination || typeof destination !== "string" || !destination.trim()) {
        return res.status(400).json({ error: "Destination is required." });
      }

      const ai = getGeminiClient();

      const prompt = `You are a world-class travel guide and itinerary architect.
Plan a highly detailed, realistic, and tailored ${durationDays}-day trip to ${destination}.

Trip Preferences:
- Destination: ${destination}
- Occasion: ${occasion || "Leisure / Vacation"}
- Duration: ${durationDays} days
- Group Size: ${travelersCount} travelers (${travelerType})
- Budget Level: ${budget}
- Travel Pace: ${pace}
- Dietary Preferences: ${dietary.length > 0 ? dietary.join(", ") : "Local cuisine, open to anything"}
- Interests & Hobbies: ${interests.length > 0 ? interests.join(", ") : "Sightseeing, food, iconic culture"}
${specialRequirements ? `- Special Notes/Requests: ${specialRequirements}` : ""}

CRITICAL REQUIREMENTS:
1. Ground your recommendations in current real-world details using Google Search for ${destination}. Check real places, popular and top-rated restaurants, realistic transportation methods (subway lines, bus routes, walking times, train passes, airport transfers), opening hours, and practical tips.
2. For EVERY single day (Day 1 through Day ${durationDays}), provide:
   - Day theme & descriptive overview.
   - Chronological schedule items covering Morning, Afternoon, Evening, and Night.
   - Categorize each schedule item precisely as one of: "place", "food", "activity", or "transport".
   - For "food": specify exact restaurant/cafe name, meal type (breakfast/lunch/dinner/snack), signature dishes, price range, and whether reservations are recommended.
   - For "transport": specify exact transit mode (metro line, walking, ferry, bus, taxi), departure/arrival spots, transit duration, and approximate fare.
   - For "place": specify landmark/attraction name, address/neighborhood, entry cost/ticketing tip, best time to visit, and approximate coordinates (lat, lng).
   - For "activity": specify curated activity (e.g. cooking class, sunset cruise, temple tour, shopping street exploration), duration, and booking advice.
3. Include comprehensive Local Transportation advice (metro passes, taxi apps like Grab/Uber/local taxi, airport connection, ticketing advice).
4. Include Weather & Seasonal summary, Packing Checklist, and Estimated Budget breakdown.

OUTPUT FORMAT:
You MUST respond with a single valid JSON object strictly matching this schema (do NOT wrap in extra prose, just valid JSON or a \`\`\`json markdown block):

{
  "destination": "${destination}",
  "occasion": "${occasion || "Vacation"}",
  "durationDays": ${durationDays},
  "travelersCount": ${travelersCount},
  "travelerType": "${travelerType}",
  "budget": "${budget}",
  "pace": "${pace}",
  "overview": "Rich 2-3 paragraph overview of the curated journey",
  "weatherSummary": "Real seasonal weather expectations and what to wear",
  "currencyAndCostEstimate": {
    "currency": "Local currency and USD equivalent",
    "estimatedTotalPerPerson": "$XXX - $YYY",
    "breakdown": "Daily food ~$X, transit ~$Y, attractions ~$Z"
  },
  "transportationGuide": {
    "overview": "General transit advice for the city",
    "recommendedPasses": "Specific transit cards or passes (e.g. Suica, Navigo, MetroCard)",
    "metroBusTips": "Tips on navigating local trains, metros, or buses",
    "airportTransfer": "Best way to get from the main airport to central city",
    "rideSharing": "Local taxi/ride apps recommended (e.g. Uber, Grab, Bolt, KakaoT)"
  },
  "packingAndPrepTips": [
    "Tip 1",
    "Tip 2",
    "Tip 3",
    "Tip 4"
  ],
  "days": [
    {
      "dayNumber": 1,
      "title": "Day 1: Theme Title",
      "summary": "Short summary of the day's focus",
      "schedule": [
        {
          "id": "d1-s1",
          "time": "08:30 AM",
          "timeSlot": "morning",
          "title": "Breakfast at Specific Cafe",
          "category": "food",
          "description": "Description of why to visit and what to experience",
          "location": "District or specific address",
          "duration": "1 hour",
          "costEstimate": "$10 - $15",
          "tips": "Try the freshly baked croissants",
          "coordinates": { "lat": 0.0, "lng": 0.0 },
          "foodDetail": {
            "mealType": "breakfast",
            "cuisine": "French Bakery",
            "recommendedDishes": ["Croissant", "Cafe au lait"],
            "priceRange": "$$",
            "reservationNeeded": false
          }
        },
        {
          "id": "d1-s2",
          "time": "09:45 AM",
          "timeSlot": "morning",
          "title": "Metro from Cafe to Landmark",
          "category": "transport",
          "description": "Take Line 1 from Station A to Station B",
          "location": "Metro Station",
          "duration": "20 mins",
          "costEstimate": "$2.15 (Single ticket)",
          "tips": "Tap with contactless credit card or transit pass",
          "transportDetail": {
            "mode": "subway",
            "route": "Line 1 Eastbound",
            "duration": "20 mins",
            "cost": "$2.15"
          }
        },
        {
          "id": "d1-s3",
          "time": "10:15 AM",
          "timeSlot": "morning",
          "title": "Explore Landmark Name",
          "category": "place",
          "description": "Deep dive into history and key spots to see",
          "location": "Exact address or district",
          "duration": "2.5 hours",
          "costEstimate": "€17 / Free gardens",
          "tips": "Book timed-entry slot online in advance",
          "coordinates": { "lat": 0.0, "lng": 0.0 }
        }
      ]
    }
  ]
}`;

      // Multi-tier model cascade adhering to Gemini API skill guidelines:
      // 1. gemini-3.8-flash with Google Search grounding
      // 2. gemini-3.1-flash-lite with Google Search grounding
      // 3. gemini-3.8-flash without search grounding (in case search quota exhausted)
      // 4. gemini-3.1-flash-lite without search grounding
      const attempts = [
        { model: "gemini-3.8-flash", tools: [{ googleSearch: {} }] },
        { model: "gemini-3.1-flash-lite", tools: [{ googleSearch: {} }] },
        { model: "gemini-3.8-flash", tools: [] },
        { model: "gemini-3.1-flash-lite", tools: [] },
      ];

      let response: any = null;
      let lastError: any = null;

      for (const attempt of attempts) {
        try {
          const config: any = {
            systemInstruction:
              "You are an elite travel planner and itinerary creator. Ground your answers in real-time information with Google Search when available. Always respond in valid, parseable JSON representing the complete trip plan.",
          };
          if (attempt.tools && attempt.tools.length > 0) {
            config.tools = attempt.tools;
          }

          response = await ai.models.generateContent({
            model: attempt.model,
            contents: prompt,
            config,
          });

          if (response && response.text) {
            console.log(`Successfully generated trip plan using model ${attempt.model} (tools: ${attempt.tools.length})`);
            break;
          }
        } catch (callErr: any) {
          lastError = callErr;
          const errMsg = callErr?.message || String(callErr);
          console.warn(
            `Attempt with ${attempt.model} (tools: ${attempt.tools.length}) failed:`,
            errMsg
          );

          // If quota exhausted (HTTP 429 / RESOURCE_EXHAUSTED), other models on this key will also be quota exhausted.
          // Exit immediately to invoke rich fallback without making user wait through sequential timeouts.
          if (errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("quota") || callErr?.status === 429) {
            console.warn("Detected 429 RESOURCE_EXHAUSTED. Proceeding immediately to curated itinerary generator.");
            break;
          }
        }
      }

      // If all Gemini attempts failed (e.g. 429 quota exhaustion or network timeout), generate a rich, curated fallback plan
      if (!response || !response.text) {
        console.warn("All Gemini API attempts failed. Invoking rich tailored offline itinerary generator.");
        const fallbackPlan = generateFallbackTripPlan({
          destination,
          occasion,
          durationDays,
          travelersCount,
          travelerType,
          budget,
          pace,
          dietary,
          interests,
          specialRequirements,
        });

        return res.json({
          success: true,
          plan: fallbackPlan,
          quotaExceeded: true,
          warning: "Gemini API quota exceeded (HTTP 429). A full curated itinerary was generated for your destination."
        });
      }

      const responseText = response.text || "";

      // Extract search grounding metadata sources
      const groundingChunks =
        response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources: Array<{ title: string; url: string }> = [];

      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          sources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          });
        }
      }

      // Parse JSON from model output
      let planData;
      try {
        // Look for ```json ... ``` block or clean raw json
        const jsonMatch =
          responseText.match(/```json\s*([\s\S]*?)\s*```/) ||
          responseText.match(/```\s*([\s\S]*?)\s*```/);
        const cleanString = jsonMatch ? jsonMatch[1].trim() : responseText.trim();
        planData = JSON.parse(cleanString);
      } catch (parseError) {
        console.error("JSON parse failed, attempting fallback extraction:", parseError);
        // Secondary attempt: find the outermost braces
        const firstBrace = responseText.indexOf("{");
        const lastBrace = responseText.lastIndexOf("}");
        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
          const slice = responseText.substring(firstBrace, lastBrace + 1);
          planData = JSON.parse(slice);
        } else {
          // If model output wasn't valid JSON, fallback gracefully
          console.warn("Model response unparseable. Providing rich fallback plan.");
          const fallbackPlan = generateFallbackTripPlan({
            destination,
            occasion,
            durationDays,
            travelersCount,
            travelerType,
            budget,
            pace,
            dietary,
            interests,
            specialRequirements,
          });
          return res.json({ success: true, plan: fallbackPlan });
        }
      }

      // Attach sources and return
      planData.sources = sources;
      planData.createdAt = new Date().toISOString();

      return res.json({ success: true, plan: planData });
    } catch (err: any) {
      console.error("Error generating trip plan:", err);
      // Even in top-level catch (e.g. missing API key or client initialization error), deliver a curated trip plan!
      try {
        const fallbackPlan = generateFallbackTripPlan({
          destination: req.body?.destination || "Tokyo, Japan",
          occasion: req.body?.occasion || "Vacation / Leisure",
          durationDays: req.body?.durationDays || 3,
          travelersCount: req.body?.travelersCount || 2,
          travelerType: req.body?.travelerType || "Couple",
          budget: req.body?.budget || "Moderate",
          pace: req.body?.pace || "Balanced",
          dietary: req.body?.dietary || [],
          interests: req.body?.interests || [],
          specialRequirements: req.body?.specialRequirements || "",
        });

        return res.json({
          success: true,
          plan: fallbackPlan,
          quotaExceeded: true,
          warning: "Gemini API temporarily unavailable or quota exceeded (HTTP 429). A full curated itinerary was provided."
        });
      } catch (fallbackErr) {
        return res.status(500).json({
          error: err?.message || "Failed to generate trip plan. Please verify the Gemini API key and try again.",
        });
      }
    }
  });

  // API to refine or replace a single activity or meal
  app.post("/api/plan/regenerate-item", async (req, res) => {
    try {
      const { destination, currentItem, category, reason } = req.body;
      let itemData: any = null;

      try {
        const ai = getGeminiClient();

        const prompt = `For a trip in ${destination}, suggest 1 alternative recommendation to replace:
Current Item: "${currentItem?.title}" (${currentItem?.category})
Category needed: ${category || currentItem?.category}
User note / reason for change: ${reason || "Different alternative recommendation"}

Provide a single JSON object matching:
{
  "title": "New Title",
  "category": "${category || currentItem?.category}",
  "description": "Concise appealing description",
  "location": "Address or neighborhood in ${destination}",
  "duration": "1.5 hours",
  "costEstimate": "$10 - $25",
  "tips": "Practical tip",
  "foodDetail": { "mealType": "lunch", "cuisine": "Local", "recommendedDishes": ["dish"], "priceRange": "$$", "reservationNeeded": false },
  "transportDetail": { "mode": "subway", "route": "Line 2", "duration": "15m", "cost": "$2" }
}`;

        const modelList = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
        for (const mod of modelList) {
          try {
            const response = await ai.models.generateContent({
              model: mod,
              contents: prompt,
            });

            const responseText = response.text || "";
            const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
            const cleanString = jsonMatch ? jsonMatch[1].trim() : responseText.trim();
            const firstBrace = cleanString.indexOf("{");
            const lastBrace = cleanString.lastIndexOf("}");
            if (firstBrace !== -1 && lastBrace !== -1) {
              itemData = JSON.parse(cleanString.substring(firstBrace, lastBrace + 1));
              break;
            }
          } catch (modelErr: any) {
            const errStr = modelErr?.message || String(modelErr);
            console.warn(`regenerate-item model ${mod} failed:`, errStr);
            if (errStr.includes("429") || errStr.includes("RESOURCE_EXHAUSTED") || modelErr?.status === 429) {
              break;
            }
          }
        }
      } catch (geminiErr) {
        console.warn("Gemini client unavailable for regenerate-item, using smart fallback:", geminiErr);
      }

      if (!itemData) {
        itemData = generateFallbackItem(destination, currentItem, category, reason);
      }

      return res.json({ success: true, item: itemData });
    } catch (err: any) {
      console.error("Error regenerating item:", err);
      const fallbackItem = generateFallbackItem(req.body?.destination || "Destination", req.body?.currentItem, req.body?.category, req.body?.reason);
      return res.json({ success: true, item: fallbackItem });
    }
  });

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Trip Planner server running on port ${PORT}`);
  });
}

startServer();
