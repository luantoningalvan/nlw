import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { styles } from "./styles";

import logoImg from "../../assets/logo-nlw-esports.png";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.0.110:3333/games")
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logoImg} />
        <Heading
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar.."
        />

        <FlatList
          data={games}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
