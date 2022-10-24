import {
    Container,
    Row,
    Col
} from 'reactstrap';
import Pricing from './../components/Pricing';
import Header from './header';

const App = () => {


    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col>
                        <Pricing />
                    </Col>
                </Row>
            </Container>

        </>
    );
};

export default App;
