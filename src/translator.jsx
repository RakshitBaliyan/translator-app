// src/Translator.jsx
import { faMagento } from '@fortawesome/free-brands-svg-icons';
import { width } from '@fortawesome/free-brands-svg-icons/fa42Group';
import React, { useState } from 'react';

const Translator = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Replace with your actual RapidAPI key
  const RAPIDAPI_KEY = '7edf3fb9d0msh78bfdab4523a883p18d7c8jsna85d08bc57cd';

  const languageOptions = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'hi', name: 'Hindi' },
    // Add more languages as needed
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate.');
      return;
    }

    setIsLoading(true);
    setError('');
    setTranslatedText('');

    const url = 'https://text-translator2.p.rapidapi.com/translate';

    const payload = new URLSearchParams();
    payload.append('source_language', sourceLang);
    payload.append('target_language', targetLang);
    payload.append('text', sourceText);
    payload.append('safe_mode', 'false');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
        },
        body: payload.toString(),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.data && data.data.translatedText) {
        setTranslatedText(data.data.translatedText);
      } else {
        throw new Error('Unexpected response structure.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="translator-container" style={styles.container}>
      <h2 style={styles.heading}>Text Translator</h2>
      <div style={styles.field}>
        <label style={styles.label}>Source Language:</label>
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          style={styles.select}
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Target Language:</label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          style={styles.select}
        >
          {languageOptions.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Text to Translate:</label>
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          rows="5"
          style={styles.textarea}
          placeholder="Enter text here..."
        ></textarea>
      </div>

      <button onClick={handleTranslate} style={styles.button} disabled={isLoading}>
        {isLoading ? 'Translating...' : 'Translate'}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {translatedText && (
        <div style={styles.result}>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  select: {
    width: '50%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    
    width: '90%',
    margin: '2rem',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    width: '50%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    marginTop: '15px',
    color: 'red',
    textAlign: 'center',
  },
  result: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e9ecef',
    borderRadius: '4px',
  },
};

export default Translator;
