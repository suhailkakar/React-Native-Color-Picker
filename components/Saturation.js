import React from 'react';
import { StyleSheet, View } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hue: 0,
            sat: 0,
            val: 1,
        };
        this.onSatValPickerChange = this.onSatValPickerChange.bind(this);
        this.onHuePickerChange = this.onHuePickerChange.bind(this);
    }

    onSatValPickerChange({ saturation, value }) {
        this.setState({
            sat: saturation,
            val: value,
        });
        console.log("dasdas", this.props.greeting)
        this.setState({
            hue: this.props.greeting
        });
    }

    onHuePickerChange({ hue }) {
        this.setState({
            hue,
        });
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            hue: this.props.greeting
        }), 500);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        console.log('dsa')
        const { hue, sat, val } = this.state;
        return (
            <View style={styles.container}>
                <HsvColorPicker
                    huePickerHue={hue}
                    onHuePickerDragMove={this.onHuePickerChange}
                    onHuePickerPress={this.onHuePickerChange}
                    satValPickerHue={hue}
                    satValPickerSaturation={sat}
                    satValPickerValue={val}
                    onSatValPickerDragMove={this.onSatValPickerChange}
                    onSatValPickerPress={this.onSatValPickerChange}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
