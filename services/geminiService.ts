import { GoogleGenAI } from "@google/genai";
import { Transaction, TransactionType } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getFinancialTip = async (transactions: Transaction[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set up your API_KEY environment variable to use AI features.";
  }

  const expenses = transactions.filter(t => t.type === TransactionType.EXPENSE);
  if (expenses.length === 0) {
    return "Adicione algumas despesas para receber uma dica financeira personalizada.";
  }

  const expenseSummary = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {} as Record<string, number>);

  const prompt = `
    Você é um consultor financeiro amigável e prestativo para usuários no Brasil.
    Com base no seguinte resumo de despesas mensais, forneça uma dica financeira curta e prática.
    A moeda é o Real Brasileiro (BRL).
    Seja encorajador e conciso.

    Resumo das Despesas:
    ${JSON.stringify(expenseSummary, null, 2)}

    Sua dica:
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching financial tip from Gemini API:", error);
    return "Desculpe, não consegui gerar uma dica no momento. Tente novamente mais tarde.";
  }
};
