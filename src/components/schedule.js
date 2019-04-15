// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { View, Text, button } from 'react-native';
// import { MKRadioButton } from 'react-native-material-kit';

// import Button from 'app/src/components/button';
// import { COLOR_PRIMARY } from 'app/src/styles/common';
// import styles from './schedule.styles';


// export default class Calendar extends Component {
//   static propTypes = {
//     loading: PropTypes.bool.isRequired,
//     schedule: PropTypes.func.isRequired,
//   };

//   constructor(props) {
//     super(props);
//     this.options = ['within the next day or two', 'within the next week', 'within the next 2 weeks', 'in whatever timeframe LUCY recommends'];
//     this.state = {
//       timeframe: '',
//       error: false,
//     };
//     this.radioGroup = new MKRadioButton.Group();
//   }

//   render() {
//     return (
//       <div style={styles.container}>
//         <div style={styles.body}>
//           <span allowFontScaling={false} style={styles.header}>I would like to schedule this session:</span>
//           <div style={{ marginBottom: -10}}>
//             {this.options.map((option, i) => (
//               <button style={styles.buttonRow} key={i} onClick={() => { this[`checkbox${i}`].confirmToggle(); }} >
//                 <MKRadioButton
//                   ref={(c) => { this[`checkbox${i}`] = c; }}
//                   group={this.radioGroup}
//                   borderOnColor={COLOR_PRIMARY}
//                   borderOffColor={COLOR_PRIMARY}
//                   fillColor={COLOR_PRIMARY}
//                   onCheckedChange={(e) => { if (e.checked) { this.setState({ timeframe: option }); } }}
//                 />
//                 <span style={styles.buttonText}>{option}</span>
//               </button>
//             ))}
//           </div>
//           <Button
//             enabled={this.state.timeframe.length > 0}
//             loading={this.props.loading}
//             onSubmit={() => this.props.schedule(this.state.timeframe)}
//             text="Submit"
//           />
//         </div>
//       </div>
//     );
//   }
// }
