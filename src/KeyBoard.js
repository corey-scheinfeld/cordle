import { keyboard } from '@testing-library/user-event/dist/keyboard';
import React from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

export default function KeyBoard({guess, setGuess, setEdit, attempts, themes}){


    const onChange = (input) => {
        console.log("Input changed", input);
    }

    const onKeyPress = (button) => {
        if((button == "{bksp}" && guess.length !=0)|| button == "{enter}"){
            setEdit(button);
        }
        else if(guess.length < 5){
            setGuess([...guess, button]);
        }
    }

    const display = {
        '{bksp}': 'back',
        '{enter}': 'enter',
    }

    const  layout = {
        'default': [
            'q w e r t y u i o p',
            'a s d f g h j k l',
            '{enter} z x c v b n m {bksp}',
        ],
    }   

    

    const keyboard = <Keyboard buttonTheme={themes} theme={"hg-theme-default hg-layout-default myTheme"} inputName={attempts.toString()} onChange={onChange} onKeyPress={onKeyPress} layout = {layout} display = {display} maxLength = {5}/>

    return (
      keyboard
    );
}