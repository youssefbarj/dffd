"use client"

import { useState } from "react"
import { XCircle, RotateCcw, ThumbsUp, ThumbsDown } from "lucide-react"

// DO and DON'T cases for comedone extraction hygiene practices
const EXTRACTION_CASES = [
  {
    id: 1,
    statement: "Porter des gants pendant l'extraction des comédons",
    isCorrect: true, // This is a DO
    correctFeedback: "Exact ! L'extraction doit être réalisée avec les mains gantées pour respecter les conditions strictes d'hygiène.",
    wrongFeedback: "Attention ! Les gants sont OBLIGATOIRES. L'extraction doit être réalisée dans des conditions strictes d'hygiène.",
  },
  {
    id: 2,
    statement: "Extraire les comédons sans phase de vapeur préalable",
    isCorrect: false, // This is a DON'T
    correctFeedback: "Correct ! Il faut TOUJOURS faire une phase de vapeur avant l'extraction pour dilater les pores.",
    wrongFeedback: "Attention ! La vapeur est INDISPENSABLE avant l'extraction pour dilater les pores et faciliter le travail.",
  },
  {
    id: 3,
    statement: "Utiliser un tire-comédon stérilisé",
    isCorrect: true, // This is a DO
    correctFeedback: "Parfait ! Le tire-comédon doit être stérilisé pour éviter toute contamination ou infection.",
    wrongFeedback: "Attention ! Un tire-comédon NON stérilisé peut provoquer des infections. La stérilisation est obligatoire.",
  },
  {
    id: 4,
    statement: "Faire des pincements sur une peau sensible",
    isCorrect: false, // This is a DON'T
    correctFeedback: "Bien vu ! En cas de peau sensible, il est recommandé d'éviter les pincements durant le soin.",
    wrongFeedback: "Attention ! Sur une peau SENSIBLE, les pincements sont à éviter car ils peuvent irriter et traumatiser la peau.",
  },
  {
    id: 5,
    statement: "Se référer au type de peau d'origine pour une peau déshydratée",
    isCorrect: true, // This is a DO
    correctFeedback: "Exact ! En cas de peau déshydratée, il convient de se référer au type de peau d'origine pour adapter le soin.",
    wrongFeedback: "Attention ! Pour une peau déshydratée, il faut TOUJOURS se référer au type de peau d'origine pour adapter le traitement.",
  },
  {
    id: 6,
    statement: "Extraire les comédons avec les mains nues",
    isCorrect: false, // This is a DON'T
    correctFeedback: "Correct ! Les mains nues ne respectent pas les conditions d'hygiène. Il faut porter des gants.",
    wrongFeedback: "Attention ! L'extraction à mains nues est INTERDITE. Les gants sont obligatoires pour l'hygiène.",
  },
  {
    id: 7,
    statement: "Respecter des conditions strictes d'hygiène pendant l'extraction",
    isCorrect: true, // This is a DO
    correctFeedback: "Parfait ! L'hygiène stricte est la base de toute extraction sécurisée.",
    wrongFeedback: "Attention ! L'hygiène n'est pas optionnelle. Des conditions strictes sont OBLIGATOIRES pour éviter les infections.",
  },
  {
    id: 8,
    statement: "Utiliser un tire-comédon non stérilisé pour gagner du temps",
    isCorrect: false, // This is a DON'T
    correctFeedback: "Bien vu ! Jamais de tire-comédon non stérilisé, même pour gagner du temps. La sécurité prime.",
    wrongFeedback: "Attention ! Un instrument non stérilisé peut causer des infections graves. La stérilisation n'est JAMAIS optionnelle.",
  },
]

const PRACTICE_CASES = EXTRACTION_CASES; // Declare the PRACTICE_CASES variable

