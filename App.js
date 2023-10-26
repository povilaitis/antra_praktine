import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import data from './2PraktinėsUžduotiesDuomenys.json';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Street League"
        onPress={() => navigation.navigate('StreetLeague')}
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="Semi Pro League"
        onPress={() => navigation.navigate('SemiProLeague')}
      />
    </View>
  );
}

function StreetLeagueScreen({ navigation }) {
  const streetDriversData = data.find((league) => league.league_title === 'STREET').drivers;
  const [streetDrivers, setStreetDrivers] = useState(streetDriversData);
  const [sortOrder, setSortOrder] = useState('default');

  const sortByAlphabetically = () => {
    const sortedDrivers = [...streetDrivers].sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`;
      const nameB = `${b.firstname} ${b.lastname}`;
      return nameA.localeCompare(nameB);
    });

    setStreetDrivers(sortedDrivers);
    setSortOrder('alphabetical');
  };

  const sortByTandemPoints = () => {
    const sortedDrivers = [...streetDrivers].sort((a, b) => {
      const pointsA = a.race.reduce((total, race) => total + parseFloat(race.tandem_points || 0), 0);
      const pointsB = b.race.reduce((total, race) => total + parseFloat(race.tandem_points || 0), 0);
      return pointsB - pointsA;
    });

    setStreetDrivers(sortedDrivers);
    setSortOrder('tandemPoints');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Street League</Text>
      <Button title="Sort Alphabetically" onPress={sortByAlphabetically} />
      <Button title="Sort by Tandem Points" onPress={sortByTandemPoints} />
      {streetDrivers.map((driver) => {
        const totalTandemPoints = driver.race.reduce(
          (total, race) => total + parseFloat(race.tandem_points || 0),
          0
        );

        return (
          <View key={driver.driver_id}>
            <Text>Name: {driver.firstname} {driver.lastname}</Text>
            <Text>League: STREET</Text>
            <Text>Car: {driver.car}</Text>
            <Text>Total Tandem Points: {totalTandemPoints}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('Details', { driver })}
            />
            <View style={{ marginVertical: 10 }} />
          </View>
        );
      })}
    </View>
  );
}

function SemiProLeagueScreen({ navigation }) {
  const semiproDriversData = data.find((league) => league.league_title === 'SEMI PRO').drivers;
  const [semiproDrivers, setSemiProDrivers] = useState(semiproDriversData);
  const [sortOrder, setSortOrder] = useState('default');

  const sortByAlphabetically = () => {
    const sortedDrivers = [...semiproDrivers].sort((a, b) => {
      const nameA = `${a.firstname} ${a.lastname}`;
      const nameB = `${b.firstname} ${b.lastname}`;
      return nameA.localeCompare(nameB);
    });

    setSemiProDrivers(sortedDrivers);
    setSortOrder('alphabetical');
  };

  const sortByTandemPoints = () => {
    const sortedDrivers = [...semiproDrivers].sort((a, b) => {
      const pointsA = a.race.reduce((total, race) => total + parseFloat(race.tandem_points || 0), 0);
      const pointsB = b.race.reduce((total, race) => total + parseFloat(race.tandem_points || 0), 0);
      return pointsB - pointsA;
    });

    setSemiProDrivers(sortedDrivers);
    setSortOrder('tandemPoints');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SemiPro League</Text>
      <Button title="Sort Alphabetically" onPress={sortByAlphabetically} />
      <Button title="Sort by Tandem Points" onPress={sortByTandemPoints} />
      {semiproDrivers.map((driver) => {
        const totalTandemPoints = driver.race.reduce(
          (total, race) => total + parseFloat(race.tandem_points || 0),
          0
        );

        return (
          <View key={driver.driver_id}>
            <Text>Name: {driver.firstname} {driver.lastname}</Text>
            <Text>League: SEMI PRO</Text>
            <Text>Car: {driver.car}</Text>
            <Text>Total Tandem Points: {totalTandemPoints}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('Details', { driver })}
            />
            <View style={{ marginVertical: 10 }} />
          </View>
        );
      })}
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const driver = route.params.driver;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Driver Details</Text>
      <Text>Name: {driver.firstname} {driver.lastname}</Text>
      <Text>Car: {driver.car}</Text>
      <Text>League: {driver.league_title}</Text>
      <Text>Racing Results:</Text>
      {driver.race.map((race, index) => (
        <View key={race.race_id}>
          <Text>Race {index + 1}</Text>
          <Text>Race Information: {race.race_information}</Text>
          <Text>Qualification Position: {race.qualification_position}</Text>
          <Text>Qualification Result: {race.qualification_result}</Text>
          <Text>Qualification Points: {race.qualification_points}</Text>
          <Text>Tandem Result: {race.tandem_result}</Text>
          <Text>Tandem Points: {race.tandem_points}</Text>
          <View style={{ marginVertical: 10 }} />
        </View>
      ))}
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="StreetLeague" component={StreetLeagueScreen} />
        <Stack.Screen name="SemiProLeague" component={SemiProLeagueScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;