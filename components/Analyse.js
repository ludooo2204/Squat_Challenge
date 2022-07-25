import {
  FlatList,
  processColor,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {BarChart, LineChart} from 'react-native-charts-wrapper';
import {useSelector} from 'react-redux';
import analyseData from '../helpers/analyseData';
const Analyse = () => {
  const squatsTotal = useSelector(state => state.squatsTotal);
  const squatsSession = useSelector(state => state.squatsSession);
  console.log('squatsTotal');
  console.log(squatsTotal);
  analyseData(squatsTotal);
  // console.log('squatsSession');
  // console.log(squatsSession);
  const dataTotalForGraphe = [];
  squatsTotal.forEach(element => {
    dataTotalForGraphe.push({x: element - squatsTotal[0], y: 1});
  });
  const dataTotalForGrapheCumul = [];
  squatsTotal.forEach(element => {
    dataTotalForGrapheCumul.push({
      x: element - squatsTotal[0],
      y: squatsTotal.indexOf(element),
    });
  });
  // console.log('dataTotalForGraphe');
  // console.log(dataTotalForGraphe);
  console.log(dataTotalForGrapheCumul);

  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.container}>
        {squatsTotal.length == 0 && <Text>PAS DE DONNEES!!</Text>}
        {squatsTotal.length > 0 && (
          <BarChart
            style={styles.chart}
            //   dragEnabled
            xAxis={{
              drawLabels: true,
              position: 'BOTTOM',
              axisMaximum:
                dataTotalForGraphe[dataTotalForGraphe.length - 1].x + 3600000,
              axisMinimum: -3600000,
              valueFormatter: 'date',
              valueFormatterPattern: 'YY-MM-dd hh:mm:ss',
              since: squatsTotal[0],
              timeUnit: 'MILLISECONDS',
            }}
            onSelect={e => console.log(e.nativeEvent.data)}
            //   1658176463319, 1658176464047, 1658176464717, 1658176466432, 1658176467055, 1658176467587
            data={{
              dataSets: [
                {
                  label: 'demo',
                  values: dataTotalForGraphe,
                },
              ],
              config: {barWidth: 1000},
            }}
          />
        )}
        {squatsTotal.length > 0 && (
          <LineChart
            style={styles.chart}
            // dragEnabled
            legend={{
              enabled: false,
            }}
            chartDescription={{text: ''}}
            yAxis={{axisMaximum: squatsTotal.length}}
            xAxis={{
              drawLabels: true,
              position: 'BOTTOM',
              axisMaximum:
                dataTotalForGraphe[dataTotalForGraphe.length - 1].x + 3600000,
              // axisMinimum: -3600000,
              valueFormatter: 'date',
              valueFormatterPattern: 'YY-MM-dd hh:mm:ss',
              since: squatsTotal[0],
              timeUnit: 'MILLISECONDS',
            }}
            onSelect={e => console.log(e.nativeEvent.data)}
            //   1658176463319, 1658176464047, 1658176464717, 1658176466432, 1658176467055, 1658176467587
            data={{
              dataSets: [
                {
                  label: 'demo',
                  values: dataTotalForGrapheCumul,
                  config: {drawValues: false},
                },
              ],
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Analyse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    margin: 30,
  },
  chart: {
    // flex: 1,
    height: 300,
  },
});
