import type { AppProps } from 'next/app';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import { light, dark } from '../scss/MaterialTheme';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { appWithTranslation } from 'next-i18next';
import { initializeCart } from '../libs/utils/cart';
import { ThemeProvider as AppThemeProvider, useAppTheme } from '../libs/contexts/ThemeContext';
import '../scss/app.scss';
import '../scss/pc/main.scss';
import '../scss/mobile/main.scss';

const AppContent = ({ Component, pageProps }: AppProps) => {
	const { mode } = useAppTheme();
	const client = useApollo(pageProps.initialApolloState);

	// Create theme based on mode
	const theme = useMemo(() => {
		return createTheme(mode === 'dark' ? dark : light);
	}, [mode]);

	// Initialize cart from localStorage on app load
	useEffect(() => {
		initializeCart();
	}, []);

	return (
		<ApolloProvider client={client}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</MuiThemeProvider>
		</ApolloProvider>
	);
};

const App = (props: AppProps) => {
	return (
		<AppThemeProvider>
			<AppContent {...props} />
		</AppThemeProvider>
	);
};

export default appWithTranslation(App);
