import {
  MD3LightTheme as DefaultTheme,
  configureFonts,
} from "react-native-paper";

const fontConfig = {
  android: {
    regular: {
      fontFamily: "sans-serif",
      fontWeight: "normal",
    },
    medium: {
      fontFamily: "sans-serif-medium",
      fontWeight: "normal",
    },
    light: {
      fontFamily: "sans-serif-light",
      fontWeight: "normal",
    },
    thin: {
      fontFamily: "sans-serif-thin",
      fontWeight: "normal",
    },
  },
};

const Apptheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    backgroundColor: "#fefefe",
    textColor: "#1b1d1f",
    iconColor: "#235743",
  },
  font: configureFonts({ config: fontConfig, isV3: true }),
};

export default Apptheme;
