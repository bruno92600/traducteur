"use client";
import { Dropdown } from "./components/dropdown";
import { useState } from "react";
import { translate } from "./actions/translate";
import VoiceRecorder from "./components/voice-recorder";
import SaveBtn from "./components/save-translation-btn";

const languageOptions = [
  {
    value: "fr",
    label: "French",
  },
  {
    value: "es",
    label: "Spanish",
  },
  {
    value: "en",
    label: "English",
  },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("fr");
  const [languageTo, setLanguageTo] = useState("en");

  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    setIsSaved(true);
  };

  const handleLanguageFromChange = (value) => {
    setLanguageFrom(value);
  };

  const handleLanguageToChange = (value) => {
    setLanguageTo(value);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
  };

  const handleInputSet = async (value) => {
    setInputText(value);
    const formData = new FormData();
    formData.append("text", value);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  };

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter text-gray-500 sm:text-5xl md:text-6xl">
          Traduit <span className="text-amber-600">facilement</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Brisez instantanément les barrières linguistiques grâce à notre
          puissante application de traduction. Essayez-la maintenant !
        </p>
      </div>
      <div className="shadow-xl rounded-lg p-6 max-w-3xl mx-auto">
        <div className="grid grid-rows-[20px_1fr_20px] items-start justify-items-center p-2 pb-2 gap-4 sm:p-6 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <form
            className="w-full"
              action={async (formData) => {
                const result = await translate(formData);
                setTranslatedText(result.translation);
                if (isSaved) {
                  setIsSaved(false);
                }
              }}
            >
              <div className="flex flex-row gap-4">
                <div className="container flex flex-col">
                  <Dropdown
                    name="languageFrom"
                    value={languageFrom}
                    options={languageOptions}
                    onChange={handleLanguageFromChange}
                  />
                  <textarea
                    placeholder="Entrer un texte pour le traduire"
                    className="border border-slate-800 rounded-md p-4 text-black"
                    value={inputText}
                    name="text"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="container flex flex-col">
                  <div className="flex justify-between">
                    <Dropdown
                      name="languageTO"
                      value={languageTo}
                      options={languageOptions}
                      onChange={handleLanguageToChange}
                    />
                    <SaveBtn
                      sourceLan={languageFrom}
                      targetLan={languageTo}
                      sourceText={inputText}
                      targetText={translatedText}
                      onHandleSave={onSave}
                      isSaved={isSaved}
                    />
                  </div>
                  <textarea
                    placeholder="Le texte traduit apparaît ici"
                    className="border border-slate-800 rounded-md p-4 text-black"
                    value={translatedText}
                    readOnly
                  />
                </div>
              </div>
              <div className="flex flow-row items-center gap-2 h-16">
                <button
                  type="submit"
                  className="p-3 rounded-md bg-slate-600 text-white"
                >
                  Traduire
                </button>
                {languageFrom === "en" && (
                  <VoiceRecorder handleSetText={handleInputSet} />
                )}
              </div>
            </form>
          </main>
        </div>
      </div>
    </section>
  );
}
