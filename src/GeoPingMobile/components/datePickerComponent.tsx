import React from 'react';
import { DatePickerAndroid, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import moment from 'moment';
import { RenderItemComponent } from "./renderItemComponent";
import { ECodeImage } from "../enums/codeImage";

// import { dateFormat } from "../services/helper";

type Props = {};
type State = {
  date: moment.Moment,
};

export class DatePickerComponent extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
    this.state = {
      date: moment (),
    };
  }

  openDatePicker = () => {
    DatePickerAndroid.open ( {
      date: this.state.date.toDate(),
      maxDate: moment().toDate(),
    } )
      .then ( ( date: any ) => {
        if ( date.action !== DatePickerAndroid.dismissedAction ) {
          this.setState ( {
            date: moment ( [date.year, date.month, date.day] ),
          } );
        }
      } )
      .catch ( ( error: any ) => {
        console.warn ( 'Cannot open date picker', error.message );
      } )
  };

  render() {
    // console.log ( this.state.date );
    return (
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground ()}
          onPress={this.openDatePicker}
        >
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>{this.state.date.format ( 'LL' )}</Text>
            <RenderItemComponent
              codeIcon={ECodeImage.CalendarAlt}
              style={styles.imageCalendar}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create ( {
  dateTextContainer: {
    flexDirection: 'row',
  },
  dateText: {
    // backgroundColor: '#c7c1c7',
    // borderRadius: 5,
    marginRight: 5,
  },
  imageCalendar: {
    fontSize: 20,
  },
} );