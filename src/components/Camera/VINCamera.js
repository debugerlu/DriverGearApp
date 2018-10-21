import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';

export default class VINCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vinString: "",
            moveAnim: new Animated.Value(0)
        };
    }

    componentDidMount() {
        this.startAnimation();
    }

    startAnimation = () => {
        this.state.moveAnim.setValue(0);
        Animated.timing(
            this.state.moveAnim,
            {
                toValue: -100,
                duration: 1500,
                easing: Easing.linear
            }
        ).start(() => this.startAnimation());
    };

    _parseVinText = (result) => {
        this.setState({
            vinString: result.textBlocks.map(item => {
                // console.log(item.value)
                return item.value;
            }).join('')
        }

        )
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera

                    ref={ref => {
                        this.camera = ref;
                    }}

                    rectangleText={true}
                    autoFocus={"on"}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    onTextRecognized={this._parseVinText}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Animated.View style={[
                            styles.border,
                            { transform: [{ translateY: this.state.moveAnim }] }]} />
                        <Text style={styles.rectangleText}>将车架号放入框内</Text>
                    </View>
                </RNCamera>
                <Text>{this.state.vinString}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection: 'row'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 100,
        width: 300,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 200,
        height: 2,
        backgroundColor: '#00FF00',
    }
});