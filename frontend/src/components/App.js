import {
    Container,
    Row,
    Col
} from 'reactstrap';
import Pricing from './Pricing';
import Header from './Header';

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
