"use client";

import { useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUp, Bot, ChevronDown, ClipboardList, Clock3, FileText, ImagePlus, LayoutDashboard, Menu, Mic, Plus, Settings, Sparkles, Stethoscope, X } from "lucide-react";

const suggestions = [
  { icon: ClipboardList, title: "Summarize a patient report", detail: "Turn clinical notes into a clear summary" },
  { icon: Stethoscope, title: "Explore clinical guidance", detail: "Find care pathways and best practices" },
  { icon: FileText, title: "Draft a discharge plan", detail: "Organize next steps for a patient" },
];

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechWindow = Window & { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike };

type ChatMessage = { id: string; content: string };
type ChatConversation = { id: string; title: string; messages: ChatMessage[]; updatedAt: number };

let chatHistory: ChatConversation[] = [];

export default function WorkspacePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const chatId = pathname === "/new" || pathname === "/workspace" ? null : pathname.split("/").filter(Boolean)[0] ?? null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [notice, setNotice] = useState("");
  const [attachedImages, setAttachedImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDictating, setIsDictating] = useState(false);
  const [isPromptMultiline, setIsPromptMultiline] = useState(false);
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const keepDictatingRef = useRef(false);
  const promptTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textarea = promptTextareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const contentHeight = textarea.scrollHeight;
    textarea.style.height = `${Math.min(contentHeight, 160)}px`;
    textarea.style.overflowY = contentHeight > 160 ? "auto" : "hidden";
    if (contentHeight > 40) setIsPromptMultiline(true);
    else if (!prompt.trim()) setIsPromptMultiline(false);
  }, [prompt]);

  useEffect(() => {
    try {
      const storedChats = window.localStorage.getItem("sewacare-chat-history");
      if (!storedChats) return;
      const parsedChats = JSON.parse(storedChats) as ChatConversation[];
      if (!Array.isArray(parsedChats)) return;
      chatHistory = parsedChats;
      setChats(parsedChats);
    } catch {
      chatHistory = [];
    }
  }, []);

  useEffect(() => {
    setChats(chatHistory);
    setMessages(chatHistory.find((chat) => chat.id === chatId)?.messages ?? []);
    setPrompt("");
    setNotice("");
  }, [pathname, chatId]);

  if (status === "loading") return <div className="grid min-h-screen place-items-center bg-[#f8faf9] text-sm text-slate-500">Loading your workspace…</div>;
  if (!session) {
    router.replace("/login");
    return null;
  }

  const name = session.user?.name || "SewaCare user";
  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).filter((file) => file.type.startsWith("image/"));
    setAttachedImages((current) => [...current, ...selected.map((file) => ({ file, preview: URL.createObjectURL(file) }))]);
    event.target.value = "";
  };
  const removeAttachedImage = (preview: string) => {
    URL.revokeObjectURL(preview);
    setAttachedImages((current) => current.filter((image) => image.preview !== preview));
  };
  const sendMessage = () => {
    const content = prompt.trim();
    if (!content) return;

    const id = chatId ?? globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;
    const existingChat = chatHistory.find((chat) => chat.id === id);
    const nextMessages = [...(existingChat?.messages ?? messages), { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, content }];
    const nextChat = {
      id,
      title: existingChat?.title ?? content.split("\n")[0].slice(0, 48),
      messages: nextMessages,
      updatedAt: Date.now(),
    };

    chatHistory = [nextChat, ...chatHistory.filter((chat) => chat.id !== id)].slice(0, 30);
    setChats(chatHistory);
    try {
      window.localStorage.setItem("sewacare-chat-history", JSON.stringify(chatHistory));
    } catch {}
    setMessages(nextMessages);
    setPrompt("");
    setNotice("");

    if (!chatId) router.replace(`/${id}`);
  };
  const startDictation = () => {
    const SpeechRecognition = (window as SpeechWindow).SpeechRecognition || (window as SpeechWindow).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setNotice("Voice dictation is not supported in this browser. Try the latest Chrome or Edge.");
      return;
    }
    if (isDictating) {
      keepDictatingRef.current = false;
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setIsDictating(false);
      setNotice("");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = navigator.language || "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;
    recognitionRef.current = recognition;
    keepDictatingRef.current = true;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
      setPrompt((current) => `${current}${current.trim() ? " " : ""}${transcript}`);
      setNotice("");
    };
    recognition.onerror = () => {
      keepDictatingRef.current = false;
      recognitionRef.current = null;
      setIsDictating(false);
      setNotice("Could not capture speech. Please check microphone permission and try again.");
    };
    recognition.onend = () => {
      if (keepDictatingRef.current) {
        recognition.start();
      } else {
        recognitionRef.current = null;
        setIsDictating(false);
      }
    };
    setNotice("");
    setIsDictating(true);
    recognition.start();
  };
  const initials = name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  const attachmentControl = <label className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl text-slate-500 hover:bg-slate-100 hover:text-emerald-800" title="Attach images"><ImagePlus size={18} /><span className="sr-only">Attach images</span><input type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelection} /></label>;
  const dictationControl = isDictating ? <button onClick={startDictation} aria-label="Stop dictation" title="Stop dictation" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-rose-100 text-rose-700 transition hover:bg-rose-200"><span className="h-3 w-3 rounded-sm bg-rose-600" /></button> : <button onClick={startDictation} aria-label="Dictate message" title="Dictate message" className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-emerald-800"><Mic size={18} /></button>;
  const submitControl = prompt.trim() && <button onClick={sendMessage} aria-label="Send message" title="Send message" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-800 text-white hover:bg-emerald-900"><ArrowUp size={19} strokeWidth={3} /></button>;

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#fbfcfb] text-slate-800">
      {mobileOpen && <button aria-label="Close navigation" onClick={() => setMobileOpen(false)} className="fixed inset-0 z-30 bg-slate-950/30 md:hidden" />}
      <aside className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col border-r border-slate-200 bg-[#f7f9f8] p-4 transition-transform md:static md:translate-x-0`}>
        <div className="flex items-center justify-between px-2 py-3">
          <Link href="/new" className="flex items-center gap-3" aria-label="SewaCare home"><img src="/logo.png" alt="SewaCare — Compassionate Healthcare Services" className="h-9 w-auto max-w-[178px] object-contain object-left" /></Link>
          <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 text-slate-500 md:hidden" aria-label="Close menu"><X size={18} /></button>
        </div>
        <button onClick={() => { setPrompt(""); setNotice(""); setMessages([]); setMobileOpen(false); router.push("/new"); }} className="mt-7 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50"><Plus size={17} /> New chat</button>
        <div className="mt-8 px-2 text-[11px] font-semibold uppercase tracking-[.12em] text-slate-400">Recent</div>
        <div className="mt-2 space-y-1">
          {chats.length ? chats.slice(0, 8).map((chat) => <button key={chat.id} onClick={() => { setMobileOpen(false); router.push(`/${chat.id}`); }} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-white ${chat.id === chatId ? "bg-white text-slate-800" : "text-slate-500"}`}><Clock3 size={15} className="shrink-0" /><span className="truncate">{chat.title}</span></button>) : <div className="rounded-lg px-3 py-2.5 text-sm text-slate-500"><Clock3 size={15} className="mr-2 inline" />Your conversations</div>}
        </div>
        <div className="relative mt-auto border-t border-slate-200 pt-3">
          {menuOpen && <><button aria-label="Close account menu" className="fixed inset-0 z-10 cursor-default" onClick={() => setMenuOpen(false)} /><div className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-full rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"><div className="border-b border-slate-100 px-3 py-2"><div className="truncate text-sm font-medium">{name}</div><div className="truncate text-xs text-slate-500">{session.user?.email}</div></div><Link href="/dashboard" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"><LayoutDashboard size={16} /> Dashboard</Link><button onClick={() => { setMenuOpen(false); router.push("/dashboard/settings"); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"><Settings size={16} /> Settings</button><button onClick={() => { setMenuOpen(false); setNotice("SewaCare plans are not available in this workspace yet."); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"><Sparkles size={16} /> Upgrade</button><button onClick={() => signOut({ callbackUrl: "/login" })} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50">Log out</button></div></>}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-white">{session.user?.image ? <img src={session.user.image} alt={`${name} profile`} className="h-9 w-9 shrink-0 rounded-full object-cover" /> : <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-800 text-xs font-semibold text-white">{initials}</span>}<span className="min-w-0 flex-1 text-left"><span className="block truncate text-sm font-medium">{name}</span><span className="block truncate text-xs text-slate-500">{session.user?.email || ""}</span></span><ChevronDown size={16} className="shrink-0 text-slate-400" /></button>
        </div>
      </aside>
      <main className="relative flex min-w-0 flex-1 flex-col">
        <button onClick={() => setMobileOpen(true)} className="absolute left-3 top-3 z-10 rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" aria-label="Open navigation"><Menu size={19} /></button>
        <section className={`flex flex-1 flex-col items-center overflow-y-auto px-4 pb-6 ${messages.length ? "pt-8" : "pt-[min(13vh,112px)]"}`}>
          {messages.length ? <div className="w-full max-w-3xl flex-1 space-y-6 pb-8">
            <p className="text-center text-xs text-slate-400">Messages are kept in memory for this session. AI responses are not connected yet.</p>
            {messages.map((message) => <div key={message.id} className="flex justify-end"><p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-emerald-800 px-4 py-3 text-sm leading-relaxed text-white">{message.content}</p></div>)}
          </div> : <>
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-800"><Bot size={25} /></div>
            <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl">How can I help you today?</h1><p className="mt-3 text-center text-sm text-slate-500 sm:text-base">Your healthcare workspace, ready when you are.</p>
            <div className="mt-9 grid w-full max-w-3xl gap-3 sm:grid-cols-3">{suggestions.map(({ icon: Icon, title, detail }) => <button key={title} onClick={() => setPrompt(title)} className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-emerald-300 hover:shadow-sm"><Icon size={19} className="mb-5 text-emerald-700" /><div className="text-sm font-medium">{title}</div><div className="mt-1 text-xs leading-relaxed text-slate-500">{detail}</div></button>)}</div>
          </>}
          <div className="mt-auto w-full max-w-3xl pt-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_8px_30px_-22px_rgba(15,23,42,.35)] focus-within:border-emerald-300">
              {attachedImages.length > 0 && <div className="flex flex-wrap gap-2 px-2 pt-2">{attachedImages.map(({ file, preview }) => <div key={preview} className="relative h-16 w-16 overflow-hidden rounded-lg border border-slate-200"><img src={preview} alt={file.name} className="h-full w-full object-cover" /><button onClick={() => removeAttachedImage(preview)} aria-label={`Remove ${file.name}`} className="absolute right-1 top-1 rounded-full bg-slate-900/70 p-1 text-white"><X size={12} /></button></div>)}</div>}
              <div className={`flex gap-1 ${isPromptMultiline ? "flex-col" : "items-center"}`}>
                {!isPromptMultiline && attachmentControl}
                <textarea ref={promptTextareaRef} value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} rows={1} placeholder={isDictating ? "Listening… Speak now." : "Ask a question or describe what you need…"} className={`prompt-textarea min-w-0 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-slate-400 ${isPromptMultiline ? "w-full" : "flex-1"}`} />
                {isPromptMultiline ? <div className="flex items-center justify-between px-2 pb-1">{attachmentControl}<div className="flex items-center gap-1">{dictationControl}{submitControl}</div></div> : <>{dictationControl}{submitControl}</>}
              </div>
            </div>
            {notice && <p role="status" className="mt-3 text-center text-xs text-slate-500">{notice}</p>}
            <p className="mt-3 text-center text-[11px] text-slate-400">SewaCare can make mistakes. Verify important clinical information.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
