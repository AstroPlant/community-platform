import { createGlobalStyle } from "styled-components";
import Breaks from "../utils/breakpoints";

export const GlobalStyle = createGlobalStyle`
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${(props) => props.theme.fontFamily};
    color: ${(props) => props.theme.light};
    background-color: ${(props) => props.theme.dark};
  }

  h1,
  h2 {
    font-weight: 600;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
    font-weight: 550;
  }
  
  h6 {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  p,b {
    font-size: 1em;
    line-height: 1.5;
  }
  
  p {
    font-weight: 300;
    text-transform: none;
  }

  b {
    font-weight: 600;
    text-transform: none;
  }
  
  a,
  a:visited {
    color: inherit;
    text-decoration: none;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  input, button {
    outline: none;
    border: none;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
    border-radius: ${(props) => props.theme.radiusMin};
  }

  @keyframes cta-arrow {
    0% {
      transform: translatex(0px);
    }
    50% {
      transform: translatex(5px);
    }
    100% {
      transform: translatex(0px);
    }
  }

  @keyframes float {
    0% {
      transform: translatey(0px);
    }
    50% {
      transform: translatey(-10px);
    }
    100% {
      transform: translatey(0px);
    }
  }

  .custom-popup {
    top: -16px !important;
    left: -16px !important;
  }

  .custom-popup .leaflet-popup-content-wrapper {
    display: flex;

    padding: 0;
    height: 32px;
    border-radius: 16px;
    
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.dark};

    font-family: ${(props) => props.theme.fontFamily};
    font-size: 16px;
    font-weight: 450;
    line-height: 32px;
  }

  .custom-popup .leaflet-popup-content {
    display: flex;
    align-items: center;

    margin: 0 16px 0 8px;
  }

  .custom-popup .leaflet-popup-content-wrapper a,
  .custom-popup .leaflet-popup-tip-container,
  .custom-popup .leaflet-popup-tip,
  .custom-popup .leaflet-popup-close-button  {
    display: none;
  }

  @media screen and (max-width: ${Breaks.small}){
    h1 {
      font-size: 2rem;
    }
  
    h2 {
      font-size: 1.75rem;
    }
  
    h3 {
      font-size: 1.5rem;
      font-weight: 550;
    }
    
    h5 {
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }
`;
