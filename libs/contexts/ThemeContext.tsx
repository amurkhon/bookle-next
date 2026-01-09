import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
	mode: ThemeMode;
	toggleTheme: () => void;
	setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useAppTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useAppTheme must be used within a ThemeProvider');
	}
	return context;
};

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [mode, setModeState] = useState<ThemeMode>('light');

	// Load theme from localStorage on mount
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('themeMode') as ThemeMode;
			if (savedTheme === 'light' || savedTheme === 'dark') {
				setModeState(savedTheme);
			}
		}
	}, []);

	// Apply theme class to document body
	useEffect(() => {
		if (typeof window !== 'undefined') {
			document.documentElement.setAttribute('data-theme', mode);
			document.body.setAttribute('data-theme', mode);
			localStorage.setItem('themeMode', mode);
		}
	}, [mode]);

	const toggleTheme = () => {
		setModeState((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const setMode = (newMode: ThemeMode) => {
		setModeState(newMode);
	};

	return (
		<ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
