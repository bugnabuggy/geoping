import React from 'react';
import { DatePickerAndroid, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import moment from 'moment';
import { RenderItemComponent } from "./renderItemComponent";
import { ECodeImage } from "../enums/codeImage";

type Props = {
  date: moment.Moment;
  periodDate: string;
  setDate: ( field: string, date: moment.Moment ) => void;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
};
type State = {
};

export class DatePickerComponent extends React.Component<Props, State> {
  constructor( props: Props ) {
    super ( props );
  }

  openDatePicker = () => {
    DatePickerAndroid.open ( {
      date: this.props.date.toDate (),
      maxDate: this.props.maxDate && this.props.maxDate.toDate (),
      minDate: this.props.minDate && this.props.minDate.toDate (),
    } )
      .then ( ( date: any ) => {
        if ( date.action !== DatePickerAndroid.dismissedAction ) {
          this.props.setDate ( this.props.periodDate, moment ( [date.year, date.month, date.day] ) );
        }
      } )
      .catch ( ( error: any ) => {
        console.warn ( 'Cannot open date picker', error.message );
      } )
  };

  render() {
    return (
      <View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackground ()}
          onPress={this.openDatePicker}
        >
          <View style={styles.dateTextContainer}>
            <Text style={styles.dateText}>{this.props.date.format ( 'LL' )}</Text>
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