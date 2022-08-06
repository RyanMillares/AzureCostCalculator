import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const theme = createTheme({
  typography: {
    fontFamily: ['"Segoe UI Light"']
  },
  palette: {
    primary: {
      main: '#ff5200',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});

function PricingContent() {
  const [appSize, setAppSize] = useState('Small');

  const numServers = {
    'Small': [3, 6, 9],
    'Medium': [12, 15, 18],
    'Large': [21, 24, 27],
    'X-Large': [30, 33, 36]
  }

  console.log(numServers['Small'])

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar
          position="static"
          color="primary"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Azure Cost Calculator
            </Typography>
            <nav>
              <Link
                variant="button"
                color="secondary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
                >
                  <Typography>
                    Support
                  </Typography>
              </Link>
            </nav>
            <Button href="#" variant="outlined" color="secondary" sx={{ my: 1, mx: 1.5 }}>
              <Typography>
                Login
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container disableGutters maxWidth="md" sx={{ pt: 4, pb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                <Select
                  label="App Size"
                  variant="outlined"
                  >
                  <MenuItem value='Small' selected onClick={() => setAppSize('Small')}>Small</MenuItem>
                  <MenuItem value='Medium' onClick={() => setAppSize('Medium')}>Medium</MenuItem>
                  <MenuItem value='Large' onClick={() => setAppSize('Large')}>Large</MenuItem>
                  <MenuItem value='X-Large' onClick={() => setAppSize('X-Large')}>X-Large</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Number of Servers</InputLabel>
                <Select
                  label="Number of Servers"
                  variant="outlined"
                  >
                  <MenuItem value={numServers[appSize][0]}>{numServers[appSize][0]}</MenuItem>
                  <MenuItem value={numServers[appSize][1]}>{numServers[appSize][1]}</MenuItem>
                  <MenuItem value={numServers[appSize][2]}>{numServers[appSize][2]}</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Container>
        {/* End hero unit */}
        <Container maxWidth="xl" component="main">
          <Grid container spacing={5}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title="IAAS"
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                  }}
                  />
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                      <Select
                        label="Web Tier"
                        variant="outlined"
                        >
                          <MenuItem>D1_v2 CPU: 1, RAM: 3.5 , Storage: 50, Price: 15</MenuItem>
                          <MenuItem>D2_v3 CPU: 2 , RAM: 8 , Storage: 50, Price: 27</MenuItem>
                          <MenuItem>D4s_v3 CPU: 4 , RAM: 16 , Storage: 32, Price: 54</MenuItem>
                          <MenuItem>D8s_v3 CPU: 8 , RAM: 32 , Storage: 64, Price: 107</MenuItem>
                          <MenuItem>D16s_v3 CPU: 16 , RAM: 64 , Storage: 128, Price: 215</MenuItem>
                          <MenuItem>D32s_v3 CPU: 32 , RAM: 128 , Storage: 256, Price: 431</MenuItem>
                          <MenuItem>D64s_v3 CPU: 64 , RAM: 256 , Storage: 512, Price: 861</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                      <Select
                        label="API Tier"
                        variant="outlined"
                        >
                          <MenuItem>F2s_v2 CPU: 2 , RAM: 4 , Storage: 16, Price: 23</MenuItem>
                          <MenuItem>F4s_v2 CPU: 4 , RAM: 8 , Storage: 32, Price: 45</MenuItem>
                          <MenuItem>F8s_v2 CPU: 8 , RAM: 16 , Storage: 64, Price: 91</MenuItem>
                          <MenuItem>F16s_v2 CPU: 16 , RAM: 32 , Storage: 128, Price: 181</MenuItem>
                          <MenuItem>F32s_v2 CPU: 32 , RAM: 64 , Storage: 256, Price: 362</MenuItem>
                          <MenuItem>F48s_v2 CPU: 48 , RAM: 96 , Storage: 384, Price: 534</MenuItem>
                          <MenuItem>F64s_v2 CPU: 64 , RAM: 128 , Storage: 512, Price: 724</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">App Size</InputLabel>
                      <Select
                        label="DB Tier"
                        variant="outlined"
                        >
                          <MenuItem>E2s_v3 CPU: 2 , RAM: 16 , Storage: 32, Price: 37</MenuItem>
                          <MenuItem>E4s_v5 CPU: 4 , RAM: 32 , Storage: 150, Price: 79</MenuItem>
                          <MenuItem>E8s_v3 CPU: 8, RAM: 64 , Storage: 128, Price: 146</MenuItem>
                          <MenuItem>E16s_v3 CPU: 16, RAM: 128 , Storage: 256, Price: 292</MenuItem>
                          <MenuItem>E32_v3 CPU: 32 , RAM: 256 , Storage: 800, Price: 584</MenuItem>
                      </Select>
                    </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained">
                    Button
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardHeader
                  title='PAAS'
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                  }}
                  />
                <CardContent>
                <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>VM</TableCell>
                          <TableCell>CPU</TableCell>
                          <TableCell>RAM</TableCell>
                          <TableCell>Storage</TableCell>
                          <TableCell>Cost</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>1</TableCell>
                          <TableCell>15</TableCell>
                          <TableCell>i7-7700K</TableCell>
                          <TableCell>8GB</TableCell>
                          <TableCell>256 GB</TableCell>
                          <TableCell>$97.34</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2</TableCell>
                          <TableCell>17</TableCell>
                          <TableCell>i9-9900K</TableCell>
                          <TableCell>16GB</TableCell>
                          <TableCell>512 GB</TableCell>
                          <TableCell>$111.34</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="outlined">
                    Button
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}