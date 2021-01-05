//Core
import React from 'react'
import { useState, useEffect } from 'react'
import {useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt"

export function AddHomeButton() {
    const [prompt, promptToInstall] = useAddToHomescreenPrompt();
    const [isVisible, setVisibleState] = useState(false);
  
    const hide = () => setVisibleState(false);
  
    useEffect(
      () => {
        if (prompt) {
          setVisibleState(true);
        }
      },
      [prompt]
    );
  
    if (!isVisible) {
      return <div />;
    }
  
    return (
      <div onClick={hide}>
        <button onClick={hide}>Close</button>
        Hello! Wanna add to homescreen?
        <button onClick={promptToInstall}>Add to homescreen</button>
      </div>
    );
  }