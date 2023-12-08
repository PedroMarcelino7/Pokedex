import { useEffect, useState } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Typography } from '@mui/material';

const KanyeQuotes = () => {
    const [quote, setQuote] = useState('')

    const getQuotes = () => {
        axios.get('https://api.kanye.rest/')
            .then(res => setQuote(res.data.quote))
    }

    useEffect(() => {
        getQuotes()
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                maxWidth: '500px',
                margin: 'auto'
            }}
        >
            <Paper elevation={3} sx={{
                padding: '25px',
                textAlign: 'center',
                fontSize: '1.5rem',
                lineHeight: '1.5rem'
            }}>
                {quote}
            </Paper>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <RefreshIcon onClick={() => getQuotes()} cursor='pointer' />

                <Typography variant='h6' component='h1' textAlign='right'>
                    - Kanye West
                </Typography>
            </Box>
        </Box>
    )
}

export default KanyeQuotes
