import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

export const LeaderBoard = ({ userScores }) => {
  const renderPlayers = userScores.map((item, index) => (
    <div key={index}>Player {index + 1}:</div>
  ));
  const renderPlayerScores = userScores.map((item, index) => (
    <div key={index}>{item}</div>
  ));
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col xs lg="2">
          {renderPlayers}
        </Col>
        <Col>{renderPlayerScores}</Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
