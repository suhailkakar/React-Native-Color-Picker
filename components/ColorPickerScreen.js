import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, Animated, FlatList, LogBox } from 'react-native';
import HsvColorPicker from 'react-native-hsv-color-picker';

import { ColorWheel } from 'react-native-color-wheel';
import { SliderSaturationPicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';
import colorsys from 'colorsys';
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Path, Svg } from 'react-native-svg';
import ASdads from './Saturation';

export default function ColorPickerScreen() {
    const [currentColor, setCurrentColor] = useState('#ff0000');
    const [defaultColors, setDefaultColors] = useState([]);
    const [mainH, setMainH] = useState(0);
    const [mainS, setMainS] = useState(0);
    const [mainV, setMainV] = useState(1);
    const animatedValue = new Animated.Value(1.5);

    const mask = {
        width: Dimensions.get('window').width,
        height: 50
    };

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
        let hsvColor = colorsys.hexToHsl(currentColor);
        getColorName(hsvColor.h);
    }, []);

    const onChange = (e) => {
        let hexedColor = colorsys.hsvToHex(e);
        let hsvColor = colorsys.hexToHsl(hexedColor);

        getColorName(hsvColor.h);
    }

    const onChangeComplete = (e) => {
        pressInAnimation();
    }

    const pressInAnimation = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true
        }).start();
    }

    const getColorName = (h) => {
        setMainS(h)

        let colorValue = Math.floor(h);
        let defaultColor;

        if (colorValue < 25 || (colorValue >= 340 && colorValue < 359)) {
            defaultColor = '#ff0000';
        }
        else if (colorValue >= 25 && colorValue < 50) {
            defaultColor = '#ffa500';
        }
        else if (colorValue >= 50 && colorValue < 75) {
            defaultColor = '#ffff00';
        }
        else if (colorValue >= 75 && colorValue < 150) {
            defaultColor = '#00ff00';
        }
        else if (colorValue >= 150 && colorValue < 200) {
            defaultColor = '#00ade6';
        }
        else if (colorValue >= 200 && colorValue < 260) {
            defaultColor = '#5b00e0';
        }
        else if (colorValue >= 260 && colorValue < 340) {
            defaultColor = '#ea00ed';
        }

        updateColors(defaultColor);
    }

    const updateColors = (color) => {
        let colors = [
            { key: "1", color: '#ff0000' },
            { key: "2", color: '#ffa500' },
            { key: "3", color: '#ffff00' },
            { key: "4", color: '#00ff00' },
            { key: "5", color: '#00ade6' },
            { key: "6", color: '#5b00e0' },
            { key: "7", color: '#ea00ed' }
        ];

        let updatedDefaultColors = [];

        let index = colors.findIndex(c => c.color === color);

        if (index < 3) {
            updatedDefaultColors = colors.splice(index, + 5);
        }
        if (index >= 3) {
            updatedDefaultColors = colors.splice(index);
            while (updatedDefaultColors.length < 5) {
                let x = colors.shift();

                updatedDefaultColors.push(x);
            }

        }

        setCurrentColor(updatedDefaultColors[0].color);
        setDefaultColors(updatedDefaultColors);
    }
    const onHuePickerChange = (hue) => {
        setMainH(hue)
    }


    const onSatValPickerChange = (saturation, value) => {
        setMainS(saturation)
        setMainV(value)

    }

    console.log(mainS)

    return (
        <View style={styles.container}>

            <View style={styles.wheelBox}>
                <ColorWheel
                    initialColor={currentColor}
                    onColorChange={color => onChange(color)}
                    onColorChangeComplete={color => onChangeComplete(color)}
                    style={styles.wheel}
                />


            </View>
            <View style={{ marginLeft: 50 }}></View>
            <ASdads
                greeting={mainS}
            />
        </View>
    )
}


const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%'
    },
    navigation: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navTitle: {
        marginLeft: 20,
        fontSize: 20
    },
    wheelBox: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        marginLeft: 70

    },
    wheel: {
        width: Dimensions.get('window').width * 3 / 5,
        height: Dimensions.get('window').width * 3 / 5,
        alignSelf: 'center',
        zIndex: 1
    },
    wheelThumb: {

    },
    circle: {
        width: Dimensions.get('window').width * 3 / 7,
        height: Dimensions.get('window').width * 3 / 7,
        position: 'absolute',
        zIndex: 0,
        borderRadius: 260,
        opacity: 0.4
    },
    circleOuter: {
        width: Dimensions.get('window').width * 3 / 6,
        height: Dimensions.get('window').width * 3 / 6,
        position: 'absolute',
        zIndex: 0,
        borderRadius: 340,
        opacity: 0.2
    },
    sliderBox: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    track: {
        width: Dimensions.get('window').width * 3 / 6,
        height: 5
    },
    slider: {
        height: 5,
        borderRadius: 6
    },
    thumb: {
        width: 30,
        height: 30,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 25,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.35,
    },
    iconLeft: {
        paddingRight: 15
    },
    iconRight: {
        paddingLeft: 15,
        marginBottom: 10
    },
    swatchesContent: {
        flex: 1,
        flexDirection: 'column'
    },
    maskBox: {
        position: 'relative',
        flex: 1
    },
    mask: {
        transform: [{ rotate: '180deg' }],
        zIndex: 3
    },
    maskBg: {
        zIndex: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.2
    },
    swatchesBox: {
        flex: 1,
        position: 'relative',
        flexDirection: 'column',
        alignItems: 'center'
    },
    swatches: {
        alignSelf: 'flex-end',
        height: 45,
        width: 45,
        marginRight: 10,
        marginLeft: 10,
        marginBottom: 20,
        borderRadius: 50,
        borderColor: 'gray',
        borderWidth: 1
    },
    swatchesBg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 'auto',
        height: 'auto',
        zIndex: 0,
        opacity: 0.2
    }
}
