import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BarChart, LineChart} from 'react-native-charts-wrapper';

const Analyse = () => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <BarChart
          style={styles.chart}
          //   dragEnabled
          xAxis={{
            drawLabels: true,
            position: 'BOTTOM',
            valueFormatter: 'date',
            valueFormatterPattern: 'YY-MM-dd hh:mm:ss',
            since: 1658176463319,
            timeUnit: 'MILLISECONDS',
          }}
          //   1658176463319, 1658176464047, 1658176464717, 1658176466432, 1658176467055, 1658176467587
          data={{
            dataSets: [
              {
                label: 'demo',
                values: [
                  {x: 0, y: 1},
                  {x: 1658176464047 - 1658176463319, y: 2},
                  {x: 1658176464717 - 1658176463319, y: 2},
                  {x: 1658176466432 - 1658176463319, y: 2},
                  {x: 1658176467055 - 1658176463319, y: 2},
                  {x: 1658176467587 - 1658176463319, y: 2},
                ],
              },
            ],
            config: {barWidth: 100},
          }}
        />
      </View>
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
    flex: 1,
  },
});
