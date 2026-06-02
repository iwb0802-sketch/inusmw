/*
 * Design Philosophy: Noir Deco Theatre
 * 이 파일은 블랙 무대감, 앤티크 골드의 격식, 이너스뮤직 민트의 신뢰감을 바탕으로
 * 사용자가 제공한 상품·가격·후기 자료를 원본 이미지 나열 없이 프리미엄 상세페이지 흐름으로 재해석한다.
 * 8차 프로필 규칙: 배우 사진은 원형 강제 크롭을 피하고, 동일한 포스터형 프레임 안에서 얼굴 중심과 카드 기준선을 맞춘다.
 */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import InusCardPopup from "@/components/InusCardPopup";
import { useEffect, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Crown,
  ExternalLink,
  FileCheck2,
  Gift,
  HeartHandshake,
  ListMusic,
  Menu,
  MessageCircle,
  Mic2,
  Music2,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663600657495/QvBn3XoVSZ7dCLckkzSdvB/hero_candidate_A-dedcMMEv2BSroRSaouSBje.webp";
const microphoneImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663600657495/QvBn3XoVSZ7dCLckkzSdvB/inus_gold_microphone_detail-KjPgk33rsvS9qAceb4JQnJ.webp";
const patternImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663600657495/QvBn3XoVSZ7dCLckkzSdvB/inus_mint_gold_music_pattern-6kYtATfLAYnC6TFQDzMUqi.webp";

const kakaoChatUrl = "https://pf.kakao.com/_wxovaM/chat";
const packageUrl = "https://blog.naver.com/inusmusics/220652965646";
const reviewUrl = "http://musicin.godohosting.com/bbs/board.php?bo_table=forum";
const musicalSongUrl = "https://blog.naver.com/inusmusics/223839441679";
const eventBenefitUrl = "https://blog.naver.com/inusmusics/220652958346";
const videoArchiveUrl = "https://blog.naver.com/PostThumbnailList.nhn?isHttpsRedirect=true&from=postList&blogId=inusmusics&categoryNo=40&currentPage=1";

const navItems = [
  ["메인", "#top"],
  ["소개", "#story"],
  ["영상", "#video"],
  ["후기", "#reviews"],
  ["견적", "#consult"],
];

const serviceDropdownItems = [
  { label: "결혼식사회", href: "https://inusmc.co.kr" },
  { label: "클래식연주", href: "https://www.inusclassic.kr/" },
  { label: "재즈연주", href: "https://inusjazz.kr/" },
  { label: "축가", href: "https://inusmusic.kr/" },
  { label: "모바일청첩장", href: "https://inuscard.com" },
  { label: "완성패키지", href: "https://blog.naver.com/inusmusics/220652965646" },
];

const trustPoints = [
  { value: "0%", label: "현재까지 당일 펑크율", caption: "배우 배정과 예식 전 확인 절차를 기준으로 안정적인 진행을 우선합니다.", icon: ShieldCheck },
  { value: "10년+", label: "뮤지컬웨딩 운영 경험", caption: "웨딩홀, 예식 순서, 동선에 맞춘 현장형 연출 노하우를 축적했습니다.", icon: Award },
  { value: "20명+", label: "전공·현역 배우 인력풀", caption: "포트폴리오와 실력 검증을 거친 배우진을 예식에 맞춰 배정합니다.", icon: Users },
];

const concerns = [
  ["너무 과해 보이지 않을까?", "신랑신부님이 중심이 되도록 배우의 등장과 성량, 동선을 절제해 예식의 감정선만 또렷하게 남깁니다."],
  ["웨딩홀 분위기와 맞을까?", "홀 구조와 입장 동선, 예식 순서를 먼저 확인한 뒤 곡과 등장을 맞춰 부담 없는 공연감으로 조율합니다."],
  ["당일에 문제가 생기면 어떡하지?", "도착 시간, 사회자 멘트 조율, 리허설 절차로 예식 당일 커뮤니케이션을 미리 정리합니다."],
];

const primaryVideos = [
  { title: "뮤지컬웨딩 오프닝축가: 웨딩데이", scene: "Opening Song", embed: "https://www.youtube.com/embed/yfmByEolXf4" },
  { title: "뮤지컬웨딩 축가: 성혼선언가", scene: "Declaration Song", embed: "https://www.youtube.com/embed/wf-DJdRBTWo" },
  { title: "뮤지컬웨딩 축가: 좋겠다", scene: "Blessing Song", embed: "https://www.youtube.com/embed/J5d_skkGdZs" },
  { title: "뮤지컬웨딩 행진: 안녕", scene: "Final March", embed: "https://www.youtube.com/embed/9nSLO6RfCBg" },
];

const reviewImages = [
  { src: "/images/inus-review-slide-1.jpg", alt: "실제 고객 만족후기 캡처 1" },
  { src: "/images/inus-review-slide-2.jpg", alt: "실제 고객 만족후기 캡처 2" },
  { src: "/images/inus-review-slide-3.jpg", alt: "실제 고객 만족후기 캡처 3" },
  { src: "/images/inus-review-slide-4.jpg", alt: "실제 고객 만족후기 캡처 4" },
];

const processSteps = [
  { no: "01", title: "오프닝", body: "예식 시작 분위기 정돈" },
  { no: "02", title: "화촉점화", body: "양가 어머님 입장 연결" },
  { no: "03", title: "신랑입장", body: "밝고 힘 있는 등장" },
  { no: "04", title: "신부입장", body: "감정선이 살아나는 입장" },
  { no: "05", title: "동시입장", body: "두 분이 함께 여는 장면" },
  { no: "06", title: "한곡 따로 입장", body: "입장곡 별도 구성" },
  { no: "07", title: "축가", body: "배우 보컬 중심 축하" },
  { no: "08", title: "행진", body: "마지막 박수까지 연결" },
  { no: "09", title: "이벤트", body: "참여형 장면 별도 설계" },
];

const productTypes = [
  { title: "실속형", subtitle: "3곡", body: "필요한 장면만 담는 기본 구성", icon: Mic2 },
  { title: "일반형", subtitle: "4곡", body: "입장·축가·행진을 자연스럽게 연결", icon: ListMusic },
  { title: "고급형", subtitle: "5곡", body: "공연감을 더 살리는 프리미엄 구성", icon: Crown },
  { title: "참여형", subtitle: "별도 상담", body: "신랑·신부 참여곡과 신청곡 조율", icon: HeartHandshake },
];

const songGroups = [
  {
    title: "오프닝·퍼포먼스",
    songs: ["Be Our Guest", "Wedding Day", "Can't Help Falling in Love", "Beauty and the Beast", "알 수 없는 그곳으로", "Ring in the Season"],
  },
  {
    title: "화촉점화",
    songs: ["Tonight I Celebrate My Love", "10월의 어느 멋진 날에", "엄마가 딸에게", "You Raise Me Up"],
  },
  {
    title: "신랑입장",
    songs: ["Marry You", "I Was Born To Love You", "Viva La Vida", "너에게로 가는 길", "질풍가도"],
  },
  {
    title: "신부입장",
    songs: ["A Whole New World", "A Thousand Years", "How Long Will I Love You", "She", "Someday My Prince Will Come", "I See The Light", "Can’t Help Falling in Love", "My Heart Will Go On", "상상", "마음을 드려요"],
  },
  {
    title: "축가, 행진",
    songs: ["좋겠다", "Beautiful Day", "Never Enough", "Another Day of Sun", "Can’t Take My Eyes Off You", "안녕", "메리유"],
  },
  {
    title: "신랑·신부 댄스 참여형",
    songs: ["Marry You", "Uptown Funk", "사랑스러워", "Cheer Up", "연예인", "Sugar"],
  },
];

const repertoireGroups = [
  {
    title: "오프닝·퍼포먼스",
    caption: "예식의 첫 장면을 공연처럼 열어주는 곡",
    songs: ["Be Our Guest", "Wedding Day", "One Short Day", "Do You Hear The People Sing", "Another Day of Sun", "Ring in the Season", "지금 이 순간", "This Is Me", "The Greatest Show", "007 퍼포먼스"],
  },
  {
    title: "양가어머님·화촉점화",
    caption: "부모님 입장과 화촉점화에 어울리는 감동형 곡",
    songs: ["10월의 어느 멋진 날에", "엄마가 딸에게", "You Raise Me Up", "Tale as Old as Time", "Tonight I Celebrate My Love", "Beauty and the Beast", "Can't Help Falling in Love", "L-O-V-E"],
  },
  {
    title: "신랑입장",
    caption: "밝고 힘 있는 등장감을 살리는 곡",
    songs: ["Marry You", "I Was Born To Love You", "Viva La Vida", "너에게로 가는 길", "질풍가도", "시작", "Just The Way You Are", "알리왕자", "지금 이 순간", "연예인"],
  },
  {
    title: "신부입장",
    caption: "신부님의 걸음과 감정선을 섬세하게 살리는 곡",
    songs: ["A Whole New World", "A Thousand Years", "How Long Will I Love You", "She", "Someday My Prince Will Come", "I See The Light", "Can't Help Falling in Love", "My Heart Will Go On", "Je T’aime", "상상", "마음을 드려요", "Love Wins All"],
  },
  {
    title: "동시입장·예물교환",
    caption: "두 사람의 동선과 서약 분위기를 연결하는 곡",
    songs: ["A Whole New World", "Beauty and the Beast", "알 수 없는 그곳으로", "Tonight I Celebrate My Love", "My Destiny", "One Short Day", "사랑하면 서로를 알 수 있어", "Some Things Never Change", "How Deep Is Your Love", "좋은 날"],
  },
  {
    title: "축가·축무",
    caption: "축하의 메시지와 공연감을 함께 전달하는 곡",
    songs: ["좋겠다", "사랑해", "감사", "안녕", "물론", "오르막길", "두 사람", "결혼해줄래", "성혼선언가", "Love Is an Open Door", "Can’t Take My Eyes Off You", "My Destiny"],
  },
  {
    title: "행진·퇴장",
    caption: "예식의 마무리를 밝고 축제감 있게 여는 곡",
    songs: ["Love Is an Open Door", "All About You", "Beautiful Day", "좋겠다", "Can’t Take My Eyes Off You", "Marry You", "Isn’t She Lovely", "행복을 주는 사람", "동행", "Welcome to the Show", "Another Day of Sun", "한 페이지가 될 수 있게"],
  },
  {
    title: "이벤트·참여형",
    caption: "신랑·신부 참여와 댄스 이벤트로 확장 가능한 곡",
    songs: ["Marry You", "Uptown Funk", "사랑스러워", "Sugar", "This Is Me", "연예인", "Super Shy", "우리집", "영원한 사랑", "어머님이 누구니", "Cheer Up", "틱톡 댄스 챌린지 최신곡 상담"],
  },
];

const sampleVideos = [
  { title: "남과여", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=C466FCDBC2F37F3BA35181E760F310062BC7&outKey=V12888cb350001252eb2de02f448c29271f60228ff1b792491bd6e02f448c29271f60&width=544&height=306" },
  { title: "Tonight I Celebrate My Love For You", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=EC841CE2946F5B560F3A56077E922408F28A&outKey=V123e50c9ed60c5efd0075f755c910e5a6dbe29b06aee4c6f02bc5f755c910e5a6dbe&width=544&height=306" },
  { title: "지금 이 순간", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=375E0BC24A35651338DA6ADFD10800810E81&outKey=V123770f16af21e76304fc413b51fee46ccd9a23c04a2fc5642a3c413b51fee46ccd9&width=544&height=306" },
  { title: "사랑은 열린문", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=5B595C338D4E39A87E3BB9F35E9BB7398AFC&outKey=V1235702208ba5c0d5805757bd6f9e80411aa8699fd94ca305514757bd6f9e80411aa&width=544&height=306" },
  { title: "사랑하면 서로를 알 수 있어", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=CD46F3B9133372D36155E77B8BF50C066627&outKey=V123aa00a228eac54135ef304a285d6f73523cdcdefea66fbbfc2f304a285d6f73523&width=544&height=306" },
  { title: "메리유", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=81D593B61FF86792B353FE57369B45F80247&outKey=V127e2ef640f9dc66e0c0b2bc6edd3ea07a14f32eb14ebfcb848db2bc6edd3ea07a14&width=544&height=306" },
  { title: "Season of Love", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=87EEDCC92461CF74444F4496BD6CF69AE726&outKey=V1286797a5308e0bc08da51d1ae7ac3c51b59948f82f1107cc2e851d1ae7ac3c51b59&width=544&height=306" },
  { title: "Can’t Take My Eyes Off You", src: "https://serviceapi.nmv.naver.com/flash/convertIframeTag.nhn?vid=589347779EB5CA627393F50A90352DF3E3D1&outKey=V121035bcdd6ca6a54d98c4bb43c3dabf3d306987d7d7feee5970c4bb43c3dabf3d30&width=544&height=306" },
];

const packages = [
  {
    title: "Duo Performance",
    people: "2인 구성",
    accent: "실속",
    description: "가장 필요한 장면에 집중해 부담 없이 뮤지컬웨딩의 분위기를 더합니다.",
    prices: [
      ["3곡", "320,000원", "실속"],
      ["4곡", "360,000원", "일반"],
    ],
  },
  {
    title: "Trio Performance",
    people: "3인 구성",
    accent: "균형",
    description: "입장, 축가, 행진 장면을 조금 더 풍성하게 채우고 싶은 예식에 어울리는 구성입니다.",
    prices: [
      ["3곡", "450,000원", "실속"],
      ["4곡", "500,000원", "일반"],
    ],
  },
  {
    title: "Quartet Performance",
    people: "4인 구성",
    accent: "프리미엄",
    description: "입장부터 축가, 행진까지 공연의 밀도를 높이고 싶은 예식에 적합합니다.",
    prices: [
      ["3곡", "550,000원", "실속"],
      ["4곡", "650,000원", "일반"],
      ["5곡", "750,000원", "고급"],
    ],
  },
];

const managerProfile = {
  name: "이승현",
  title: "뮤지컬팀장",
  image: "/images/inus-profile-face-lee-seunghyun-manager.webp",
  summary: "공연 경력과 보컬 트레이닝 경험을 바탕으로 예식 흐름, 배우 배정, 현장 큐를 조율합니다.",
};

const directorHighlights = [
  "국민대학교 예술대학 연극영화 전공",
  "전국 영어 뮤지컬 콩쿠르 대상 수상",
  "West Side Story·Footloose 등 다수 공연",
  "뮤지컬 웨딩&축가 경력 10년+",
];

const actorCastProfiles = [
  { name: "나서영", role: "뮤지컬 배우", image: "/images/inus-profile-face-na-seoyoung.webp" },
  { name: "박예인", role: "뮤지컬 배우", image: "/images/inus-profile-face-park-yein.webp" },
  { name: "이진수", role: "뮤지컬 배우", image: "/images/inus-profile-face-lee-jinsoo.webp" },
  { name: "정예지", role: "뮤지컬 배우", image: "/images/inus-profile-face-jung-yeji.webp" },
  { name: "정유근", role: "뮤지컬 배우", image: "/images/inus-profile-face-jung-yoogeun.webp" },
  { name: "주승진", role: "뮤지컬 배우", image: "/images/inus-profile-face-joo-seungjin.webp" },
];

const benefitCards = [
  { title: "숨고 리뷰 참여 혜택", body: "숨고에 상담 리뷰 작성시 최대 2만원 할인과 더불어 결혼준비에 필요한 체크리스트 자료를 드립니다." },
  { title: "블로그 홍보 추가 혜택", body: "블로그 홍보 참여 고객님께는 별도 추가 혜택을 드립니다.", actionLabel: "참여혜택 보기", actionUrl: eventBenefitUrl },
];

const assuranceItems = [
  { title: "계약 기반 진행", body: "상담 후 확정된 구성과 일정은 계약 절차로 정리합니다. 준비 과정의 불확실성을 낮춥니다.", icon: FileCheck2 },
  { title: "1차·2차 현장 체크", body: "2시간 전 1차, 1시간 전 2차로 음향·동선·큐 타이밍을 확인합니다.", icon: CheckCircle2 },
  { title: "사회자 멘트 조율", body: "입장, 축가, 이벤트가 자연스럽게 이어지도록 사회자와 현장 커뮤니케이션을 조율합니다.", icon: HeartHandshake },
];

const quickLinks = [
  ["더 많은 영상보기", videoArchiveUrl],
  ["이너스 예약하기", "https://blog.naver.com/inusmusics/223023961320"],
  ["후기글 보기", "https://blog.naver.com/inusmusics/223023835728"],
  ["이너스 진행이력", "https://blog.naver.com/inusmusics/221231802647"],
  ["이너스 예약현황", "http://inusmusics.dothome.co.kr/xe/board_nOmW18/"],
];

const additionalOptionServices = [
  { title: "완성패키지", subtitle: "Complete Package", body: "예식 음악과 진행 옵션을 한 번에 구성하고 싶을 때 확인하는 완성형 패키지입니다.", href: "https://blog.naver.com/inusmusics/220652965646" },
  { title: "클래식연주", subtitle: "Ceremony Classic", body: "현악·클래식 무드로 예식의 격식을 더하는 옵션입니다.", href: "https://inusclassic.kr/" },
  { title: "재즈연주", subtitle: "Live Jazz", body: "리셉션과 식전 분위기를 부드럽게 만드는 라이브 재즈 구성입니다.", href: "https://inusjazz.kr/" },
  { title: "모바일청첩장", subtitle: "Mobile Invitation", body: "이너스뮤직이 만드는 감성 모바일 청첩장. 20만원 이상 예약 고객 무료 제작 지원.", href: "https://inuscard.com" },
  { title: "사회자", subtitle: "Professional MC", body: "예식 흐름과 이벤트 큐를 안정적으로 이끄는 전문 사회자 옵션입니다.", href: "https://inusmc.co.kr" },
  { title: "축가", subtitle: "Wedding Song", body: "뮤지컬 외 일반 축가·맞춤 축가가 필요할 때 함께 상담 가능합니다.", href: "https://inusmusic.kr/" },
];

const qna = [
  {
    q: "뮤지컬웨딩이 일반 축가보다 부담스럽지 않을까요?",
    a: "이너스뮤직은 공연을 과시하는 방식보다 예식의 감정선을 살리는 방식을 우선합니다. 신랑신부님이 가장 돋보이도록 곡, 등장, 음량, 동선을 조율합니다.",
  },
  {
    q: "배우들은 어떤 기준으로 배정되나요?",
    a: "뮤지컬·성악·실용음악 등 공연 경험이 있는 인력을 중심으로 구성하며, 포트폴리오와 현장 적합성을 검토해 예식에 맞는 배우를 배정합니다.",
  },
  {
    q: "곡과 구성은 직접 골라야 하나요?",
    a: "원하는 분위기를 알려주시면 곡리스트와 구성 인원, 장면별 흐름을 함께 제안합니다. 아직 곡을 정하지 못한 상태에서도 상담이 가능합니다.",
  },
];

function SectionTitle({
  kicker,
  title,
  description,
  align = "left",
  compact = false,
}: {
  kicker: string;
  title: string;
  description: string;
  align?: "left" | "center";
  compact?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="section-kicker">{kicker}</p>
      <h2 className={`mt-4 font-serif-kr font-semibold leading-tight text-[#fff4d8] ${compact ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"}`}>
        {title.includes("\n") ? title.split("\n").map((line, index, lines) => (
          <span key={`${line}-${index}`} className="block">
            {line}
          </span>
        )) : title}
      </h2>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#d7ccb4]/78 md:text-lg">
          {description.split("\n").map((line, index, lines) => (
            <span key={`${line}-${index}`} className="block sm:inline">
              {line}
              {index < lines.length - 1 ? <span className="hidden sm:inline"> </span> : null}
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function ConsultationButton({ children, variant = "mint" }: { children: string; variant?: "mint" | "outline" }) {
  const className =
    variant === "mint"
      ? "w-full rounded-full border border-[#8adfce]/70 bg-[linear-gradient(135deg,#6ed9c7_0%,#d9fff5_48%,#8adfce_100%)] px-5 py-4 text-sm font-extrabold text-[#06110f] shadow-[0_18px_42px_rgba(138,223,206,0.24)] transition hover:border-[#d9fff5]/90 hover:brightness-110 sm:w-auto sm:px-7 sm:py-6 sm:text-base"
      : "w-full rounded-full border-[#8adfce]/48 bg-[#07110f]/70 px-5 py-4 text-sm font-bold text-[#e8fff9] hover:border-[#8adfce]/75 hover:bg-[#8adfce]/10 hover:text-white sm:w-auto sm:px-7 sm:py-6 sm:text-base";

  return (
    <Button asChild type="button" size="lg" variant={variant === "mint" ? "default" : "outline"} className={className}>
      <a href={kakaoChatUrl} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  );
}

function ExternalButton({ href, children, variant = "outline" }: { href: string; children: string; variant?: "outline" | "mint" }) {
  return (
    <Button
      asChild
      size="lg"
      variant={variant === "mint" ? "default" : "outline"}
      className={
        variant === "mint"
          ? "rounded-full bg-[#8adfce] px-6 py-5 text-sm font-extrabold text-[#07110f] hover:bg-[#a2f1e2]"
          : "rounded-full border-[#d9b86c]/40 bg-black/20 px-6 py-5 text-sm font-bold text-[#f8edd4] hover:bg-[#d9b86c]/10 hover:text-white"
      }
    >
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    </Button>
  );
}

export default function Home() {
  const [showFloating, setShowFloating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuPulse, setMenuPulse] = useState(true);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(e.target as Node)) {
        setServiceDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMenuPulse(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const [castProfilesOpen, setCastProfilesOpen] = useState(false);

  useEffect(() => {
    const updateFloatingVisibility = () => {
      const heroSection = document.querySelector("#top > section:first-child");
      const heroHeight = heroSection instanceof HTMLElement ? heroSection.offsetHeight : window.innerHeight;
      setShowFloating(window.scrollY > heroHeight * 0.72);
    };

    updateFloatingVisibility();
    window.addEventListener("scroll", updateFloatingVisibility, { passive: true });
    window.addEventListener("resize", updateFloatingVisibility);

    return () => {
      window.removeEventListener("scroll", updateFloatingVisibility);
      window.removeEventListener("resize", updateFloatingVisibility);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#090806] text-[#f8edd4]">
      <InusCardPopup />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#d9b86c]/10 bg-[#090806]/80 backdrop-blur-xl">
        <div className="container relative flex h-[4.75rem] items-center justify-between py-4 pr-24 lg:pr-0">
          <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label="이너스뮤직 뮤지컬웨딩 홈으로 이동">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d9b86c]/35 bg-[#d9b86c]/10 text-[#d9b86c] sm:h-11 sm:w-11">
              <Music2 className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold tracking-[0.18em] text-[#f8edd4] sm:text-lg sm:tracking-[0.24em] md:text-xl">INUS MUSIC</span>
              <span className="block truncate text-[0.66rem] font-semibold tracking-[0.2em] text-[#8adfce] sm:text-xs sm:tracking-[0.28em]">MUSICAL WEDDING</span>
            </span>
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#d7ccb4]/76 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-[#8adfce]">
                {label}
              </a>
            ))}
            {/* 서비스 드롭다운 */}
            <div ref={serviceDropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setServiceDropdownOpen((v) => !v)}
                className="flex items-center gap-1 transition hover:text-[#8adfce]"
              >
                서비스
                <svg className={`h-3.5 w-3.5 transition-transform duration-200 ${serviceDropdownOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {serviceDropdownOpen && (
                <div className="absolute left-1/2 top-full mt-2 w-44 -translate-x-1/2 rounded-xl border border-[#d9b86c]/20 bg-[#0d0a07]/96 py-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  {serviceDropdownItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setServiceDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[#d7ccb4]/80 transition hover:bg-[#8adfce]/10 hover:text-[#8adfce]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <button
            type="button"
            className={`absolute right-4 top-1/2 inline-flex h-11 -translate-y-1/2 items-center justify-center gap-1.5 rounded-full border border-[#8adfce]/80 bg-[linear-gradient(135deg,rgba(18,15,11,0.95),rgba(138,223,206,0.32))] px-3.5 text-xs font-extrabold text-[#8adfce] shadow-[0_12px_30px_rgba(0,0,0,0.3),0_0_24px_rgba(138,223,206,0.25)] backdrop-blur transition hover:border-[#8adfce]/90 hover:bg-[#8adfce]/15 hover:shadow-[0_0_32px_rgba(138,223,206,0.35)] lg:hidden ${menuPulse ? 'animate-[menuPulse_0.8s_ease-in-out_3]' : ''}`}
            aria-label="모바일 메뉴 열기"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span>메뉴</span>
          </button>
        </div>
        {mobileMenuOpen ? (
          <div className="lg:hidden">
            <div className="border-t border-[#d9b86c]/10 bg-[#090806]/96 px-4 pb-5 pt-3 shadow-[0_22px_50px_rgba(0,0,0,0.36)] backdrop-blur-xl">
              <nav className="grid grid-cols-3 gap-2" aria-label="모바일 주요 메뉴">
                {navItems.map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full border border-[#d9b86c]/18 bg-[#120f0b]/88 px-3 py-3 text-center font-serif-kr text-sm font-semibold text-[#fff4d8] transition hover:border-[#8adfce]/45 hover:bg-[#8adfce]/10 hover:text-[#d9fff5]"
                  >
                    {label}
                  </a>
                ))}
                {/* 모바일 서비스 서브메뉴 */}
                {serviceDropdownItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full border border-[#8adfce]/18 bg-[#071110]/88 px-3 py-3 text-center font-serif-kr text-sm font-semibold text-[#8adfce]/80 transition hover:border-[#8adfce]/45 hover:bg-[#8adfce]/10 hover:text-[#d9fff5]"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
      </header>

      <main id="top">
        <section className="grain relative min-h-[100svh] overflow-hidden pt-24">
          <div className="absolute inset-0">
            <img src={heroImage} alt="블랙과 골드 조명 아래 완성되는 프리미엄 뮤지컬웨딩 무대" className="h-full w-full object-cover object-[center_40%] sm:object-center" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,6,0.82)_0%,rgba(9,8,6,0.38)_40%,rgba(9,8,6,0.42)_60%,rgba(9,8,6,0.88)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(138,223,206,0.10),transparent_50%),radial-gradient(circle_at_50%_20%,rgba(217,184,108,0.12),transparent_40%)]" />
          </div>

          <div className="container relative z-10 flex min-h-[calc(100svh-6rem)] flex-col items-center justify-center gap-8 px-5 py-16 text-center sm:gap-12 sm:py-20">
            <div className="animate-rise-in max-w-4xl">
              <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-[#8adfce]/35 bg-[#07110f]/50 px-3 py-2 text-[11px] font-semibold tracking-[-0.03em] text-[#d9fff5] backdrop-blur min-[360px]:text-xs sm:gap-3 sm:px-4 sm:text-sm">
                <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#8adfce] sm:h-4 sm:w-4" />
                <span className="whitespace-nowrap">신랑신부가 주인공이 되는 프리미엄 뮤지컬웨딩</span>
              </div>
              <h1 className="mt-6 font-serif-kr text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.045em] text-[#fff8e7] min-[360px]:text-3xl sm:text-4xl md:text-7xl xl:text-8xl">
                결혼식이{" "}
                <span className="block gold-text">한 편의 영화처럼</span>
                {" "}오래 기억되는 순간
              </h1>
              <p className="mx-auto mt-5 max-w-2xl whitespace-nowrap text-[0.8rem] leading-7 text-[#e8dcc1]/84 min-[360px]:text-sm sm:whitespace-normal sm:text-lg sm:leading-9 md:text-xl">
                이너스뮤직은 예식을 <strong className="text-[#fff4d8]">하나의 영화 장면</strong>처럼 완성합니다.
              </p>
              <div className="mt-7 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:gap-4">
                <ConsultationButton>카카오톡 상담요청하기</ConsultationButton>
                <Button asChild size="lg" className="w-full rounded-full border border-[#8adfce]/55 bg-[linear-gradient(135deg,rgba(9,8,6,0.94),rgba(138,223,206,0.16))] px-5 py-4 text-sm font-extrabold text-[#e8fff9] shadow-[0_16px_36px_rgba(0,0,0,0.28)] transition hover:border-[#d9fff5]/75 hover:bg-[#8adfce]/12 hover:text-white sm:w-auto sm:px-7 sm:py-6 sm:text-base">
                  <a href="#details">자세한 내용 보기</a>
                </Button>
              </div>
            </div>


          </div>
          <a href="#details" className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.26em] text-[#8adfce]/86 transition hover:text-[#d9fff5]" aria-label="아래 내용으로 스크롤">
            <span>Scroll</span>
            <span className="relative h-11 w-px overflow-hidden bg-[#d9b86c]/25 after:absolute after:left-0 after:top-0 after:h-5 after:w-px after:animate-[scrollCue_1.8s_ease-in-out_infinite] after:bg-[#8adfce]" />
          </a>
        </section>

        <section id="details" className="scroll-mt-24 border-y border-[#d9b86c]/10 bg-[#0d0a07] py-10">
          <div className="container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trustPoints.map(({ value, label, caption, icon: Icon }) => (
              <article key={label} className="group rounded-[1.4rem] border border-[#d9b86c]/15 bg-[#120f0b] p-4 transition duration-500 hover:-translate-y-1 hover:border-[#8adfce]/35 sm:rounded-[1.8rem] sm:p-6">
                <Icon className="h-6 w-6 text-[#8adfce]" />
                <p className="mt-5 font-display text-4xl font-bold text-[#d9b86c]">{value}</p>
                <h3 className="mt-2 font-serif-kr text-xl font-semibold text-[#fff4d8]">{label}</h3>
                <p className="mt-4 text-sm leading-7 text-[#d7ccb4]/72">{caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="story" className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-10" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "cover" }} />
          <div className="container relative z-10 grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-[#d9b86c]/20 bg-[#100d0a] p-4 shadow-2xl shadow-black/40">
              <img src={microphoneImage} alt="골드 톤 마이크 디테일" className="h-[28rem] w-full rounded-[2rem] object-cover" />
              <div className="absolute bottom-8 left-8 right-8 rounded-[1.4rem] border border-white/12 bg-black/55 p-5 backdrop-blur-md">
                <p className="font-serif-kr text-lg font-semibold text-[#fff4d8] sm:text-2xl"><span className="block sm:inline">주인공은 배우가 아니라</span> <span className="block sm:inline">두 분입니다.</span></p>
                <p className="mt-3 text-sm leading-7 text-[#d7ccb4]/78">공연의 화려함을 웨딩의 품격 안으로 절제해 넣습니다.</p>
              </div>
            </div>
            <div>
              <SectionTitle
                kicker="Problem & Promise"
                title={"뮤지컬웨딩, 과하지 않을까\n걱정되셨나요?"}
                description="과하지 않게, 필요한 순간에만 음악과 배우를 더해 예식의 품격과 감동을 더욱 선명하게 완성합니다."
                compact
              />
              <div className="mt-9 space-y-4">
                {concerns.map(([question, answer]) => (
                  <div key={question} className="rounded-[1.5rem] border border-[#d9b86c]/15 bg-[#120f0b]/88 p-5">
                    <p className="font-serif-kr text-lg font-semibold text-[#fff4d8] md:text-xl">“{question}”</p>
                    <p className="mt-3 text-sm leading-7 text-[#d7ccb4]/75 md:text-base">{answer}</p>
                  </div>
                ))}
              </div>
              <div id="package" className="mt-6 rounded-[1.9rem] border border-[#d9b86c]/30 bg-[radial-gradient(circle_at_12%_18%,rgba(217,184,108,0.2),transparent_32%),linear-gradient(135deg,rgba(31,22,13,0.98),rgba(11,9,7,0.96)_48%,rgba(70,42,24,0.72))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,244,216,0.08)]">
                <p className="section-kicker">Complete Wedding Package</p>
                <h3 className="mt-3 font-serif-kr text-2xl font-semibold text-[#fff4d8]">완성형 웨딩 패키지</h3>
                <p className="mt-4 text-[0.95rem] leading-7 text-[#efe2c8]/86 md:text-base md:leading-8">
                  <span className="block sm:inline">사회 · 축가 · 연주 ·</span>
                  <span className="block sm:ml-1 sm:inline">뮤지컬웨딩을</span>
                  <span className="block">각각 따로 준비하지 마세요.</span>
                  <span className="mt-1 block text-[#fff4d8]">하나로 설계될 때</span>
                  <span className="block">예식의 흐름과 완성도가 달라집니다.</span>
                </p>
                <div className="mt-5">
                  <ExternalButton href={packageUrl} variant="mint">완성형 웨딩 패키지 보기</ExternalButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="video" className="bg-[#0d0a07] py-20 md:py-28">
          <div className="container">
            <SectionTitle
              kicker="Featured Musical Wedding Videos"
              title="실제 장면으로 보는 뮤지컬웨딩"
              description=""
              align="center"
              compact
            />
            <div className="mt-10 grid gap-4 sm:gap-6 md:grid-cols-2">
              {primaryVideos.map((video) => (
                <article key={video.title} className="overflow-hidden rounded-[1.5rem] border border-[#d9b86c]/16 bg-[#14100b] shadow-2xl shadow-black/25 sm:rounded-[2rem]">
                  <AspectRatio ratio={16 / 9}>
                    <iframe className="h-full w-full" src={video.embed} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  </AspectRatio>
                  <div className="p-3.5 sm:p-5">
                    <p className="text-xs font-bold tracking-[0.22em] text-[#8adfce]">{video.scene}</p>
                    <h3 className="mt-2 font-serif-kr text-xl font-semibold text-[#fff4d8]">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "560px", backgroundPosition: "center" }} />
          <div className="container relative z-10">
            <SectionTitle
              kicker="Real Customer Reviews"
              title="실제 고객 만족후기"
              description=""
              align="center"
              compact
            />
            <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-[1.4rem] border border-[#d9b86c]/18 bg-[#120f0b] p-2.5 shadow-2xl shadow-black/35 sm:rounded-[2.2rem] sm:p-4 md:p-6">
              <div className="review-slide-track">
                {reviewImages.map((review) => (
                  <figure key={review.alt} className="review-slide rounded-[1rem] border border-white/10 bg-white/[0.03] p-2 sm:rounded-[1.6rem] sm:p-3">
                    <img src={review.src} alt={review.alt} className="h-full w-full rounded-[0.75rem] object-contain sm:rounded-[1.25rem]" />
                  </figure>
                ))}
              </div>
            </div>
            <div className="mt-10 text-center">
              <ExternalButton href={reviewUrl} variant="mint">실제 고객 후기 전체보기</ExternalButton>
            </div>
          </div>
        </section>

        <section id="composition" className="bg-[#0d0a07] py-16 md:py-22">
          <div className="container">
            <SectionTitle
              kicker="Musical Wedding Composition"
              title="뮤지컬 기본 구성 안내"
              description=""
              align="center"
              compact
            />

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-[#d9b86c]/16 bg-[linear-gradient(145deg,rgba(18,15,11,0.96),rgba(9,8,6,0.92))] p-4 md:p-5">
                <div className="flex items-end justify-between gap-4 border-b border-[#d9b86c]/12 pb-4">
                  <div>
                    <p className="section-kicker">Wedding Flow</p>
                    <h3 className="mt-2 font-serif-kr text-xl font-semibold text-[#fff4d8] md:text-2xl">예식 진행 9장면</h3>
                  </div>
                  <p className="hidden text-right text-xs font-bold tracking-[0.18em] text-[#8adfce]/80 sm:block">01–09 SCENE</p>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {processSteps.map((step) => (
                    <article key={step.no} className="group rounded-[1.05rem] border border-white/10 bg-white/[0.035] px-3 py-3 transition duration-500 hover:border-[#8adfce]/35 hover:bg-[#8adfce]/[0.055]">
                      <div className="flex items-center gap-2.5">
                        <span className="font-display text-sm font-bold text-[#8adfce]">{step.no}</span>
                        <h4 className="truncate font-serif-kr text-base font-semibold text-[#fff4d8]">{step.title}</h4>
                      </div>
                      <p className="mt-1.5 truncate text-xs leading-5 text-[#d7ccb4]/68">{step.body}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#8adfce]/20 bg-[#101713] p-4 md:p-5">
                <div className="flex flex-col gap-2 border-b border-[#8adfce]/12 pb-4">
                  <p className="section-kicker">Package Guide</p>
                  <h3 className="font-serif-kr text-xl font-semibold text-[#fff4d8] md:text-2xl">상품 구성 한눈에 보기</h3>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {productTypes.map(({ title, subtitle, body, icon: Icon }) => (
                    <article key={title} className="rounded-[1.1rem] border border-white/10 bg-black/20 p-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#8adfce]/25 bg-[#8adfce]/10 text-[#8adfce]">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <h4 className="font-serif-kr text-lg font-semibold text-[#fff4d8]">{title}</h4>
                          <p className="text-xs font-bold tracking-[0.14em] text-[#8adfce]">{subtitle}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-[#d7ccb4]/72">{body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <Accordion type="single" collapsible className="mt-5 rounded-[1.6rem] border border-[#8adfce]/18 bg-[#101713] px-3">
              <AccordionItem value="venue" className="border-b-0">
                <AccordionTrigger className="rounded-[1.25rem] px-3 py-4 text-left font-serif-kr text-lg font-semibold text-[#fff4d8] hover:no-underline">
                  구성 전 확인이 필요한 현장 조건
                </AccordionTrigger>
                <AccordionContent className="px-1 pb-4">
                  <div className="grid gap-2 md:grid-cols-2">
                    {["인원 수에 맞는 무선·유선 마이크 확인", "유선마이크 혼용 시 동선 제한 가능", "버진로드 폭이 좁으면 구성 축소 가능", "장비대여 필요 시 예식장과 사전 음향 조율"].map((item) => (
                      <p key={item} className="rounded-2xl border border-white/8 bg-white/[0.04] p-3 text-sm leading-6 text-[#d7ccb4]/78">{item}</p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Accordion type="single" collapsible className="mt-5 rounded-[2rem] border border-[#d9b86c]/16 bg-[#120f0b] p-3">
              <AccordionItem value="songs" className="border-b-0">
                <AccordionTrigger className="rounded-[1.6rem] px-5 pb-2 pt-5 text-left font-serif-kr text-xl font-semibold text-[#fff4d8] hover:no-underline md:text-2xl">
                  뮤지컬 대표 곡리스트 보기
                </AccordionTrigger>
                <p className="px-5 pb-5 text-sm leading-7 text-[#8adfce]/85">예약시 메일로 더 많은 곡리스트를 제공해 드리고 있습니다.</p>
                <AccordionContent className="px-3 pb-4">
                  <p className="px-2 pb-5 leading-8 text-[#d7ccb4]/76">곡리스트는 상담 시 예식 순서와 홀 조건에 맞춰 최종 제안됩니다.</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    {songGroups.map((group) => (
                      <div key={group.title} className="rounded-[1.25rem] border border-[#d9b86c]/12 bg-black/25 p-4">
                        <h4 className="font-serif-kr text-lg font-semibold text-[#d9b86c]">{group.title}</h4>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {group.songs.map((song) => (
                            <span key={`${group.title}-${song}`} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#efe2c8]/86 md:text-sm">{song}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="mt-5 rounded-[1.5rem] border border-[#8adfce]/18 bg-[linear-gradient(145deg,rgba(11,28,24,0.76),rgba(14,11,8,0.92))] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.16)]">
                    <AccordionItem value="repertoire" className="border-b-0">
                      <AccordionTrigger className="rounded-[1.25rem] px-4 pb-2 pt-4 text-left hover:no-underline md:px-5">
                        <span className="flex min-w-0 flex-col gap-2">
                          <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#8adfce]">More Repertoire</span>
                          <span className="break-keep font-serif-kr text-lg font-semibold leading-snug text-[#fff4d8] md:text-xl">장면별 레퍼토리 더보기</span>
                        </span>
                      </AccordionTrigger>
                      <p className="px-4 pb-5 text-sm leading-7 text-[#d7ccb4]/78 md:px-5">대표곡 외에도 예식 장면과 분위기에 맞춰 선택할 수 있는 다양한 곡들이 준비되어 있습니다.</p>
                      <AccordionContent className="px-2 pb-4 md:px-3">
                        <div className="space-y-3">
                          {repertoireGroups.map((group, index) => (
                            <div key={group.title} className="rounded-[1.35rem] border border-white/10 bg-black/20 p-4 md:p-5">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8adfce]/80">Scene {String(index + 1).padStart(2, "0")}</p>
                                  <h4 className="mt-1 break-keep font-serif-kr text-lg font-semibold leading-snug text-[#d9b86c]">{group.title}</h4>
                                  <p className="mt-2 break-keep text-sm leading-6 text-[#d7ccb4]/72">{group.caption}</p>
                                </div>
                                <span className="w-fit rounded-full border border-[#8adfce]/22 bg-[#8adfce]/10 px-3 py-1 text-xs font-bold text-[#8adfce]">{group.songs.length}곡 예시</span>
                              </div>
                              <div className="mt-4 flex flex-wrap gap-2">
                                {group.songs.map((song) => (
                                  <span key={`${group.title}-${song}`} className="break-keep rounded-full border border-[#d9b86c]/14 bg-white/[0.04] px-3 py-1.5 text-xs leading-5 text-[#efe2c8]/88 md:text-sm">{song}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="mt-5 rounded-[1.25rem] border border-[#8adfce]/16 bg-[#8adfce]/8 px-4 py-4 text-sm leading-7 text-[#d7ccb4]/82 md:text-base">
                          리스트 외 신청곡도 상담 가능합니다. 실제 진행곡은 예식장 음향 환경, 배우 구성, 동선, 두 분의 취향을 함께 확인한 뒤 가장 자연스러운 순서로 제안드립니다.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 md:py-22">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "620px", backgroundPosition: "center" }} />
          <div className="container relative z-10">
            <SectionTitle
              kicker="Sample Performance Videos"
              title="뮤지컬 샘플영상 보기"
              description=""
              align="center"
              compact
            />
            <div className="mt-10 grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
              {sampleVideos.slice(0, 4).map((video) => (
                <article key={video.title} className="overflow-hidden rounded-[1.15rem] border border-[#d9b86c]/14 bg-[#120f0b] shadow-xl shadow-black/18 sm:rounded-[1.45rem]">
                  <AspectRatio ratio={16 / 9}>
                    <iframe className="h-full w-full" src={video.src} title={video.title} allow="autoplay; fullscreen" allowFullScreen />
                  </AspectRatio>
                  <div className="p-3.5">
                    <p className="text-[0.65rem] font-bold tracking-[0.18em] text-[#8adfce]">REPRESENTATIVE SAMPLE</p>
                    <h3 className="mt-1.5 truncate font-serif-kr text-base font-semibold text-[#fff4d8]">{video.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-5 rounded-[1.5rem] border border-[#8adfce]/16 bg-[#07110f]/55 p-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[0.18em] text-[#8adfce]">MORE SAMPLE</p>
                  <p className="mt-1 text-sm leading-6 text-[#d7ccb4]/74">추가 샘플은 제목을 눌러 확인하실 수 있습니다.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sampleVideos.slice(4).map((video) => (
                    <a key={video.title} href={video.src} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-[#efe2c8]/86 transition hover:border-[#8adfce]/45 hover:text-[#d9fff5]">
                      {video.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="bg-[#0d0a07] py-20 md:py-28">
          <div className="container">
            <SectionTitle
              kicker="Musical Wedding Pricing"
              title="뮤지컬웨딩 2·3·4인 가격"
              description="구성은 남녀 혼성으로 진행됩니다."
              align="center"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {packages.map((pkg) => (
                <article key={pkg.title} className="relative overflow-hidden rounded-[1.6rem] border border-[#d9b86c]/18 bg-[#120f0b] p-5 transition duration-500 hover:border-[#8adfce]/35 hover:shadow-[0_0_30px_rgba(138,223,206,0.08)] sm:rounded-[2.2rem] sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold tracking-[0.2em] text-[#8adfce]">{pkg.people}</p>
                      <h3 className="mt-3 font-display text-3xl font-semibold text-[#fff4d8]">{pkg.title}</h3>
                    </div>
                    <span className="shrink-0 whitespace-nowrap rounded-full border border-[#d9b86c]/25 bg-[#d9b86c]/10 px-3.5 py-2 text-xs font-bold text-[#d9b86c] sm:px-4 sm:text-sm">{pkg.accent}</span>
                  </div>
                  <p className="mt-6 min-h-[4.5rem] leading-8 text-[#d7ccb4]/74">{pkg.description}</p>
                  <div className="mt-8 space-y-3">
                    {pkg.prices.map(([songs, price, grade]) => (
                      <div key={`${pkg.title}-${songs}`} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] px-5 py-4">
                        <div>
                          <p className="font-serif-kr text-lg font-semibold text-[#fff4d8]">{songs}</p>
                          <p className="text-xs font-semibold tracking-[0.16em] text-[#d7ccb4]/55">{grade}</p>
                        </div>
                        <p className="font-display text-2xl font-bold text-[#d9b86c]">{price}</p>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-[1.8rem] border border-[#8adfce]/20 bg-[#101713] p-6 text-center">
              <p className="font-serif-kr text-base font-semibold tracking-[-0.04em] text-[#fff4d8] sm:text-xl">신랑·신부 참여형은 별도 상담형입니다.</p>
              <p className="mt-3 text-sm leading-7 text-[#d7ccb4]/76 sm:text-base sm:leading-8">
                리스트 외 신청곡, 배우와 함께 부르는<br className="sm:hidden" />
                입장·축가, 특별 연출은<br className="sm:hidden" />
                곡과 동선에 따라 추가 비용이<br className="sm:hidden" />
                발생할 수 있어 상담 후 확정됩니다.
              </p>
            </div>
          </div>
        </section>

        <section id="profiles" className="relative overflow-hidden border-y border-[#d9b86c]/10 bg-[#090806] py-20 md:py-28">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "560px", backgroundPosition: "center" }} />
          <div className="container relative z-10">
            <SectionTitle
              kicker="Director & Cast"
              title="뮤지컬배우 프로필"
              description=""
              align="center"
              compact
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <article className="group relative overflow-hidden rounded-[1.5rem] border border-[#d9b86c]/24 bg-[linear-gradient(145deg,rgba(217,184,108,0.14),rgba(18,15,11,0.97))] p-3 shadow-[0_24px_70px_rgba(0,0,0,0.34)] sm:rounded-[2.3rem] sm:p-4 md:p-6">
                <div className="grid gap-6 md:grid-cols-[0.88fr_1.12fr] md:items-stretch">
                  <div className="relative min-h-[18rem] overflow-hidden rounded-[1.85rem] border border-[#d9b86c]/22 bg-black/35 sm:min-h-[22rem] md:min-h-full">
                    <img src={managerProfile.image} alt={`${managerProfile.name} ${managerProfile.title} 프로필 사진`} className="h-full w-full object-cover object-[center_18%] transition duration-700 group-hover:scale-[1.035]" />
                    <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(9,8,6,0.88))] p-5">
                      <p className="text-xs font-bold tracking-[0.22em] text-[#8adfce]">TEAM LEAD</p>
                      <p className="mt-2 font-serif-kr text-2xl font-semibold text-[#fff4d8]">{managerProfile.name}</p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between rounded-[1.85rem] border border-white/10 bg-black/24 p-5 md:p-6">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#8adfce]/28 bg-[#8adfce]/10 px-4 py-2 text-xs font-bold tracking-[0.18em] text-[#8adfce]">
                        <Crown className="h-4 w-4" />
                        Musical Team Manager
                      </div>
                      <h3 className="mt-5 font-serif-kr text-3xl font-semibold leading-tight text-[#fff4d8] md:text-4xl">{managerProfile.name} {managerProfile.title}</h3>
                      <p className="mt-5 text-sm leading-7 text-[#d7ccb4]/78 md:text-base md:leading-8">{managerProfile.summary}</p>
                    </div>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {directorHighlights.map((item) => (
                        <p key={item} className="rounded-2xl border border-[#d9b86c]/14 bg-[#120f0b]/82 p-4 text-sm leading-7 text-[#efe2c8]/86">{item}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
              <div className="rounded-[1.5rem] border border-[#8adfce]/18 bg-[linear-gradient(145deg,rgba(138,223,206,0.1),rgba(16,23,19,0.95))] p-3.5 sm:rounded-[2.3rem] sm:p-5 md:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="section-kicker">Musical Cast</p>
                    <h3 className="mt-3 font-serif-kr text-2xl font-semibold text-[#fff4d8] md:text-3xl">배우 프로필 목록</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCastProfilesOpen((open) => !open)}
                    aria-expanded={castProfilesOpen}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#8adfce]/38 bg-[#8adfce]/10 px-5 py-3 text-sm font-extrabold text-[#d9fff5] shadow-[0_14px_34px_rgba(0,0,0,0.24)] transition hover:border-[#d9fff5]/70 hover:bg-[#8adfce]/16"
                  >
                    {castProfilesOpen ? "배우 프로필 접기" : "배우 프로필 보기"}
                    <ChevronRight className={`h-4 w-4 transition ${castProfilesOpen ? "rotate-90 text-[#8adfce]" : ""}`} />
                  </button>
                </div>
                {castProfilesOpen ? (
                  <div className="mt-7 grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3">
                    {actorCastProfiles.map((actor) => (
                      <article key={actor.name} className="group flex h-full flex-col rounded-[1.65rem] border border-[#8adfce]/14 bg-[linear-gradient(180deg,rgba(8,17,15,0.94),rgba(9,8,6,0.8))] p-2.5 text-center shadow-[0_18px_46px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-[#8adfce]/42 hover:bg-[#101713] sm:p-3">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.32rem] border border-[#8adfce]/30 bg-[#050705] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_20px_34px_rgba(0,0,0,0.28)]">
                          <img
                            src={actor.image}
                            alt={`${actor.name} ${actor.role} 프로필 사진`}
                            className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.012]"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between pt-4">
                          <div>
                            <h4 className="font-serif-kr text-xl font-semibold leading-tight text-[#fff4d8] sm:text-2xl">{actor.name}</h4>
                            <p className="mt-1 text-sm font-medium text-[#8adfce]">{actor.role}</p>
                          </div>
                          <div className="mt-4 h-px w-full bg-[linear-gradient(90deg,transparent,rgba(138,223,206,0.32),transparent)]" />
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section id="assurance" className="bg-[#0d0a07] py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <p className="section-kicker">Wedding-Day Assurance</p>
              <h2 className="mt-4 whitespace-nowrap font-serif-kr text-[clamp(1.08rem,4.7vw,2.25rem)] font-semibold leading-tight tracking-[-0.08em] text-[#fff4d8] md:text-4xl">
                이너스뮤직은 시스템으로 대비합니다.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {assuranceItems.map(({ title, body, icon: Icon }) => (
                <article key={title} className="rounded-[1.4rem] border border-[#d9b86c]/16 bg-[#14100b] p-4 text-center transition duration-500 hover:border-[#8adfce]/30 sm:rounded-[2rem] sm:p-5 md:p-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#8adfce]/28 bg-[#8adfce]/8 text-[#8adfce] md:h-16 md:w-16">
                    <Icon className="h-6 w-6 md:h-7 md:w-7" />
                  </div>
                  <h3 className="mt-5 whitespace-nowrap font-serif-kr text-base font-semibold tracking-[-0.03em] text-[#fff4d8] sm:text-lg md:text-2xl">{title}</h3>
                  <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-7 text-[#d7ccb4]/76 md:text-base md:leading-8">{body}</p>
                </article>
              ))}
            </div>
            <div className="mt-10 rounded-[1.4rem] border border-[#8adfce]/35 bg-[linear-gradient(135deg,rgba(138,223,206,0.2),rgba(16,23,19,0.94))] p-4 shadow-[0_0_45px_rgba(138,223,206,0.12)] sm:rounded-[2.2rem] sm:p-5 md:p-7">
              <p className="section-kicker text-center">Inus Quick Links</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {quickLinks.map(([label, href]) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex min-h-16 items-center justify-center rounded-[1.25rem] border border-[#d9b86c]/22 bg-[linear-gradient(135deg,rgba(9,8,6,0.72),rgba(217,184,108,0.08))] px-4 py-4 text-center font-serif-kr text-base font-semibold text-[#fff4d8] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition hover:-translate-y-0.5 hover:border-[#8adfce]/45 hover:bg-[#8adfce]/10 md:text-lg">
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="container grid gap-6 lg:grid-cols-2">
            <article className="rounded-[1.4rem] border border-[#8adfce]/24 bg-[linear-gradient(135deg,rgba(138,223,206,0.12),rgba(9,8,6,0.96))] p-5 sm:rounded-[2.2rem] sm:p-8">
              <Mic2 className="h-8 w-8 text-[#8adfce]" />
              <p className="section-kicker mt-6">Musical Song Only</p>
              <h2 className="mt-4 font-serif-kr text-3xl font-semibold leading-tight text-[#fff4d8] md:text-4xl">
                <span className="block sm:inline">뮤지컬 축가만 찾고</span>
                <span className="block sm:inline"> 계신다면?</span>
              </h2>
              <p className="mt-5 whitespace-nowrap font-serif-kr text-[1.22rem] font-semibold leading-snug tracking-[-0.03em] text-[#fff4d8] min-[375px]:text-[1.35rem] sm:text-2xl">무대처럼, 영화처럼 감동을</p>
              <p className="mt-3 leading-8 text-[#d7ccb4]/76">선사할 단 하나의 축가를 예식 분위기에 맞춰 제안드립니다.</p>
              <div className="mt-7">
                <ExternalButton href={musicalSongUrl} variant="mint">뮤지컬축가 안내 보기</ExternalButton>
              </div>
            </article>
            <article className="rounded-[1.4rem] border border-[#d9b86c]/22 bg-[linear-gradient(135deg,rgba(217,184,108,0.13),rgba(9,8,6,0.96))] p-5 sm:rounded-[2.2rem] sm:p-8">
              <Gift className="h-8 w-8 text-[#d9b86c]" />
              <p className="section-kicker mt-6">Special Event</p>
              <h2 className="mt-4 font-serif-kr text-3xl font-semibold leading-tight text-[#fff4d8] md:text-4xl">
                <span className="block">후기 참여혜택과</span>
                <span className="block">특별 이벤트</span>
              </h2>
              <Accordion type="single" collapsible className="mt-6 rounded-[1.65rem] border border-[#8adfce]/18 bg-black/20 p-2">
                <AccordionItem value="benefits" className="border-b-0">
                  <AccordionTrigger className="rounded-[1.35rem] px-4 py-4 text-left font-serif-kr text-lg font-semibold text-[#fff4d8] hover:no-underline">
                    후기 혜택 이벤트 보기
                  </AccordionTrigger>
                  <p className="px-4 pb-4 text-sm leading-7 text-[#d7ccb4]/72">참여를 원하실 때만 세부 혜택을 확인하실 수 있도록 정리했습니다.</p>
                  <AccordionContent className="px-2 pb-3">
                    <div className="grid gap-3">
                      {benefitCards.map((benefit) => (
                        <div key={benefit.title} className="rounded-[1.35rem] border border-[#d9b86c]/16 bg-black/24 p-4">
                          <h3 className="font-serif-kr text-lg font-semibold text-[#fff4d8]">{benefit.title}</h3>
                          <p className="mt-2 text-sm leading-7 text-[#d7ccb4]/76">{benefit.body}</p>
                          {benefit.actionUrl ? (
                            <a href={benefit.actionUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-[#d9b86c]/42 bg-[#d9b86c]/10 px-4 py-2 text-sm font-bold text-[#f8edd4] transition hover:border-[#8adfce]/45 hover:text-white">
                              {benefit.actionLabel}
                            </a>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </article>
          </div>
        </section>

        <section id="qna" className="scroll-mt-24 bg-[#0d0a07] py-20 md:py-28">
          <div className="container grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <SectionTitle
              kicker="QnA"
              title="QnA"
              description="상담 전 자주 묻는 질문을 정리했습니다."
              compact
            />
            <Accordion type="single" collapsible className="space-y-4">
              {qna.map((item, index) => (
                <AccordionItem key={item.q} value={`qna-${index}`} className="rounded-[1.2rem] border border-[#d9b86c]/15 bg-[#120f0b] px-4 sm:rounded-[1.7rem] sm:px-5">
                  <AccordionTrigger className="py-5 text-left hover:no-underline">
                    <span className="flex min-w-0 items-start gap-4">
                      <span className="shrink-0 font-display text-2xl font-bold text-[#d9b86c]">Q{index + 1}</span>
                      <span className="min-w-0 whitespace-normal break-keep font-serif-kr text-lg font-semibold leading-snug tracking-[-0.03em] text-[#fff4d8] md:text-xl md:leading-snug">{item.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="pb-5 pl-11 text-sm leading-7 text-[#d7ccb4]/75 md:text-base md:leading-8">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden border-y border-[#d9b86c]/10 bg-[#0d0a07] py-20 md:py-28">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "620px", backgroundPosition: "center" }} />
          <div className="container relative z-10">
            <SectionTitle
              kicker="Additional Option Services"
              title="추가 옵션 서비스"
              description=""
              align="center"
              compact
            />
            <Accordion type="single" collapsible className="mx-auto mt-10 max-w-5xl rounded-[1.4rem] border border-[#8adfce]/18 bg-[linear-gradient(135deg,rgba(7,17,15,0.88),rgba(18,15,11,0.94))] p-2.5 shadow-[0_24px_70px_rgba(0,0,0,0.28)] sm:rounded-[2.2rem] sm:p-4 md:p-5">
              <AccordionItem value="additional-services" className="border-b-0">
                <AccordionTrigger className="rounded-[1.65rem] px-5 py-5 text-left hover:no-underline">
                  <span className="flex min-w-0 flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#8adfce]">Option Line-up</span>
                    <span className="break-keep font-serif-kr text-xl font-semibold leading-snug text-[#fff4d8] md:text-2xl">추가 옵션 서비스 보기</span>
                  </span>
                </AccordionTrigger>
                <p className="px-5 pb-5 text-sm leading-7 text-[#d7ccb4]/74">필요하신 경우 결혼식사회, 클래식연주, 재즈연주, 축가, 모바일청첩장, 완성패키지 옵션을 함께 확인하실 수 있습니다.</p>
                <AccordionContent className="px-1 pb-3 md:px-2">
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
                    {additionalOptionServices.map((service, index) => (
                      <a
                        key={service.title}
                        href={service.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex min-h-[6.8rem] flex-col justify-between rounded-[1.25rem] border border-[#d9b86c]/15 bg-[linear-gradient(150deg,rgba(18,15,11,0.94),rgba(9,8,6,0.78))] p-3.5 transition duration-500 hover:-translate-y-0.5 hover:border-[#8adfce]/45 hover:bg-[#101713] sm:p-4"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display text-[0.68rem] font-bold tracking-[0.18em] text-[#8adfce]">0{index + 1}</span>
                          <ExternalLink className="h-3.5 w-3.5 text-[#d9b86c]/70 transition group-hover:text-[#8adfce]" />
                        </div>
                        <div>
                          <p className="text-[0.63rem] font-bold tracking-[0.14em] text-[#d9b86c]/72 sm:text-[0.68rem]">{service.subtitle}</p>
                          <h3 className="mt-1.5 whitespace-nowrap font-serif-kr text-lg font-semibold tracking-[-0.04em] text-[#fff4d8] sm:text-xl">{service.title}</h3>
                        </div>
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section id="consult" className="relative overflow-hidden border-t border-[#d9b86c]/12 bg-[#090806] py-20 md:py-28">
          <div className="absolute inset-0 opacity-18" style={{ backgroundImage: `url(${patternImage})`, backgroundSize: "620px", backgroundPosition: "center" }} />
          <div className="container relative z-10">
            <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-[#d9b86c]/20 bg-[linear-gradient(135deg,rgba(20,16,11,0.96),rgba(9,8,6,0.92))] p-6 text-center shadow-2xl shadow-black/45 sm:rounded-[2.6rem] sm:p-8 md:p-14">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#8adfce]/35 bg-[#8adfce]/10 text-[#8adfce]">
                <MessageCircle className="h-7 w-7" />
              </div>
              <p className="section-kicker mt-8">Final Curtain</p>
              <h2 className="mt-4 font-serif-kr text-[1.55rem] font-semibold leading-[1.25] tracking-[-0.04em] text-[#fff4d8] min-[360px]:text-[1.7rem] sm:text-4xl md:text-5xl">
                <span className="block">예식 날짜와 웨딩홀만</span>
                <span className="block">알려주세요.</span>
                <span className="mt-2 block gold-text">어울리는 곡과 구성을</span>
                <span className="block gold-text">안내드립니다.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-[38rem] text-[0.82rem] leading-7 text-[#d7ccb4]/78 min-[360px]:text-[0.88rem] sm:text-base sm:leading-8 md:text-lg">
                원하시는 분위기를 말씀해 주시면<br className="sm:hidden" />
                인원, 곡, 장면 구성을 쉽게 정리해<br className="sm:hidden" />
                상담에서 안내드릴게요.
              </p>
              <div className="mt-10 flex w-full max-w-md flex-col items-center justify-center gap-3 sm:max-w-none sm:flex-row sm:gap-4">
                <ConsultationButton>카카오톡 상담 시작하기</ConsultationButton>
                <Button asChild size="lg" variant="outline" className="w-full rounded-full border-[#d9b86c]/45 bg-black/20 px-5 py-4 text-sm font-bold text-[#f8edd4] hover:bg-[#d9b86c]/10 hover:text-white sm:w-auto sm:px-7 sm:py-6 sm:text-base">
                  <a href="#pricing">가격 구성 다시 보기 <ChevronRight className="ml-1 h-4 w-4" /></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {showFloating ? (
          <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex animate-rise-in items-end justify-between px-4 sm:bottom-6 sm:px-6">
            <a
              href={videoArchiveUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#8adfce]/55 bg-[linear-gradient(135deg,rgba(10,42,36,0.94),rgba(138,223,206,0.22),rgba(217,184,108,0.14))] px-4 py-3 text-xs font-extrabold text-[#d9fff5] shadow-[0_16px_42px_rgba(0,0,0,0.35),0_0_26px_rgba(138,223,206,0.13)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#d9b86c]/58 hover:bg-[#10231f] hover:text-white sm:px-5 sm:text-sm"
              aria-label="이너스뮤직 뮤지컬웨딩 영상 아카이브 새 창에서 보기"
            >
              <PlayCircle className="h-5 w-5 text-[#8adfce]" />
              영상보기
            </a>
            <a
              href={kakaoChatUrl}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#fee500] px-4 py-3 text-xs font-extrabold text-[#3c1e1e] shadow-[0_16px_42px_rgba(0,0,0,0.35)] transition hover:-translate-y-0.5 hover:brightness-110 sm:px-5 sm:text-sm"
              aria-label="카카오톡 상담 새 창에서 시작하기"
            >
              <MessageCircle className="h-5 w-5" />
              카카오톡 상담
            </a>
          </div>
        ) : null}
      </main>

      <footer className="border-t border-[#d9b86c]/10 bg-[#070604] py-10">
        <div className="container flex flex-col gap-5 text-sm text-[#d7ccb4]/62">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="font-display tracking-[0.22em] text-[#fff4d8]">INUS MUSIC · MUSICAL WEDDING</p>
            <p>프리미엄 뮤지컬웨딩 연출 · 상담 후 예식 조건에 맞춰 세부 구성이 확정됩니다.</p>
          </div>
          <div className="border-t border-[#d9b86c]/8 pt-5 text-xs leading-6 text-[#d7ccb4]/50">
            <p>대표자: 신유진 | 사업자번호: 299-90-00178</p>
            <p>사무실 주소: 서울 광진구 자양로 165 4층 | TEL: 02-423-2772</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
