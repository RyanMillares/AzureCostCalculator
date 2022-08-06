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
  const [servers, setServers] = useState(0);

  const [webPrice, setWebPrice] = useState(0);
  const [apiPrice, setApiPrice] = useState(0);
  const [dbPrice, setDbPrice] = useState(0);


  const numServers = {
    'Small': [3, 6, 9],
    'Medium': [12, 15, 18],
    'Large': [21, 24, 27],
    'X-Large': [30, 33, 36]
  }

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
          </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container disableGutters maxWidth="md" sx={{ pt: 4, pb: 4 }}>
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
                  <MenuItem value={numServers[appSize][0]} onClick={() => setServers(parseInt(numServers[appSize][0]))}>{numServers[appSize][0]}</MenuItem>
                  <MenuItem value={numServers[appSize][1]} onClick={() => setServers(parseInt(numServers[appSize][1]))}>{numServers[appSize][1]}</MenuItem>
                  <MenuItem value={numServers[appSize][2]} onClick={() => setServers(parseInt(numServers[appSize][2]))}>{numServers[appSize][2]}</MenuItem>
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Web Tier</InputLabel>
                        <Select
                          label="Web Tier"
                          variant="outlined"
                          >
                            <MenuItem value="D1_v2" onClick={() => setWebPrice(15)}>D1_v2 CPU: 1, RAM: 3.5 , Storage: 50, Price: 15</MenuItem>
                            <MenuItem value="D2_v3" onClick={() => setWebPrice(27)}>D2_v3 CPU: 2 , RAM: 8 , Storage: 50, Price: 27</MenuItem>
                            <MenuItem value="D4s_v3" onClick={() => setWebPrice(54)}>D4s_v3 CPU: 4 , RAM: 16 , Storage: 32, Price: 54</MenuItem>
                            <MenuItem value="D8s_v3" onClick={() => setWebPrice(107)}>D8s_v3 CPU: 8 , RAM: 32 , Storage: 64, Price: 107</MenuItem>
                            <MenuItem value="D16s_v3" onClick={() => setWebPrice(215)}>D16s_v3 CPU: 16 , RAM: 64 , Storage: 128, Price: 215</MenuItem>
                            <MenuItem value="D32s_v3" onClick={() => setWebPrice(431)}>D32s_v3 CPU: 32 , RAM: 128 , Storage: 256, Price: 431</MenuItem>
                            <MenuItem value="D64s_v3" onClick={() => setWebPrice(861)}>D64s_v3 CPU: 64 , RAM: 256 , Storage: 512, Price: 861</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">API Tier</InputLabel>
                        <Select
                          label="API Tier"
                          variant="outlined"
                          >
                            <MenuItem value="F2s_v2" onClick={() => setApiPrice(23)}>F2s_v2 CPU: 2 , RAM: 4 , Storage: 16, Price: 23</MenuItem>
                            <MenuItem value="F4s_v2" onClick={() => setApiPrice(45)}>F4s_v2 CPU: 4 , RAM: 8 , Storage: 32, Price: 45</MenuItem>
                            <MenuItem value="F8s_v2" onClick={() => setApiPrice(91)}>F8s_v2 CPU: 8 , RAM: 16 , Storage: 64, Price: 91</MenuItem>
                            <MenuItem value="F16s_v2" onClick={() => setApiPrice(181)}>F16s_v2 CPU: 16 , RAM: 32 , Storage: 128, Price: 181</MenuItem>
                            <MenuItem value="F32s_v2" onClick={() => setApiPrice(362)}>F32s_v2 CPU: 32 , RAM: 64 , Storage: 256, Price: 362</MenuItem>
                            <MenuItem value="F48s_v2" onClick={() => setApiPrice(534)}>F48s_v2 CPU: 48 , RAM: 96 , Storage: 384, Price: 534</MenuItem>
                            <MenuItem value="F64s_v2" onClick={() => setApiPrice(724)}>F64s_v2 CPU: 64 , RAM: 128 , Storage: 512, Price: 724</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">DB Tier</InputLabel>
                        <Select
                          label="DB Tier"
                          variant="outlined"
                          >
                            <MenuItem value="E2s_v3" onClick={() => setDbPrice(37)}>E2s_v3 CPU: 2 , RAM: 16 , Storage: 32, Price: 37</MenuItem>
                            <MenuItem value="E4s_v5" onClick={() => setDbPrice(79)}>E4s_v5 CPU: 4 , RAM: 32 , Storage: 150, Price: 79</MenuItem>
                            <MenuItem value="E8s_v3" onClick={() => setDbPrice(146)}>E8s_v3 CPU: 8, RAM: 64 , Storage: 128, Price: 146</MenuItem>
                            <MenuItem value="E16s_v3" onClick={() => setDbPrice(292)}>E16s_v3 CPU: 16, RAM: 128 , Storage: 256, Price: 292</MenuItem>
                            <MenuItem value="E32s_v3" onClick={() => setDbPrice(584)}>E32_v3 CPU: 32 , RAM: 256 , Storage: 800, Price: 584</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h4" align="center">
                        ${webPrice * (servers/3)}
                      </Typography>
                      <Typography variant="h6" align="center" color="text.secondary">
                        Web Cost
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h4" align="center">
                        ${apiPrice * (servers/3)}
                      </Typography>
                      <Typography variant="h6" align="center" color="text.secondary">
                        API Cost
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography variant="h4" align="center">
                        ${dbPrice * (servers/3)}
                      </Typography>
                      <Typography variant="h6" align="center" color="text.secondary">
                        DB Cost
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid container sx={{ mt: 2}}>
                    <Grid item xs={12} md={12}>
                      <Typography variant="h2" align="center">
                        ${(webPrice + apiPrice + dbPrice) * (servers/3)}
                      </Typography>
                      <Typography variant="h6" align="center" color="text.secondary">
                        Total Cost
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
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