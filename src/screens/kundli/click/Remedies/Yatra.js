import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as KundliActions from "../../../../redux/actions/KundliActions";
import MyHeader from "../../../../components/MyHeader";
import { colors } from "../../../../config/Constants1";
import { Fonts } from "../../../../assets/style";

const Yatra = ({ navigation, dispatch, yaradata }) => {
  useEffect(() => {
    dispatch(KundliActions.getyatra());
  }, [dispatch]);

  console.log("This is yaradata", yaradata);

  return (
    <ScrollView style={styles.container}>
      {yaradata && (
        <View style={styles.content}>
          <Text style={styles.yantra}>Yantra: {yaradata.yantra}</Text>
          <Text style={styles.heading}>{yaradata.heading}</Text>
          <Text style={styles.resp}>{yaradata.resp}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  content: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  heading: {
    marginBottom: 10,
    ...Fonts.JostSemiBoldBlack,
    fontSize:21
  },
  resp: {
    marginBottom: 10,
    textAlign: "center",
    ...Fonts.JostMediumBlack
  },
  yantra: {
    marginBottom: 20,
    textAlign: "center",
    ...Fonts.JostSemiBoldBlack,
    fontSize:21
  },
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

const mapStateToProps = (state) => ({
  yaradata: state.kundli.yaradata,
});

export default connect(mapStateToProps, mapDispatchToProps)(Yatra);
