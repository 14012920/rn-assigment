import React from "react";
import { Text, withTheme, Card } from "react-native-paper";

const MovieCard = ({ item }) => {
  return (
    <Card style={{ minWidth: "48%", maxWidth: "48%" }}>
      <Card.Content
        style={{ borderRadius: 0, minWidth: "100%", justifyContent: "center" }}
      >
        <Card.Cover
          source={{
            uri: `https://image.tmdb.org/t/p/original${item?.poster_path}`,
          }}
          style={{ resizeMode: "contain" }}
        />
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginTop: 5 }}
        >
          {item?.title}
        </Text>
      </Card.Content>
    </Card>
  );
};
export default withTheme(MovieCard);
