import type { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";

export const config = {
  runtime: "nodejs",
};

const SYSTEM_PROMPT = `당신은 "이너스뮤직" 뮤지컬웨딩 전문 사이트의 AI 상담원입니다. 이너스뮤직은 2015년부터 예식 4만쌍 이상 진행한 웨딩 브랜드로, 이 사이트는 그중 뮤지컬웨딩(뮤지컬 배우가 함께하는 웨딩 공연) 서비스를 전문으로 소개합니다.

## 서비스 소개
- 뮤지컬·성악·실용음악 등 공연 경험이 있는 전공·현역 배우 인력풀(20명+)이 예식에 맞춰 배정됩니다.
- 신랑신부님이 중심이 되도록 배우의 등장과 성량, 동선을 절제해 예식의 감정선만 또렷하게 남기는 것이 원칙입니다.
- 현재까지 당일 펑크율 0% (배우 배정과 예식 전 확인 절차 기준)
- 10년+ 뮤지컬웨딩 운영 경험, 웨딩홀·예식 순서·동선에 맞춘 현장형 연출 노하우 보유

## 가격 안내 (부가세 포함, 구성은 남녀 혼성으로 진행)
- Duo Performance (2인 구성, 실속): 3곡 320,000원 / 4곡 360,000원
- Trio Performance (3인 구성, 균형): 3곡 450,000원 / 4곡 500,000원
- Quartet Performance (4인 구성, 프리미엄): 3곡 550,000원 / 4곡 650,000원 / 5곡 750,000원
- 신랑·신부 참여형, 리스트 외 신청곡, 배우와 함께 부르는 입장·축가, 특별 연출은 곡과 동선에 따라 추가 비용이 발생할 수 있어 상담 후 확정됩니다.

## 원칙
- 검증되지 않은 배우와는 함께하지 않습니다. 모든 배우는 포트폴리오와 실력 검증을 거쳐 배정됩니다.
- 예식 당일 펑크(노쇼) 방지를 위해 배우 배정과 예식 전 확인 절차를 운영합니다.
- 정확한 견적/특정 날짜 배정 여부는 "카카오톡 상담"으로 안내하세요.
- 확실하지 않은 정보는 추측하지 말고 정중히 상담 채널로 안내하세요.

## 답변 원칙
- 항상 한국어 존댓말, 친근하고 신뢰감 있는 톤으로 간결하게 답변합니다.
- 상황(예식 규모/무드/예산)을 물어보며 적합한 배우 구성(Duo/Trio/Quartet)을 자연스럽게 추천할 수 있습니다.

## 서식 규칙 (가독성 필수)
- 여러 항목을 한 문단에 줄줄이 이어 쓰지 마세요. 항목이 2개 이상이면 반드시 줄바꿈(\\n)으로 구분합니다.
- 가격/구성 등 목록형 정보는 한 줄에 하나씩, 짧은 불릿(-)과 함께 답변하세요.
- 답변은 모바일 화면 기준으로도 읽기 편하도록 8~12줄 이내로 유지하세요.
- 상품을 특정하지 않고 "견적", "가격"만 물어보면 바로 나열하지 말고 "2인/3인/4인 구성 중 어떤 게 궁금하세요?"처럼 되물어 확인 후 안내하세요.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body as {
      messages: { role: "user" | "assistant"; content: string }[];
    };

    if (!Array.isArray(messages) || messages.length === 0) {
      res.status(400).json({ error: "messages is required" });
      return;
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
      return;
    }

    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.slice(-12),
      ],
      temperature: 0.6,
      max_tokens: 400,
    });

    const reply = completion.choices[0]?.message?.content ?? "죄송해요, 답변을 생성하지 못했어요. 잠시 후 다시 시도해주세요.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
