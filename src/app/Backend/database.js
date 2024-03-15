import { createContext, useState } from "react";
import { supabase } from "../Components/TaskSnippet";

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
export async function getRandomQuestionID(difficulty, selectedLanguages) {
    console.log("Finding random question");

    const { data: questions, error } = await supabase
        .from('question')
        .select(`id, solution (id, language)`)
        .eq('difficulty', difficulty)
        .in("solution.language", selectedLanguages);

    console.log(questions);

    let x = getRandomInteger(0, questions.length - 1);

    return questions[x].id;
}

// User stuff

const UserContext = createContext(); 

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Expose functions to update the user state
    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
        {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};