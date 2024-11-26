import React from "react";
import { Container, Menu, Segment } from "semantic-ui-react";
import "../css/Styles.css";

const Footer = () => {
  return (
    <Menu className="footer">
      <Menu.Menu>
        <Menu.Item>
          <h3 className="lobster-font">Cupcake Dream</h3>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

export default Footer;
