"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");


interface InventoryItem {
    name: string;
    stock: number;
}

interface ChatContext {
    inventory: InventoryItem[];
    salesStats: {
        revenue: number;
        transactions: number;
        itemsSold: number;
    };
}

export async function getGeminiResponse(message: string, context: ChatContext) {
    try {
        if (!process.env.GEMINI_API_KEY) {
            throw new Error("GEMINI_API_KEY is not set in environment variables");
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Construct a context-aware system prompt
        const systemPrompt = `
      You are an intelligent Retail Assistant for a store management dashboard.
      Your goal is to help the retailer understand their store performance, inventory, and sales.
      
      Here is the current real-time data from the store:
      
      INVENTORY OVERVIEW:
      Total Products: ${context.inventory.length}
      Low Stock Items (<20 units): ${context.inventory.filter((i) => i.stock < 20).map((i) => `${i.name} (${i.stock})`).join(", ")}
      
      SALES STATISTICS (Today):
      Total Revenue: $${context.salesStats.revenue.toFixed(2)}
      Total Transactions: ${context.salesStats.transactions}
      Items Sold: ${context.salesStats.itemsSold}
      
      Please answer the user's question based on this data. 
      Be concise, professional, and helpful. 
      If the user asks about something not in the data, politely say you don't have that information.
      Do not invent data.
    `;

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist with the store data provided." }],
                },
            ],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        return response.text();

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to my AI brain right now. Please check your API key or try again later.";
    }
}