export default function ExtractionGame() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; title: string; message: string } | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const currentCase = EXTRACTION_CASES[currentIndex]

  const handleDecision = (userSaysCorrect: boolean) => {
    // userSaysCorrect = true means user clicked "À FAIRE" (DO)
    // userSaysCorrect = false means user clicked "À ÉVITER" (DON'T)
    const isCorrect = userSaysCorrect === currentCase.isCorrect
    if (isCorrect) setScore((s) => s + 1)

    setFeedback({
      isCorrect,
      title: isCorrect ? "Bonne réponse !" : "Mauvaise réponse",
      message: isCorrect ? currentCase.correctFeedback : currentCase.wrongFeedback,
    })
  }

  const nextCase = () => {
    setFeedback(null)
    if (currentIndex < EXTRACTION_CASES.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setCompleted(true)
    }
  }

  const restart = () => {
    setCurrentIndex(0)
    setScore(0)
    setCompleted(false)
    setFeedback(null)
    setShowIntro(true)
  }

  // Intro Screen
  if (showIntro) {
    return (
      <div className="min-h-screen flex items-start justify-center pt-8 p-6" style={{ backgroundColor: "#F3F1FF" }}>
        <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/game-icon.png" alt="Game icon" className="w-10 h-10 rounded-xl" />
                <div>
                  <h1 className="text-lg font-bold text-slate-900">À Faire ou À Éviter ?</h1>
                  <p className="text-xs text-slate-500">Bonnes pratiques d&apos;extraction</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-600 font-medium">
                  Score: <span className="text-rose-600">{score}</span>
                </span>
                <button onClick={restart} className="p-2 text-slate-400 hover:text-slate-600 transition">
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </header>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2">
            <div
              className="bg-gradient-to-r from-purple-400 to-purple-600 h-full transition-all duration-500 ease-out"
              style={{ width: "0%" }}
            />
          </div>

          {/* Intro Content */}
          <main className="bg-white p-10 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ThumbsUp className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-4">Comment Jouer ?</h2>
            <p className="text-slate-600 mb-2">Lisez chaque affirmation sur les pratiques d&apos;extraction.</p>
            <p className="text-slate-600 mb-8">
              Choisissez <strong className="text-emerald-600">À FAIRE</strong> si c&apos;est une bonne pratique ou{" "}
              <strong className="text-rose-600">À ÉVITER</strong> si c&apos;est une mauvaise pratique.
            </p>
            <button
              onClick={() => setShowIntro(false)}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition shadow-lg"
            >
              C&apos;est parti
            </button>
          </main>
        </div>
      </div>
    )
  }

  // Completed Screen
  if (completed) {
    return (
      <div className="min-h-screen flex items-start justify-center pt-8 p-6" style={{ backgroundColor: "#F3F1FF" }}>
        <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <header className="bg-white border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/game-icon.png" alt="Game icon" className="w-10 h-10 rounded-xl" />
                <div>
                  <h1 className="text-lg font-bold text-slate-900">À Faire ou À Éviter ?</h1>
                  <p className="text-xs text-slate-500">Bonnes pratiques d&apos;extraction</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-slate-600 font-medium">
                  Score: <span className="text-rose-600">{score}</span>
                </span>
                <button onClick={restart} className="p-2 text-slate-400 hover:text-slate-600 transition">
                  <RotateCcw size={20} />
                </button>
              </div>
            </div>
          </header>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 h-2">
            <div
              className="bg-gradient-to-r from-rose-400 to-rose-600 h-full transition-all duration-500 ease-out w-full"
            />
          </div>

          {/* Completion Content */}
          <main className="bg-white p-10 text-center">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-5xl">&#11088;</span>
            </div>
            <h2 className="text-3xl font-black text-emerald-600 mb-4">Simulation Terminée !</h2>
            <p className="text-slate-600 mb-8 text-lg">
              Vous avez terminé avec un score de{" "}
              <span className="font-bold text-purple-600">
                {score} / {PRACTICE_CASES.length}
              </span>
            </p>
            <button
              onClick={restart}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition shadow-lg"
            >
              Recommencer
            </button>
          </main>
        </div>
      </div>
    )
  }

  // Game Screen
  return (
    <div className="min-h-screen flex items-start justify-center pt-8 p-6" style={{ backgroundColor: "#F3F1FF" }}>
      <div className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/game-icon.png" alt="Game icon" className="w-10 h-10 rounded-xl" />
              <div>
                <h1 className="text-lg font-bold text-slate-900">À Faire ou À Éviter ?</h1>
                <p className="text-xs text-slate-500">Bonnes pratiques d&apos;extraction</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-slate-600 font-medium">
                Score: <span className="text-rose-600">{score}</span>
              </span>
              <button onClick={restart} className="p-2 text-slate-400 hover:text-slate-600 transition">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2">
          <div
            className="bg-gradient-to-r from-purple-400 to-purple-600 h-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / PRACTICE_CASES.length) * 100}%` }}
          />
        </div>

        {/* Game Content */}
        <main className="flex-1 flex flex-col items-center justify-start pt-12 p-6" style={{ backgroundColor: "#C3B1E1" }}>
          {/* Statement Card */}
          <div className="w-full max-w-md rounded-3xl overflow-hidden shadow-2xl mb-8 bg-white p-8">
            <p className="text-center text-slate-500 text-sm font-medium mb-4 uppercase tracking-wider">
              Cette pratique est-elle correcte ?
            </p>
            <p className="text-center text-xl font-bold text-slate-800 leading-relaxed">
              {currentCase.statement}
            </p>
          </div>

          {/* Feedback Modal */}
          {feedback && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
              <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center animate-in zoom-in duration-200">
                <div
                  className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${feedback.isCorrect ? "bg-yellow-100" : "bg-red-100"}`}
                >
                  {feedback.isCorrect ? (
                    <span className="text-3xl">&#11088;</span>
                  ) : (
                    <XCircle size={32} className="text-red-600" />
                  )}
                </div>
                <h4 className={`text-xl font-black mb-3 ${feedback.isCorrect ? "text-emerald-600" : "text-red-600"}`}>
                  {feedback.title}
                </h4>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{feedback.message}</p>
                <button
                  onClick={nextCase}
                  className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {/* Decision Buttons */}
          <div className="flex gap-6 w-full max-w-md justify-center">
            <button
              onClick={() => handleDecision(false)}
              className="group flex-1 bg-white/10 backdrop-blur-sm border-2 border-rose-400/50 hover:border-rose-400 hover:bg-rose-500/20 rounded-2xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rose-500/20 group-hover:bg-rose-500/40 flex items-center justify-center transition-all">
                  <ThumbsDown className="w-7 h-7 text-rose-300 group-hover:text-rose-200" />
                </div>
                <span className="font-bold text-white/90 group-hover:text-white text-sm tracking-wide">À ÉVITER</span>
              </div>
            </button>
            <button
              onClick={() => handleDecision(true)}
              className="group flex-1 bg-white/10 backdrop-blur-sm border-2 border-emerald-400/50 hover:border-emerald-400 hover:bg-emerald-500/20 rounded-2xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/40 flex items-center justify-center transition-all">
                  <ThumbsUp className="w-7 h-7 text-emerald-300 group-hover:text-emerald-200" />
                </div>
                <span className="font-bold text-white/90 group-hover:text-white text-sm tracking-wide">À FAIRE</span>
              </div>
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
