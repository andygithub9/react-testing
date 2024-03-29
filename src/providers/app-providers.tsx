import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

export default function AppProviders({ children }: { children: any }) {
  return (
    <ThemeProvider theme={theme}>
      <>
        <CssBaseline />
        {children}
      </>
    </ThemeProvider>
  )
}
