import { useState, useEffect } from "react"
import MainScreen from "./components/MainScreen"
import yellowBlob from "./assets/yellow-blob.svg";
import blueBlob from "./assets/blue-blob.svg";
import Quiz from "./components/Quiz";


export default function App() {
  const [isMainScreen, setIsMainScreen] = useState(true);
  let [questions, setQuestion] = useState("");
  useEffect(() => {
    if(isMainScreen == true) { 
      fetch("https://opentdb.com/api.php?amount=5&category=9")
        .then(res => res.json())
        .then(data => setQuestion(data.results));
    }
  }, [isMainScreen])

  return (
    <main className="App">
      <img className="yellow-blob" src={yellowBlob} alt="" />
      <img className="blue-blob" src={blueBlob} alt="" />
      {isMainScreen && <MainScreen setIsMainScreen={setIsMainScreen} />}
      {!isMainScreen && <Quiz
        setIsMainScreen={setIsMainScreen}
        questions={questions} />}
    </main>
  )
}

