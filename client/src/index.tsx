import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/UserStore';
import CourseStore from "./store/CourseStore";

export const Context = createContext(null) as any

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
        <Context.Provider value={{
            user: new UserStore(),
            course: new CourseStore()
        }}>
            <App />
        </Context.Provider>
);