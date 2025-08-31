import React, { useState } from 'react';

const App = () => {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('python');
  const [copied, setCopied] = useState(false);

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const sampleCodes = {
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(5))`,
    javascript: `function calculateTotal(items) {
    return items.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
}`,
    java: `public class Calculator {
    public static int add(int a, int b) {
        return a + b;
    }
}`
  };

  const explainCode = async () => {
    if (!code.trim()) {
      alert('Please enter some code to explain!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Error:', error);
      setExplanation('Sorry, there was an error explaining the code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(explanation);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadExplanation = () => {
    const element = document.createElement('a');
    const file = new Blob([`Code:\n${code}\n\nExplanation:\n${explanation}`], {
      type: 'text/plain'
    });
    element.href = URL.createObjectURL(file);
    element.download = `code-explanation-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const loadSample = () => {
    setCode(sampleCodes[language] || sampleCodes.python);
  };

  const clearAll = () => {
    setCode('');
    setExplanation('');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw', // Full viewport width
      background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 35%, #1e293b 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
      margin: 0,
      padding: 0
    },
    header: {
      textAlign: 'center',
      padding: '3rem 1.5rem',
      marginBottom: '2rem'
    },
    title: {
      fontSize: '4rem',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #a855f7, #ec4899, #3b82f6)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '1rem'
    },
    subtitle: {
      fontSize: '1.25rem',
      color: '#cbd5e1',
      maxWidth: '42rem',
      margin: '0 auto'
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr', // Fixed 50-50 split
      gap: '2rem',
      width: '100%',
      maxWidth: 'none', // Remove max width restriction
      margin: '0',
      padding: '0 1.5rem'
    },
    panel: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      overflow: 'hidden'
    },
    panelHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    panelTitle: {
      fontSize: '1.5rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    select: {
      padding: '0.5rem 1rem',
      background: 'rgba(30, 41, 59, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.75rem',
      color: 'white',
      fontSize: '0.875rem',
      outline: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1rem'
    },
    button: {
      padding: '0.5rem 1rem',
      background: 'rgba(51, 65, 85, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.75rem',
      color: 'white',
      fontSize: '0.875rem',
      cursor: 'pointer',
      transition: 'all 0.2s',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      height: '20rem',
      background: 'rgba(15, 23, 42, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.75rem',
      padding: '1rem',
      color: 'white',
      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
      fontSize: '0.875rem',
      resize: 'none',
      outline: 'none'
    },
    explainButton: {
      width: '100%',
      background: isLoading || !code.trim() 
        ? 'linear-gradient(135deg, #64748b, #475569)' 
        : 'linear-gradient(135deg, #7c3aed, #3b82f6)',
      color: 'white',
      fontWeight: '600',
      padding: '1rem 1.5rem',
      borderRadius: '0.75rem',
      border: 'none',
      cursor: isLoading || !code.trim() ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      marginTop: '1.5rem'
    },
    explanationArea: {
      background: 'rgba(15, 23, 42, 0.5)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      minHeight: '20rem',
      maxHeight: '20rem',
      overflowY: 'auto'
    },
    emptyState: {
      height: '20rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8'
    },
    loadingState: {
      height: '20rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#cbd5e1'
    },
    spinner: {
      width: '3rem',
      height: '3rem',
      border: '4px solid rgba(124, 58, 237, 0.3)',
      borderTop: '4px solid #7c3aed',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '1rem'
    },
    actionButton: {
      padding: '0.5rem',
      background: 'rgba(51, 65, 85, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '0.75rem',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s'
    },
    footer: {
      textAlign: 'center',
      marginTop: '4rem',
      color: '#94a3b8'
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)', // Fixed 3 columns
      gap: '1.5rem',
      width: '100%',
      maxWidth: 'none', // Remove max width
      margin: '4rem auto 0',
      padding: '0 1.5rem'
    },
    featureCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(8px)',
      borderRadius: '1rem',
      padding: '1.5rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      textAlign: 'center'
    },
    featureIcon: {
      width: '3rem',
      height: '3rem',
      background: 'rgba(124, 58, 237, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 1rem',
      fontSize: '1.5rem'
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        button:hover {
          transform: scale(1.05);
        }
        
        button:disabled:hover {
          transform: scale(1);
        }
        
        .explanation-text {
          white-space: pre-wrap;
          line-height: 1.6;
          color: #e2e8f0;
        }
        
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={styles.header}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            padding: '1rem',
            background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
            borderRadius: '1rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold'
            }}>
              &lt;/&gt;
            </div>
          </div>
        </div>
        <h1 style={styles.title}>Code Explainer</h1>
        <p style={styles.subtitle}>
          Transform complex code into clear, understandable explanations with AI-powered analysis
        </p>
      </div>

      <div style={styles.mainGrid} className="main-grid">
        {/* Left Panel - Code Input */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>
              <span style={{ color: '#a855f7', fontSize: '1.25rem' }}>&lt;/&gt;</span>
              Your Code
            </h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={styles.select}
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <div style={{ padding: '1.5rem' }}>
            <div style={styles.buttonGroup}>
              <button onClick={loadSample} style={styles.button}>
                📝 Load Sample
              </button>
              <button onClick={clearAll} style={styles.button}>
                🗑️ Clear All
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              style={styles.textarea}
              spellCheck={false}
            />

            <button
              onClick={explainCode}
              disabled={isLoading || !code.trim()}
              style={styles.explainButton}
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Analyzing Code...
                </>
              ) : (
                <>
                  ✨ Explain Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Panel - Explanation */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>
              <span style={{ color: '#3b82f6', fontSize: '1.25rem' }}>🤖</span>
              AI Explanation
            </h2>
            {explanation && (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={copyToClipboard}
                  style={styles.actionButton}
                  title="Copy explanation"
                >
                  {copied ? '✅' : '📋'}
                </button>
                <button
                  onClick={downloadExplanation}
                  style={styles.actionButton}
                  title="Download explanation"
                >
                  💾
                </button>
              </div>
            )}
          </div>

          <div style={{ padding: '1.5rem' }}>
            {!explanation && !isLoading && (
              <div style={styles.emptyState}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>
                  &lt;/&gt;
                </div>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                  Ready to explain your code
                </p>
                <p style={{ fontSize: '0.875rem', textAlign: 'center' }}>
                  Paste your code on the left and click "Explain Code" to get started
                </p>
              </div>
            )}

            {isLoading && (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                  AI is analyzing your code...
                </p>
                <p style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                  This may take a few seconds
                </p>
              </div>
            )}

            {explanation && (
              <div style={styles.explanationArea}>
                <div className="explanation-text">
                  {explanation}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          Powered by <span style={{ color: '#a855f7', fontWeight: '600' }}>Ollama AI</span> ✨
        </p>
      </div>

      {/* Features Section */}
      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>⚡</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Instant Analysis
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Get immediate explanations for any code snippet
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🔧</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            Multi-Language
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Support for Python, JavaScript, Java, and more
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIcon}>🤖</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>
            AI Powered
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            Advanced AI models for accurate explanations
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;