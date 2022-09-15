import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { THEME } from "../../theme";
import logoImage from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;

  const [ads, setAds] = useState<DuoCardProps[]>([]);

  useEffect(() => {
    fetch(`http://192.168.0.105:3333/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => setAds(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImage} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          resizeMode="cover"
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => {}} />
          )}
          horizontal
          contentContainerStyle={
            ads.length === 0 ? styles.emptyListContent : styles.contentList
          }
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          ListEmptyComponent={
            <Text style={styles.emptyList}>
              Não há anúncios publicados ainda
            </Text>
          }
        />
      </SafeAreaView>
    </Background>
  );
}
